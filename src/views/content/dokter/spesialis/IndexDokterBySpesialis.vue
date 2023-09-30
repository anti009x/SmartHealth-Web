<template>
    <div class="d-flex justify-content-start mb-3">
        <button class="btn btn-sm btn-outline-dark shadow me-3" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <h5>
            Dokter Spesialis {{ spesialis.namaSpesialis }}
        </h5>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-3">
        <template v-if="isLoading">
            <div class="text-center w-100">
                <LoadingComponent/>
            </div>
        </template>
        <template v-else-if="dokter.length === 0">
            <div class="alert alert-danger w-100 text-center">
                <p>Data Dokter Tidak Ada</p>
            </div>
        </template>
        <div class="col" v-else v-for="data in dokter" :key="data.idDokter">
            <template v-if="hasDokter(data) && data.user.idRole === 'RO-2003062'">
                <CardDokter :Label="spesialis.namaSpesialis" :nama="'dr ' + data.user.nama"
                    
                    @click="$redirect('/detail/' + data.idDokter + '/' + data.userId.id)" />
            </template>
        </div>
    </div>
</template>
<script>
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
import CardDokter from '@/components/card/CardDokter.vue'
export default {
    data() {
        return {
            dokter: [],
            spesialis: [],
            isLoading: false
        }
    },
    computed: {
        hasDokter() {
            return (data) => {
                return data && data.user && data.user.idRole === 'RO-2003062';
            };
        },
    },
    created() {
        this.getDokter(),
            this.getSpesialis()
    },
    methods: {
        getDokter() {
            const params = this.$route.params.idSpesialis
            let type = "getData"
            let url = [
                `master/spesialis/${params}/get_dokter`, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.dokter = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        getSpesialis() {
            const namaSpesialis = this.$route.params.idSpesialis
            let type = "getData"
            let url = [
                `master/penyakit/spesialis_penyakit/${namaSpesialis}/edit`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.spesialis = result.data
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        CardDokter, SkeletonLoading, LoadingComponent
    }
}
</script>