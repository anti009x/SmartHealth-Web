<template>
    <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.go(-1)">
        <i class="fas fa-arrow-left">
        </i>
    </button>
    <div class="container pt-3">
        <div class="px-5 py-2 mb-5 mx-auto">
            <div class="d-flex justify-content-center">
                <template v-if="isLoading">
                    <LoadingComponent />
                </template>
                <img v-else src="../../../assets/images/avaperawat.jpg" class="mt-3 h-50 w-50 d-block img-fluid" alt="...">
            </div>
            <div class="mt-3">
                <template v-if="isLoading">
                    <SkeletonLoading />
                </template>
                <template v-else>
                    <h5>Profil Perawat</h5>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime alias provident tenetur iusto ex. Veniam qui, quia fugit itaque ipsa error, repudiandae cum nemo nobis harum minima aspernatur? Ratione, necessitatibus?
                    </p>
                </template>
                <template v-if="isLoading">
                    <SkeletonLoading />
                </template>
                <template v-else>
                    <h5 v-if="hasDetailKeahlian">Keahlian Medis</h5>
                    <div class="mb-2" v-for="(data, index) in detailKeahlian" :key="index" v-if="hasDetailKeahlian">
                        <p class="mb-0 text-dark">
                            <small>
                                {{ index + 1 }}. Mengatasi {{ data.keahlianId.namaKeahlian }}
                            </small>
                        </p>
                    </div>
                    <template v-else>
                        <div class="alert alert-warning text-center">
                            <p>
                                maaf, sepertinya {{detailPerawat.user.nama}} belum menambahkan keahliannya
                            </p>
                        </div>
                    </template>
                </template>
            </div>
            <template v-if="isLoading">
                <SkeletonLoading />
            </template>
            <template v-else>
                <div class="alert alert-info text-start">
                    biaya konsultasi online: Rp. 20000
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
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
export default {
    data() {
        return {
            detailPerawat: [],
            detailKeahlian: [],
            isLoading: false
        }
    },
    computed: {
        idFromParams() {
            return {
                idPerawat: this.$route.params.idPerawat,
                idAhli: this.$route.params.idAhli
            }
        },
        hideFrom() {
            return this.$route.name === "Cari Keahlian"
        },
        hasDetailKeahlian() {
            return this.detailKeahlian.length > 0
        }
    },
    mounted() {
        this.getKeahlian()
    },
    created() {
        this.getdetailPerawat()
    },
    methods: {
        getdetailPerawat() {
            let type = "getData"
            let url = [
                "akun/perawat/" + this.idFromParams.idPerawat + "/edit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.detailPerawat = result.data// Assign the id value
                setTimeout(() => {
                    this.isLoading = false
                }, 7000);
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
            // this.isLoading = true
            this.$store.dispatch(type, url)
                .then((result) => {
                    this.isLoading = false
                    this.detailKeahlian = result.data
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    components: {
        SkeletonLoading, LoadingComponent
    }
}
</script>