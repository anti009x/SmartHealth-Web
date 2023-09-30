<template>
    <div class="container py-5">
        <h5><b>Daftar Alamat Pengiriman</b></h5>
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <div class="input-group mb-3">
                    <span class="input-group-text border-0 bg-warning" id="search-addon">
                        <i class="fas fa-magnifying-glass text-light"></i>
                    </span>
                    <input type="search" class="form-control rounded p-2" placeholder="Cari alamat atau nama penerima" />
                </div>
                <template v-if="isLoading">
                    <SkeletonLoading />
                </template>
                <template v-else-if="!alamat.length">
                    <div class="mt-3 text-center">
                        <div class="alert mb-0 alert-info">
                            <p>
                                Kamu belum nambahin alamat pengiriman nihh
                            </p>
                        </div>
                        <img src="../../../assets/images/alamatnotfound.gif" style="width: 70%; height: 70%" alt="">
                    </div>
                </template>
                <div v-else v-for="(data, index) in alamat" :key="index">
                    <div class="card shadow mb-2">
                        <div class="card-body">
                            <p>
                                <b> {{ profil.user.nama }} </b> <span class="bg-primary rounded pe-2 ps-2 text-light">{{
                                    data.simpanSebagai }}</span> <br> {{ profil.user.nomorHp }} <br> {{ data.lokasi }} <br>
                                note: {{
                                    data.detail }}
                            </p>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-danger btn-sm" @click="hapusAlamat(data.idAlamat)">
                                    <i class="fas fa-trash">
                                    </i>
                                    hapus alamat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <div class="card shadow">
                    <div class="card-body">
                        <!-- <l-map :zoom="zoom" :center="mapCenter" class="rounded" style="height:350px; width: 100%">
                            <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
                            <l-marker v-if="selectedPosition" :lat-lng="selectedPosition" :draggable="true"
                                @dragend="handleMarkerDrag"></l-marker>
                        </l-map> -->
                        <!-- <div class="form-group">
                            <label for=""><b>Pilih Provinsi</b></label>
                            <select class="form-select w-100" v-model="selectedProvinsi" @change="showKabupaten">
                                <option value=""><b>pilih provinsi</b></option>
                                <option :value="data.id" v-for="data in provinsi">{{ data.nama }}</option>
                            </select>
                            <label for=""><b>Pilih Kabupaten atau Kota</b></label>
                            <select class="form-select w-100 mb-1" :disabled="isKotaDisabled" @change="showKecamatan"
                                v-model="selectedKota" id="kota" placeholder="pilih kota">
                                <option value="" selected>pilih kota</option>
                                <option :value="data.id" v-for="data in kota">{{ data.nama }}</option>
                            </select>
                            <label for=""><b>Pilih Kecamatan</b></label>
                            <select class="form-select w-100 mb-1" :disabled="isKecamatanDisabled"
                                v-model="selectedKecamatan" id="kecamatan" @change="showKelurahan"
                                placeholder="pilih kecamatan">
                                <option value="" selected>pilih kecamatan</option>
                                <option :value="data.id" v-for="data in kecamatan">{{ data.nama }}</option>
                            </select>
                            <label for=""><b>Pilih Kelurahan</b></label>
                            <select class="form-select w-100 mb-1" :disabled="isKelurahanDisabled"
                                v-model="selectedKelurahan" id="kelurahan" placeholder="pilih kelurahan">
                                <option value="">pilih kelurahan</option>
                                <option :value="data.id" v-for="data in kelurahan">{{ data.nama }}</option>
                            </select>
                        </div> -->
                        <label class="mt-2"><b>Label Alamat</b></label>
                        <input type="text" class="form-control" placeholder="ex: Rumah" v-model="form.simpan_sebagai">
                        <label class="mt-2"><b>Detail Lokasi</b></label>
                        <textarea class="form-control" rows="4" v-model="form.lokasi"></textarea>
                        <label class="mt-2"><b>Catatan untuk Kurir</b></label>
                        <textarea class="form-control" rows="4" placeholder="ex: taro di depan pintu"
                            :value="detail"></textarea>
                        <div class="d-flex justify-content-between mt-3">
                            <div>
                                <p class="mb-0 text-dark"><b>Pakai metode lain?</b></p>
                                <p class="text-secondary"><small><b>Tambahkan Alamat secara Manual</b></small></p>
                            </div>
                            <div class="mt-4">
                                <button class="btn btn-sm btn-success" @click="postAlamat">Simpan Alamat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import InputField from '@/components/partials-component/InputField.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
