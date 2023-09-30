<template>
    <div class="container-fluid p-lg-4 bg-primary" >
        <div class="container">
            <router-link style="text-decoration: none" to="/">
                <p class="text-light">
                    Home
                    /
                    <router-link to="/produk-obat" class="text-light" style="text-decoration: none">
                        {{ $route.name }}
                    </router-link>
                </p>
            </router-link>
            <div class="d-flex justify-content-between">
                <div class="text-light mb-3 d-none d-sm-block">
                    <h3>
                       Dokter Spesialis dan Perawat Terbaikk
                    </h3>
                    <h4>
                        Pelayanan medis yang akurat
                    </h4>
                </div>
            </div>
            <div class="d-flex justify-content-start pb-2">
                <div class="col-12 col-md-6">
                    <div class="input-group">
                        <span class="input-group-text border-0 bg-warning" id="search-addon"><i
                                class="fas fa-magnifying-glass text-light"></i></span>
                        <input v-model="search"  class="form-control rounded p-2" placeholder="Cari keluhan yang kamu rasakan" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row align-items-top py-2">
            <div class="col-lg-4 col-md-6">
                <h4><b>BerobatPlus</b></h4>
                <p class="mb-0">
                    Berobatplus merupakan layanan kesehatan yang dapat diakses kapanpun dan di manapun. Beragam pelayanan kesehatan tersedia dalam satu aplikasi.
                </p>
                <img src="../../../assets/images/injury-rafiki.png" class="img-fluid animated" alt="">
                <ul>
                    <li>Cepat dan Mudah</li>
                    <li>Tersedia dokter dan perawat terbaik</li>
                    <li>Dokter spesialis yang professional</li>
                </ul>
            </div>
            <div class="col-md-6 col-lg-8" data-aos="fade-up" data-aos-duration="500"
                style="overflow-y: auto; max-height: 600px">
                <router-view :valueSearch="valueSearch"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue';
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
import BodyDetailDokter from '@/components/BodyDetailDokter.vue';
import { debounce } from 'lodash';

export default {
    data() {
        return {
            search: '',
            dokterLimit: 4,
            specialistLimit: 12,
            isLoading: false,
            isSearching: false,
            valueSearch: []
        }
    },
    components: {
        HeaderComponent,
        FooterComponent,
        SkeletonLoading,
        BodyDetailDokter,
        LoadingComponent,
        InputField
    },
    watch: {
        search: debounce(function (val) {
            if (val !== '') {
                this.$router.push({
                    path: '/chat/cari',
                    query: { search: val }
                });
                this.searchKeahlian();
            } else {
                if (this.$route.path === '/chat/cari') {
                    this.$router.replace({ query: null });
                } else {
                    this.$router.push('/chat/dokter');
                }
            }
        }, 1000),
    },
    methods: {
        searchKeahlian() {
            if (this.isLoading) return; // Prevent concurrent API requests
            this.isLoading = true;

            let type = "postData";
            let url = [
                "master/cari/keahlian",
                { nama_keahlian: this.search,
                 },
                {}
            ];

            this.$store.dispatch(type, url)
                .then((result) => {
                    this.isLoading = false;
                    this.valueSearch = result.data
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                });
        }
    }
}
</script>

<style>
.section-bg {
    background-color: #f1f7fd;
}
.animated{
    animation: up-down 3s ease-in-out infinite alternate-reverse both;
}
@keyframes up-down {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-20px);
    }
  }
</style>