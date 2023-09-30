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
        <template v-for="data in perawat">
            <template v-if="data.user.status == 1">
                <template v-if="isLoading">
                    <SkeletonLoading />
                </template>
                <div class="col" v-else>
                    <CardDokter :nama="data.user.nama + ', S.Kep.'" biaya="20.000" Label="Perawat" icon="fa-star" :rating="data.rating"
                        @click="$redirect({ name: 'Detail Perawat', params: { idPerawat: data.idPerawat, idAhli: data.user.id } })" />
                </div>
            </template>
        </template>
    </div>
</template>
<script>
import CardDokter from '../../../components/card/CardDokter.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
export default {
    data() {
        return {
            perawat: [],
            detailKeahlian: [],
            isLoading: false
        }
    },
    created() {
        this.getPerawat()
    },
    methods: {
        getPerawat() {
            let type = "getData"
            let url = [
                "akun/perawat", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
                this.perawat = result.data// Assign the id value
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        SkeletonLoading, CardDokter
    }
}
</script>