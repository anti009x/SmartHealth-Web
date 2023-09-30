<template>
    <div class="container">
        <div class="mb-3">
            <h4><b>Daftar Transaksi</b></h4>
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text border-0 bg-warning" id="search-addon">
                <i class="fas fa-magnifying-glass text-light"></i>
            </span>
            <input type="search" class="form-control rounded p-2" placeholder="Cari transaksimu di sini" />
        </div>
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col" v-for="data in riwayat">
                <div :class="['card rounded shadow']">
                    <div class="card-body">
                        <p> <i class="fas fa-shopping-bag text-primary me-2"></i>
                            <b class="me-2">Belanja</b> <span class="me-2">
                                {{ data.tanggalPembelian }}
                            </span>
                            <span class="bg-danger pe-2 ps-2 me-2 text-light rounded">
                                <small>
                                    {{ data.status }}
                                </small>
                            </span>
                            <span class="text-secondary">
                                {{ data.idPembelian }}
                            </span>
                        </p>
                        <p class="mb-0">
                            <b>Apotek Arjawinangun</b>
                        </p>
                        <p class="mb-0">
                            Paracetamol
                        </p>
                        <p>
                            Total harga: {{ data.totalPembelian }}
                        </p>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#detailPembelian"
                                @click="getDetail(data.idPembelian)">
                                lihat detail
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ModalComponent id="detailPembelian" modalTitle="Detail Transaksi">
        <template #modal>
            <div class="border-bottom mb-2">
                <p>
                    <b>Status Pemesanan: <span class="text-success">Selesai</span></b>
                </p>
            </div>
            <div class="d-flex justify-content-between border-bottom mb-2">
                <div>
                    <p class="text-secondary mb-0">No. invoice</p>
                    <p class="text-secondary mb-0">Tanggal Pembelian</p>
                </div>
                <div>
                    <p class="text-success mb-0" v-for="data in limitData.detail">
                        <template v-if="isLoading">
                            <LoadingComponent/>
                        </template>
                        <b v-else>{{ data.idPembelian }}</b>
                    </p>
                    <p class="text-success" v-for="data in limitData.detail">
                        <template v-if="isLoading">
                            <LoadingComponent/>
                        </template>
                        <b v-else>{{ data.createdAt }}</b>
                    </p>
                </div>
            </div>
            <div class="border-bottom pb-2">
                <p class="mb-2">
                    <b>Detail Produk</b>
                </p>
                <template v-if="isLoading">
                    <LoadingComponent/>
                </template>
                <div v-else class="border rounded mb-2" v-for="data in detail">
                    <div class="container">
                        <p class="mb-1">
                            {{ data.produk.namaProduk }} <br>
                            <span class="text-secondary"><small>{{data.qty}} x {{data.produk.harga}}</small></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="pt-2 border-bottom pb-2">
                <p class="mb-2">
                    <b>Informasi Pengiriman</b>
                </p>
                <p class="mb-0">Kurir   : JNE </p>
                <p class="mb-0">No.resi   : 2020202929 </p>
                <p class="mb-0" v-if="selectedAddressData">Alamat : {{selectedAddressData.lokasi}} </p>
            </div>
            <div class="border-bottom pb-2">
                <div class="pt-2">
                    <p class="mb-2">
                        <b>Rincian Pembayaran</b>
                    </p>
                    <div class="d-flex justify-content-between">
                        <div>
                            <p class="text-secondary mb-0">Metode Pembayaran</p>
                            <p class="text-secondary mb-0">Total Pembayaran</p>
                        </div>
                        <div>
                            <p class="text-dark mb-0">
                                <template v-if="isLoading">
                                    <LoadingComponent/>
                                </template>
                                <b v-else>BCA</b>
                            </p>
                            <p class="text-dark">
                                <template v-if="isLoading">
                                    <LoadingComponent/>
                                </template>
                                <b v-else>Rp. 20.000</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </ModalComponent>
</template>
<script>
import Cookies from 'js-cookie'
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
export default {
    data() {
        return {
            riwayat: [],
            idPembelian: [],
            detail: [],
            limit: 1,
            isLoading: false
        }
    },
    computed: {
        limitData() {
            return {
                detail: this.detail.slice(0, this.limit)
            }
        },
        selectedAddressData() {
            const selectedAddressJson = Cookies.get('selectedAddress');
            return selectedAddressJson ? JSON.parse(selectedAddressJson) : null;
        },
    },
    mounted() {
        this.getDetail()
    },
    created() {
        this.getDetailTransaksi()
    },
    methods: {
        getDetailTransaksi() {
            let type = "getData"
            let url = [
                "master/pembelian/transaksi", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.riwayat = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getDetail(idPembelian) {
            let type = "getData"
            let url = [
                `master/pembelian/transaksi/${idPembelian}`, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detail = result.data
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        ModalComponent, LoadingComponent
    }
}
</script>