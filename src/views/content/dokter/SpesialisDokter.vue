<template>
    <div class="d-flex justify-content-between">
        <div>
            <p class="fs-4 mb-0"><b>Rekomendasi Dokter</b></p>
            <p>Konsultasikan keluhanmu dengan dokter kami
            </p>
        </div>
        <div class="text-end mt-4" @click="$redirect({ name: 'Semua Dokter' })">
            <p class="text-primary">lihat semua
            </p>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col" v-for="data in dokters" :key="data.id">
            <template v-if="isLoading">
                <SkeletonLoading />
            </template>
            <CardDokter v-if="data.biaya" :Image="data.foto" Label="Dokter Umum"
                :nama="'dr ' + data.userId.nama" :biaya="data.biaya.biaya"
                @click="$redirect({ name: 'Detail Dokter', params: { idDokter: data.idDokter, idAhli: data.userId.id } })" />

            <CardDokter v-else Image="../../../assets/images/avadoktercowo.png" Label="Dokter Umum"
                :nama="'dr ' + data.userId.nama" :biaya="'---'"
                @click="$redirect({ name: 'Detail Dokter', params: { idDokter: data.idDokter, idAhli: data.userId.id } })" />
        </div>
    </div>
    <div class="text-start pt-4">
        <p class="fs-4 mb-0"><b>Cari Dokter Spesialis</b></p>
        <p>Mau langsung sembuh? yuk cari spesialis yang diinginkan
        </p>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 text-center">
        <div class="col-6 col-md-3 col-lg-2" v-for="data in limitData.specialist" :key="data.id">
            <template v-if="isLoading">
                <LoadingComponent />
            </template>
            <div class="d-flex flex-column align-items-center"
                @click="$redirect('spesialis/' + data.idSpesialisPenyakit + '/dokter')">
                <i :class="data.icon + ' p-3 rounded-circle fs-2 text-light'" style="background-color: #46458C"></i>
                <p>{{ data.namaSpesialis }}</p>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-between">
        <div>
            <p class="fs-4 mb-0"><b>Rekomendasi Perawat</b></p>
            <p>Butuh perawatan? tenang, ada perawat-perawat terbaik
            </p>
        </div>
        <div class="text-end mt-4" @click="$redirect({ name: 'Semua Perawat' })">
            <p class="text-primary">lihat semua
            </p>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col" v-for="data in limitData.nurses">
            <template v-if="isLoading">
                <SkeletonLoading />
            </template>
            <CardDokter v-else :nama="data.user.nama + ', S.Kep.'" biaya="20.000" Label="Perawat" icon="fa-star"
                :rating="data.rating"
                @click="$redirect({ name: 'Detail Perawat', params: { idPerawat: data.idPerawat, idAhli: data.user.id } })" />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import CardDokter from '../../../components/card/CardDokter.vue';
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue';
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
import BodyDetailDokter from '@/components/BodyDetailDokter.vue';
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            dokters: [],
            specialist: [],
            keahlian: [],
            nurses: [],
            dokterLimit: 2,
            specialistLimit: 12,
            isLoading: false,
            idAhkii: [],
            kontol: []
        }
    },
    created() {
        this.getPerawat(),
            this.getDokter()
        this.getSpesialis()
    },
    computed: {
        limitData() {
            return {
                specialist: this.specialist.slice(0, this.specialistLimit),
                nurses: this.nurses.slice(0, this.dokterLimit)
            }
        },
        filteredDokter() {
            const dokterUmum = this.dokters.filter(
                (d) => d.getKeahlian.namaKeahlian === "Dokter Umum"
            );
            return dokterUmum.sort((a, b) =>
                a.getDokter.nama.localeCompare(b.getDokter.nama)
            );
        },
        idAhli() {
            return {
                idAhkii: this.dokters[0].userId
            }
        }
    },
    components: {
        HeaderComponent,
        FooterComponent,
        SkeletonLoading,
        BodyDetailDokter,
        LoadingComponent,
        ButtonComponent,
        CardDokter
    },
    methods: {
        getSpesialis() {
            let type = "getData"
            let url = [
                "master/penyakit/spesialis_penyakit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.specialist = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        getPerawat() {
            this.isLoading = true
            let type = "getData"
            let url = [
                "akun/perawat", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.nurses = result.data
                this.isLoading = false;
            }).catch((err) => {
                console.log(err);
            })
        },
        onPageChange(page) {
            this.pagination.page = page;
            this.getPerawat();
        },
        getDokter() {
            let type = "getData";
            let url = ["akun/dokter", {}];
            return this.$store.dispatch(type, url)
                .then((result) => {
                    this.dokters = result.data
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
}
</script>