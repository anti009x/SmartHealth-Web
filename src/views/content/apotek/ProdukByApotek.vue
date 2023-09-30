<template>
    <div class="container pt-3">
        <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-8 py-3">
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    <div class="col" v-for="data in dataProduk">
                        <div class="card shadow"
                            @click="$redirect({ name: 'Detail Produk', params: { id: data.kodeProduk } })">
                            <div class="card-body">
                                <p>
                                    <b>{{ data.namaProduk }} </b><br>
                                    <small class="text-secondary">
                                        {{ data.deskripsiProduk }}
                                    </small> <br> <small class="text-end">
                                        {{ data.hargaProduk }}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 py-3">
                <h6>
                    <i class="fas fa-location-dot text-danger"></i> Lokasi {{ apotek.namaApotek }}
                </h6>
                <l-map v-if="apotek && apotek.latitude && apotek.longitude" :zoom="zoom" class="rounded"
                    style="height: 300px" :center="[apotek.latitude, apotek.longitude]">
                    <l-tile-layer :url="url"></l-tile-layer>
                    <l-marker :lat-lng="[apotek.latitude, apotek.longitude]" :icon="apotekIcon">
                        <l-popup :options="popupOptions">
                            <template v-slot:default>
                                <div class="custom-popup">
                                    <p class="mb-0">{{ apotek.namaApotek }}</p>
                                    <div class="d-flex justify-content-end">
                                        <p class="mb-0">
                                            <a :href="getGoogleMapsLink(apotek.latitude, apotek.longitude)" target="_blank"
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
    </div>
    {{ oroduk }}
</template>
<script>
import "leaflet/dist/leaflet.css";
import apotekMarker from '@/assets/images/apotekmarker.png'
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
export default {
    data() {
        return {
            dataProduk: [],
            apotekIcon: null,
            isLoading: false,
            bounds: null,
            popupOptions: {
                maxWidth: 200,
            },
            latitude: null,
            longitude: null,
            apotek: {},
            latitudeMe: null,
            longitudeMe: null,
            zoom: 15,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            oroduk: []
        }
    },
    created() {
        this.getProduk(),
            this.getApotek(),
            this.getCurrentLocation()
        this.createCustomIcon(),
            this.getProduaaak()
    },
    methods: {
        getProduk() {
            let type = "getData"
            let url = [
                `apotek/produk/data_produk`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataProduk = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        createCustomIcon() {
            this.apotekIcon = L.icon({
                iconUrl: apotekMarker,
                iconSize: [40, 45]
            })
        },
        getApotek() {
            const idProfilApotek = this.$route.params.idApotek
            let type = "getData"
            let url = [
                `apotek/pengaturan/profil_apotek/${idProfilApotek}/edit`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.apotek = result.data
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
        getProduaaak() {
            let type = "getData"
            let url = [
                `apotek/produk/data_produk/by_owner/${this.idFromParams}/get`, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.oroduk = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
    }
}
</script>