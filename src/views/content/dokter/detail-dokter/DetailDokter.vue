<template>
    <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.go(-1)">
        <i class="fas fa-arrow-left">
        </i>
    </button>
    <div class="container pt-3">
        <div class="px-5 py-2 mb-5 mx-auto">
            <div class="d-flex justify-content-center">
                <template v-if="isLoading">
                    <LoadingComponent/>
                </template>
                <img src="../../../../assets/images/avadoktercowo.png" v-else class="mt-3 h-50 w-50 d-block img-fluid" alt="...">
            </div>
            <div class="mt-3">
                <template v-if="isLoading">
                    <SkeletonLoading/>
                </template>
                <template v-else>
                    <h5>Profil Dokter</h5>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut iste laudantium ab eligendi! Cum doloremque facere, enim itaque ut illum qui labore quisquam nulla perspiciatis, voluptas quasi dolor odio rem.
                    </p>
                </template>
                <template v-if="isLoading">
                    <SkeletonLoading/>
                </template>
                <template v-else>
                <h5>Keahlian Medis</h5>
                <template v-if="!detailKeahlian.length">
                    <div class="alert alert-info text-center">
                        <p>
                            Belum menambahkan keahlian
                        </p>
                    </div>
                </template>
                <div v-else class="mb-2" v-for="(data, index) in detailKeahlian" :key="index">
                        <p class="mb-0 text-dark">
                            <small>
                                {{ index + 1 }}. Mengatasi {{ data.keahlianId.namaKeahlian }}
                            </small>
                        </p>
                    </div>
                </template>
            </div>
            <template v-if="isLoading">
                <SkeletonLoading/>
            </template>
            <template v-else>
                <div class="alert alert-info text-start" v-if="detailDokter.biaya">
                biaya konsultasi online: Rp. {{ detailDokter.biaya.biaya }}
                </div>
                <div class="d-flex justify-content-start">
                    <button class="btn btn-dark btn-sm" @click="$redirect({name: 'Download App'})">
                        chat sekarang
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
export default {
    data() {
        return {
            detailDokter: [],
            detailKeahlian: [],
            isLoading: false
        }
    },
    computed: {
        idFromParams() {
            return {
                idDokter: this.$route.params.idDokter,
                idAhli: this.$route.params.idAhli
            }
        },
        hideFrom() {
            return this.$route.name === "Cari Keahlian"
        }
    },
    created() {
        this.getKeahlian()
        this.getDetailDokter()
    },
    methods: {
        getDetailDokter() {
            let type = "getData"
            let url = [
                "akun/dokter/" + this.idFromParams.idDokter + "/edit", []
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailDokter = result.data// Assign the id value
            }).catch((err) => {
                console.log(err);
            })
        },
        getKeahlian() {
            const idKeahlian = this.idFromParams.idAhli;
            let type = "getData";
            let url = [
                `master/ahli/keahlian/master/${idKeahlian}/get`, []
            ];
            this.isLoading = true
            this.$store.dispatch(type, url)
                .then((result) => {
                    this.detailKeahlian = result.data
                    this.isLoading = false
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    components: {
        SkeletonLoading, ButtonComponent, LoadingComponent
    }
}
</script>