<template>
    <div v-if="valueSearch.length < 1">
        <div class="col-lg-12 col-md-12">
            <div class="card alert alert-dark border-0 shadow">
                <div class="card-body">
                    <div class="align-items-center">
                        <div class="text-dark text-center">
                            <img src="../../../assets/images/28.png" class="img-fluid h-75 w-75 mb-0" alt="">
                            <p class="mb-0">
                                <b>
                                Hasil tidak ditemukan
                                </b>
                            </p>
                            <p class="mb-2">
                                <b>
                                    Cek ejaan atau coba gunakan istilah yang lebih umum.
                                </b>
                            </p>
                            <ButtonComponent @click="$redirect({name: 'Page Dokter'})" Color="btn-danger" Label="Kembali"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-3">
        <div class="col" v-for="data in valueSearch">
            <template v-if="isLoading"></template>
            <CardDokter v-else :nama="'dr '+ data.userId.nama" Label="Dokter Umum" biaya="20000" @click="$redirect({name: 'Detail Dokter', params: {idDokter: data.idDokter, idAhli: data.userId.id} })" />
        </div>
    </div>
</template>
<script>
import Skeleton from '@/components/partials-component/SkeletonLoading.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import CardDokter from '../../../components/card/CardDokter.vue';
export default {
    data(){
        return {
            isLoading: false,
        }
    },
    props: {
        valueSearch: {
            type: Array,
            default: () => [],
        }
    },
    components: {
    ButtonComponent,
    CardDokter,
    Skeleton
}
}
</script>  