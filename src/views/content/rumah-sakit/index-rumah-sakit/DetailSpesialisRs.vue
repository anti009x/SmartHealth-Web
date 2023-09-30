<template>
    <div class="container px-4 my-4">
        <button class="btn btn-sm btn-outline-dark shadow mb-3" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <template v-if="isLoading">
                <SkeletonLoading />
            </template>
            <template v-else-if="getSpes.length > 0">
                <div class="col" v-for="data in getSpes" :key="data.idDokter">
                    <CardDokter data-aos="zoom-in" data-aos-duration="700" Image="../../../assets/images/avadoktercowo.png"
                        :nama="data.namaDokter" rating="3" :biaya="data.biaya"
                        :Label="'Dokter ' + dokterSpesialis.namaSpesialis" labelButton="buat Janji"
                        @click="$redirect({ name: 'Detail Janji Rs', params: { idAhli: data.idDokter, idRumahSakit: this.idFromParams, idSpesialis: this.idDokterSpesialis, namaSpesialis: this.$route.params.namaSpesialis } })" />
                </div>
            </template>
            <template v-else>
                <div class="alert alert-info text-center w-100">
                    <p>
                        Dokter {{ this.$route.params.namaSpesialis }} Sedang Tidak Tersedia
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import CardDokter from '@/components/card/CardDokter.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            dokterSpesialis: [],
            isLoading: false,
            getSpes: []
        };
    },
    computed: {
        idFromParams() {
            return this.$route.params.id;
        },
        idDokterSpesialis() {
            return this.$route.params.idPenyakit;
        }
    },
    created() {
        this.getDokterSpesialis();
        this.gettttSpes()
    },
    methods: {
        getDokterSpesialis() {
            const dokterSpesialis = this.idDokterSpesialis;
            let type = "getData";
            let url = [
                `master/penyakit/spesialis_penyakit/${dokterSpesialis}/edit`,
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.dokterSpesialis = result.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        gettttSpes() {
            let type = "getData"
            let url = [
                `master/spesialis/${this.idDokterSpesialis}/${this.idFromParams}`, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.getSpes = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        ButtonComponent,
        SkeletonLoading,
        CardDokter
    }
};
</script>
<style>
.text-size {
    font-size: 14px;
    font-weight: 400;
}
</style>