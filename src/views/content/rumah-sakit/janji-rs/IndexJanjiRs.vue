<template>
    <div class="container">
        <button class="btn btn-sm btn-outline-dark shadow mt-3" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="card border-0 sticky-top" style="max-width: 720px;">
            <template v-if="isLoading">
                <SkeletonLoading />
            </template>
            <div class="row g-0" v-else data-aos="fade-right" data-aos-duration="700">
                <div class="col-md-4 col-3">
                    <img src="../../../../assets/images/avadoktercewe.png" class="px-3 py-3 img-fluid rounded-start"
                        alt="...">
                </div>
                <div class="col-md-8 col-9">
                    <div class="card-body pt-0 mt-0 pt-sm-4 mt-sm-2">
                        <div v-for="item in limitedData">
                            <h5 class="card-title mb-0">dr. {{ item.praktek.dokter }}</h5>
                        </div>
                        <p class="card-text text-secondary"><i>Dokter {{this.$route.params.namaSpesialis}}</i></p>
                        <hr>
                        <div class="d-flex justify-content-between">
                            <p class=""><i class="fas fa-thumbs-up text-primary"></i><small class="text-primary"> 99%
                                </small><small class="text-secondary">100 pasien</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <template v-if="isLoading">
                <SkeletonLoading />
            </template>
            <template v-else>
                <div data-aos="fade-right" data-aos-duration="700">
                    <h5>Profil Dokter</h5>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime corrupti enim nisi voluptatibus amet possimus, quam nobis necessitatibus architecto natus quidem excepturi suscipit molestiae totam doloribus dolorum exercitationem officia est?
                    </p>
                    <h5>Keahlian Medis</h5>
                    <div v-for="(data, index) in keahlian" :key="index" class="mb-2">
                        <p class="mb-0 text-dark">
                            <small>
                                {{ index + 1 }}.
                                {{ data.keahlianId.namaKeahlian }}</small>
                        </p>
                    </div>
                </div>
            </template>
        </div>
        <template v-if="isLoading">
            <SkeletonLoading/>
        </template>
        <template v-else>
            <div data-aos="fade-right" data-aos-duration="700">
                <div class="d-flex justify-content-between mb-2">
                    <h5>Pilih tanggal dan waktu kunjungan</h5>
                </div>
                <div class="row row-cols-1 row-cols-md-5 g-4 pb-5 mb-5">
                    <div v-for="data in jadwalPraktek" class="col">
                        <div :class="['card shadow d-block-none d-sm', { 'border-primary': data.clicked }]" @click="aksi(data)">
                            <div :class="['card-body', { 'text-primary': data.clicked }]">
                                <h5 class="mb-2">
                                    {{ data.tanggal }}
                                </h5>
                                <p>{{ data.mulaiJam }} - {{ data.selesaiJam }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
    <div class="fixed-bottom bg-light shadow">
        <div class="mt-3 mb-3">
            <div class="d-flex justify-content-end">
                <p class="mb-0 me-4">
                </p>
                <button class="btn btn-dark btn-sm me-4" @click="redirectToPage" :disabled="!isAnyClicked">
                    buat janji
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import SkeletonLoading from '../../../../components/partials-component/SkeletonLoading.vue'
import Button from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            jadwalPraktek: [],
            keahlian: [],
            selectedIdJdwl: null,
            limit: 1,
            isLoading: false
        }
    },
    components: {
        Button,
        SkeletonLoading
    },
    computed: {
        idFromParams() {
            return this.$route.params.idDetailPraktek
        },
        idAhli() {
            return this.$route.params.idAhli
        },
        isAnyClicked() {
            return this.selectedId !== null;
        },
        limitedData() {
            return this.jadwalPraktek.slice(0, this.limit)
        }
    },
    mounted() {
        this.getJadwalPraktek()
    },
    created() {
            this.getKeahlian()
    },
    methods: {
        getJadwalPraktek() {
            const idAhli = this.$route.params.idAhli
            const idRumahSakit = this.$route.params.idRumahSakit
            let type = "getData"
            let url = [
                `master/ahli/jadwal_praktek/${idAhli}/${idRumahSakit}`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.jadwalPraktek = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        aksi(data) {
            this.jadwalPraktek.forEach(item => {
                item.clicked = false;
            });
            data.clicked = true;
            this.selectIdJdwl = data.idJadwalPraktek;
        },
        redirectToPage() {
            if (this.isAnyClicked) {
                this.$router.push({
                    name: 'Detail Janji',
                    params: { idAhli: this.idAhli, idJadwalPraktek: this.selectIdJdwl }
                });
            }
        },
        getKeahlian() {
            const ahliId = this.$route.params.idAhli
            let type = "getData"
            let url = [
                `master/ahli/keahlian/master/${ahliId}/get`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.keahlian = result.data
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>