export default {
    data() {
        return {
            alamat: [],
            provinsi: [],
            kota: [],
            kecamatan: [],
            kelurahan: [],
            zoom: 15,
            tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            selectedPosition: null,
            locationName: null,
            form: {
                simpan_sebagai: 'Rumah',
                lokasi: '',
                detail: 'Taro di depan aja'
            },
            profil: {},
            isLoading: false,
            selectedKota: null,
            selectedProvinsi: null,
            selectedKecamatan: null,
            selectedKelurahan: null,
            selectedIndex: null,
            selectedId: [],
        }
    },
    mounted() {
        this.geolocate(),
            this.getAlamat(),
            this.getProfil(),
            this.getProvinsi()
    },
    computed: {
        isKotaDisabled() {
            return !this.selectedProvinsi;
        },
        isKecamatanDisabled() {
            return !this.selectedKota
        },
        isKelurahanDisabled() {
            return !this.selectedKecamatan
        },
        selectedLocations() {
            const selectedProvinsiName = this.getSelectedName(this.selectedProvinsi, this.provinsi);
            const selectedKotaName = this.getSelectedName(this.selectedKota, this.kota);
            const selectedKecamatanName = this.getSelectedName(this.selectedKecamatan, this.kecamatan);
            const selectedKelurahanName = this.getSelectedName(this.selectedKelurahan, this.kelurahan);

            return `${selectedProvinsiName}, ${selectedKotaName}, ${selectedKecamatanName}, ${selectedKelurahanName}`;
        },
    },
    methods: {
        getSelectedName(selectedId, data) {
            if (!selectedId || !data) return ''; // Return an empty string if no data or ID is selected
            const selectedData = data.find(item => item.id === selectedId);
            return selectedData ? selectedData.nama : ''; // Return the name or an empty string if not found
        },
        hapusAlamat(idAlamat) {
            let type = "deleteData"
            let url = [
                "master/alamat_user", idAlamat, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.$swal({
                    icon: 'success',
                    title: 'Alamat Berhasil Dihapus'
                })
                this.getAlamat()
            }).catch((err) => {
                console.log(err);
            })
        },
        geolocate() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        this.fetchLocationDetails(latitude, longitude);
                    },
                    error => {
                        console.error('Error occurred while retrieving current location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        },
        handleMarkerDrag(e) {
            if (e && e.target) {
                const latitude = e.target._latlng.lat;
                const longitude = e.target._latlng.lng;
                this.selectedPosition = [latitude, longitude];
                this.fetchLocationDetails(latitude, longitude);
            }
        },
        fetchLocationDetails(latitude, longitude) {
            axios
                .get('https://nominatim.openstreetmap.org/reverse', {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        format: 'jsonv2',
                    },
                })
                .then(response => {
                    this.locationName = response.data.display_name;
                    this.selectedPosition = [response.data.lat, response.data.lon];
                })
                .catch(error => {
                    console.error('Error occurred while fetching location details:', error);
                });
        },
        getProvinsi() {
            axios({
                method: "get",
                url: "http://dev.farizdotid.com/api/daerahindonesia/provinsi"
            }).then((result) => {
                this.provinsi = result.data.provinsi
            })
        },
        showKabupaten() {
            const idProvinsi = this.selectedProvinsi;
            axios({
                method: "get",
                url: `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvinsi}`
            }).then((result) => {
                this.kota = result.data.kota_kabupaten
            })
        },
        showKecamatan() {
            const idKabupaten = this.selectedKota;
            axios({
                method: "get",
                url: `http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${idKabupaten}`
            }).then((result) => {
                this.kecamatan = result.data.kecamatan
            })
        },
        showKelurahan() {
            const idKecamatan = this.selectedKecamatan
            axios({
                method: "get",
                url: `http://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKecamatan}`
            }).then((result) => {
                this.kelurahan = result.data.kelurahan
                console.log(result);
            })
        },
        getAlamat() {
            let type = "getData"
            let url = [
                "master/alamat_user", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.alamat = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        getProfil() {
            let type = "getData"
            let url = [
                "akun/profil/konsumen/profil", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.profil = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        postAlamat() {
            let type = "postData"
            let url = [
                "master/alamat_user", {
                    simpan_sebagai: this.form.simpan_sebagai,
                    lokasi: this.form.lokasi,
                    detail: this.form.detail
                }, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.$swal({
                    icon: 'success',
                    title: 'berhasil menambahkan alamat'
                }).then(() => {
                    window.location.reload()
                })
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    components: {
        LMap, LTileLayer, LMarker, SkeletonLoading, InputField
    },
    computed: {
        mapCenter() {
            return this.selectedPosition || [0, 0];
        },
    }
}
</script>