<template>
    <div class="col-lg-12 col-md-6 pt-3 pb-3">
        <div class="d-flex align-items-center mt-5 pt-3">
            <div class="col-12 mx-auto">
                <div class="text-center pt-5" v-if="antrian.status == 0">
                    <h5><b>Kunjungan kamu ke dokter {{antrian.praktek.ahli.user.nama}} udah selesai nihhh</b></h5>
                    <p><small>
                        {{ antrian.praktek.jadwal.tanggal }}
                    </small></p>
                    <img class="img-fluid" src="../../../assets/images/giftsuccess.gif" alt="">
                </div>
                <div v-else class="card shadow w-50 mx-auto pb-2">
                    <div class="card-body">
                        <div class="card-title px-4">
                            <p class="mb-0"><b>Ringkasan Detail Janji Kunjungan</b></p>
                        </div>
                        <div class="card-text px-4">
                            <!-- <div v-for="data in detailDokter"> -->
                            <p class="mb-0">
                                kunjungan untuk dr. {{ antrian.praktek.ahli.user.nama }}
                            </p>
                            <p class="mb-0 text-secondary">
                                <small>
                                    plumbon
                                </small>
                            </p>
                            <!-- </div> -->
                            <p class="mb-0">
                                <small>
                                    tanggal - {{ antrian.praktek.jadwal.tanggal }} | jam- {{ antrian.praktek.jadwal.detail.mulaiJam }}
                                </small>
                            </p>
                            <hr>
                            <p><b>Ringkasan Pembayaran</b></p>
                            <div class="d-flex justify-content-between">
                                <p class="mb-0">
                                    Biaya Layanan
                                </p>
                                <p class="mb-0 text-success">
                                    Gratis
                                </p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-0">
                                    Biaya Konsultasi
                                </p>
                                <p class="mb-0 text-dark">
                                    {{ antrian.praktek.ahli.biaya.toLocaleString('id-ID') }}
                                </p>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between">
                                <p class="mb-0">
                                    <b>
                                        Total pembayaran
                                    </b>
                                </p>
                                <p class="mb-0 text-dark">
                                    {{ antrian.praktek.ahli.biaya.toLocaleString('id-ID') }}
                                </p>
                            </div>
                            <div class="alert alert-info mt-4" role="alert">
                                <p class="mb-0 mt-0">
                                    <small>
                                        Silakan membayar biaya kunjungan dan biaya tambahan lainnya secara langsung di RS.
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            antrian: {},
            namaRs: {}
        }
    },
    computed: {
        idFromParams(){
            return this.$route.params.idJadwalDokter
        },
        id(){
            return this.antrian.idJadwalAntrian
        }
    },
    created() {
        this.getAntrian(),
        this.getDetailAntrian()
    },
    methods: {
        getAntrian() {
            let type = "getData"
            let url = [
                `qr/${this.idFromParams}`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.antrian = result
                this.namaRs = result
            }).catch((err) => {
                console.log(err);
            })
        },
        getDetailAntrian(){
            let type = "getData"
            let url = [
                `ahli/jadwal_antrian/${this.idFromParams}`, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
                this.antrian = result.data
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>