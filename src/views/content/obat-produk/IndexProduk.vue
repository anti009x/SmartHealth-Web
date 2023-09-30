<template>
    <SectionHeaderBody Judul="BerobatShop" Slogan="Cari kebutuhan penunjang kesehatanmu di sini">
        <template #router>
            <router-link style="text-decoration: none" :to="{ name: 'IndexHome' }">
                <p class="text-light">
                    Home
                    /
                    <router-link :to="{ name: 'Data Produk' }" class="text-light" style="text-decoration: none">
                        {{ $route.name }}
                    </router-link>
                </p>
            </router-link>
        </template>
        <template #input>
            <div class="input-group">
                <span class="input-group-text border-0 bg-warning" id="search-addon"><i
                        class="fas fa-magnifying-glass text-light"></i></span>
                <input type="search" class="form-control rounded p-2" placeholder="Cari nama obat atau vitamin" />
            </div>
        </template>
    </SectionHeaderBody>
    <div class="container mt-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="mb-0"><b>Cari Produk Sesuai Kategori</b></h6>
            <h6 style="color: navy" @click="$router.push({ name: 'Semua Kategori' })"><b>Lihat Semua Kategori</b></h6>
        </div>
        <div class="row g-4">
            <div v-for="data in limitData.kategori" :key="data.idKategoriProduk" class="col-6 col-sm-4 col-md-3 col-lg-2">
                <template v-if="isLoading">
                    <LoadingComponent />
                </template>
                <div v-else class="card shadow border" style="background-color: ghostwhite;">
                    <div class="card-body">
                        <div class="card-text text-center">
                            <a class="text-dark" @click="$redirect({ name: 'Produk Kategori', params: { idKategori: data.idKategoriProduk, namaKategori: data.slugKategoriProduk } })"
                                style="text-decoration: none">{{ data.namaKategoriProduk }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid" style="background-color:ghostwhite;">
        <div class="container pb-3">
            <div class="d-flex justify-content-between mt-3 pt-3">
                <h6><b>Produk</b></h6>
            </div>
            <div class="row g-4">
                <div v-for="data in dataProduk" :key="data.id" class="col-6 col-sm-4 col-md-3 col-lg-2">
                    <template v-if="isLoading">
                        <SkeletonLoading />
                    </template>
                    <div v-else class="card shadow border-0">
                        <div class="embed-responsive embed-responsive-16by9">
                            <img src="../../../assets/images/obat.jpeg" class="card-img-top h-50" alt="foto belum tersedia">
                        </div>
                        <div class="card-body">
                            <p class="mb-0">{{ data.namaProduk }}</p>
                            <p class="mb-1 text-secondary" style="font-size: 14px"><small>{{ data.hargaProduk }}
                                    <br> Cirebon | terjual 2
                                </small></p>
                            <div class="text-secondary">
                                <div class="d-flex justify-content-end">
                                    <p class="mb-0" style="font-size: 12px">
                                        4.5
                                        <i class="fas fa-star text-warning mb-2"></i>
                                    </p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <router-link class="btn btn-sm btn-outline-primary w-100"
                                        :to="{ name: 'Detail Produk', params: { id: data.kodeProduk } }">
                                        detail
                                    </router-link>
                                    <!-- <button class="btn btn-sm btn-primary" > -->
                                    <i class="fas fa-cart-shopping text-primary mt-2 ms-1" @click="addToCart(data.id)"></i>
                                    <!-- </button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue';
import Cookies from 'js-cookie'
import iziToast from 'izitoast'
import CardArtikel from '@/components/card/CardArtikel.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
import SectionHeaderBody from '../../../components/partials-component/SectionHeaderBody.vue';
export default {
    data() {
        return {
            cart: [],
            nearestResults: [],
            dataProduk: [],
            kategori: [],
            limit: 6,
            isLoading: false,
            latitude: null,
            longitude: null,
            produk_id: ''
        }
    },
    computed: {
        limitData() {
            return {
                kategori: this.kategori.slice(0, this.limit)
            }
        }
    },
    components: {
        CardArtikel,
        SkeletonLoading,
        SectionHeaderBody,
        LoadingComponent
    },
    mounted() {
        this.getLocation()
    },
    created() {
        this.getProduk(),
            this.getKategoriObat()
    },
    methods: {
        getNeareset() {
            let type = "postData"
            let url = [
                "apotek/pengaturan/profil_apotek/find_nearest", {
                    latitude: this.latitude,
                    longitude: this.longitude
                }
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.nearestResults = result
            }).catch((err) => {
                console.log(err);
            })
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        this.getNeareset();
                    },
                    error => {
                        console.error(error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        },
        getProduk() {
            let type = "getData"
            let url = [
                "apotek/produk/data_produk", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataProduk = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getKategoriObat() {
            let type = "getData"
            let url = [
                "master/produk/kategori_produk", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.kategori = result.data
                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
            }).catch((err) => {
                console.log(err);
            })
        },
        showAlertSuccess() {
            iziToast.success({
                title: 'success',
                message: 'berhasil ditambahkan ke keranjang',
                position: 'topRight'
            })
        },
        addToCart(produk_id) {
            const message = "Data Berhasil di Tambahkan"
            let type = "postData"
            let url = [
                "keranjang", {
                    produk_id
                }, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                if (result.pesan == message) {
                    this.$swal({
                        icon: 'success',
                        title: 'berhasil menambahkan ke keranjang'
                    }).then(() => {
                        window.location.reload()
                    })
                } else {
                    this.$swal({
                        icon: 'error',
                        title: 'kamu harus login dulu nih'
                    }).then(() => {
                        this.$router.push({ name: 'LoginUser' })
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>

<style>
.form-control:focus {
    border-color: #4538db;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(95, 124, 218, 0.6);
}
</style>

<script>
</script>