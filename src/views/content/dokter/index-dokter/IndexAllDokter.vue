<template>
    <div class="d-flex justify-content-start">
        <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="ms-3">
            <h5>
                Konsultasikan segera kondisi kesehatanmu
            </h5>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4 overflow-auto mt-2" style="max-height: 500px">
        <div class="col" v-for="data in dokters" :key="data.id">
            <template v-if="isLoading">
                <SkeletonLoading />
            </template>
            <template v-else-if="dokters.length === 0">
                <div class="alert alert-danger w-100 text-center">
                    <p>Data Dokter Tidak Ada</p>
                </div>
            </template>
            <CardDokter v-else :Image="data.foto" Label="Dokter Umum"
                :nama="'dr ' + data.userId.nama" :biaya="data.biaya.biaya"
                @click="$redirect({name: 'Detail Dokter', params: {idDokter: data.idDokter, idAhli: data.userId.id} })" />
        </div>
    </div>
</template>
<script>
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
import CardDokter from '@/components/card/CardDokter.vue';
export default {
    data() {
        return {
            dokters: [],
            isLoading: false
        }
    },
    created() {
        this.getDokter()
    },
    methods: {
        getDokter() {
            let type = "getData"
            let url = [
                "akun/dokter/data", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.dokters = result.data
                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    components: {
        CardDokter, SkeletonLoading
    }
}
</script>