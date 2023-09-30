<template>
    <div class="container col-xl-10 col-xxl-12 border-top">
        <div class="row mb-3 mt-3 text-center">
            <div class="col-md-12 themed-grid-col">
                <div class="pb-1 text-start">
                    <h5>{{ detailRS.namaRs }}</h5>
                </div>
                <div class="row">
                    <div class="col-md-6 themed-grid-col">
                        <div v-if="isLoading">
                            <LoadingComponent />
                        </div>
                        <div v-else-if="detailRS.foto === null">
                            <img src="../../../../assets/images/fotors.jpg" class="img-fluid" alt="">
                        </div>
                        <div v-else>
                            <img :src="detailRS.foto" alt="" class="img-fluid">
                        </div>
                    </div>
                    <div class="col-md-4 themed-grid-col text-start">
                        <h6 class="mt-2"><b>Deskripsi</b></h6>
                        <div v-if="isLoading">
                            <LoadingComponent />
                        </div>
                        <div v-else-if="detailRS.deskripsiRs === null">
                            data ga ada
                        </div>
                        <div v-else>
                            <p>
                                {{ detailRS.deskripsiRs }}
                            </p>
                        </div>
                        <h6><b>Alamat</b></h6>
                        <div v-if="isLoading">
                            <LoadingComponent />
                        </div>
                        <div class="rounded shadow" v-else style="height: 300px">
                            <l-map v-if="detailRS && detailRS.latitude && detailRS.longitude" :zoom="zoom"
                                :center="[detailRS.latitude, detailRS.longitude]">
                                <l-tile-layer :url="url"></l-tile-layer>
                                <l-marker :lat-lng="[detailRS.latitude, detailRS.longitude]" :icon="hospitalIcon">
                                    <l-popup :options="popupOptions">
                                        <template v-slot:default>
                                            <div class="custom-popup">
                                                <p class="mb-0">{{ detailRS.namaRs }}</p>
                                                <div class="d-flex justify-content-end">
                                                    <p class="mb-0">
                                                        <a :href="getGoogleMapsLink(detailRS.latitude, detailRS.longitude)" target="_blank"
                                                            style="text-decoration: none;">
                                                            rute <i class="fas fa-arrow-right"></i>
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </template>
                                    </l-popup>
                                </l-marker>
                            </l-map>
                        </div>
                    </div>
                    <div class="col-md-2 themed-grid-col">
                        <div class="text-start mb-3">
                            <h6 class="mt-3 mb-0"><b>Fasilitas</b></h6>
                            <div v-if="isLoading">
                                <LoadingComponent />
                            </div>
                            <div v-else-if="detailFasilitas.length === 0" class="text-danger text-center">
                                <p><strong><i>data belum tersedia</i></strong></p>
                            </div>
                            <div v-else>
                                <ul style="padding-left: 1rem;" class="mt-2" v-for="fasilitas in detailFasilitas"
                                    :key="fasilitas.id">
                                    <li>{{ fasilitas.namaFasilitas }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 mt-4">
            <div class="d-flex justify-content-between">
                <h5 class="py-2">Spesialisasi Dokter</h5>
            </div>
            <div v-if="isLoading">
                <LoadingComponent />
            </div>
            <div v-else-if="limitedDataSpesialis.length === 0" class="alert p-0 pt-2 alert-danger text-center">
                <p>
                    <strong>
                        <i>
                            data belum tersedia
                        </i>
                    </strong>
                </p>
            </div>
            <div v-else class="row row-cols-1 row-cols-md-5 g-3">
                <div class="col" v-for="data in limitedDataSpesialis" :key="data.id">
                    <CardMedicine
                        @click="$redirect({name: 'Detail Spesialis Rs', params: {idPenyakit: data.penyakit.idSpesialisPenyakit, id: data.idRumahSakit, namaSpesialis: data.penyakit.namaSpesialis}})"
                        class="mb-2" :icon="data.penyakit.icon" :labelTitle="data.penyakit.namaSpesialis" />
                </div>
                <div class="px-3 py-4 text-center">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet"
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import CardMedicine from '@/components/card/CardMedicine.vue';
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue'
import hospitalMarker from '../../../../assets/images/hospital-marker.png'

export default {
    data() {
        return {
            detailHospitals: [],
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            limit: 12,
            detailFasilitas: [],
            detailRS: {},
            praktekDokter: [],
            zoom: 15,
            latitude: null,
            longitude: null,
            popupOptions: {
                maxWidth: 200,
            },
            hospitalIcon: null,
            latitudeMe: null,
            longitudeMe: null
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        limitedDataSpesialis() {
            return this.detailHospitals.slice(0, this.limit)
        }
    },
    mounted() {
        this.createCustomIcon()
    },
    created() {
        this.getDetailFasilitas(),
            this.getRumahSakit()
        this.getDetailHospital(),
            this.getPraktek(),
            this.getCurrentLocation()
    },
    methods: {
        getDetailHospital() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/spesialis/" + this.idFromParams, []
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailHospitals = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getGoogleMapsLink(latitude, longitude) {
            const origin = `${this.latitudeMe},${this.longitudeMe}`;
            const destination = `${latitude},${longitude}`;
            return `https://www.google.com/maps/dir/${origin}/${destination}`;
        },
        getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.latitudeMe = position.coords.latitude;
                        this.longitudeMe = position.coords.longitude;
                    },
                    error => {
                        console.error('Error occurred while retrieving current location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        },
        getDetailFasilitas() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/fasilitas_rs/rs/" + this.idFromParams, []
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((response) => {
                this.isLoading = false
                this.detailFasilitas = response.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getRumahSakit() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/data/" + this.idFromParams + "/edit", {}
            ]
            console.log('getrs');
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailRS = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getPraktek() {
            let type = "getData"
            let url = [
                "master/ahli/detail_praktek/" + this.idFromParams, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.praktekDokter = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        createCustomIcon() {
            this.hospitalIcon = L.icon({
                iconUrl: hospitalMarker,
                iconSize: [40, 45]
            })
        },
    },
    components: {
        CardMedicine,
        LoadingComponent,
        ButtonComponent,
        LMap, LMarker, LPopup, LTileLayer
    }
}
</script>

<style>
.custom-popup {
    max-width: 200px;
}
</style>