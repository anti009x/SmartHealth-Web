<template>
    <div class="container">
        <template v-if="hasProduk">
            <div class="row p-lg-4">
                <h5><b>Keranjang Kamu</b></h5>
                <div class="col-lg-9 col-md-12">
                    <div class="d-flex justify-content-between border-bottom border-light border-5">
                        <input type="checkbox" v-model="selectAll" @click="clickAll">
                        <p class="mb-1 text-success font-weight-bold" @click="deleteChecked"><b>Hapus</b></p>
                    </div>
                    <div class="row g-0 mt-3">
                        <template v-for="data in detail">
                            <div class="col-md-2 border-bottom border-5 border-light mt-2">
                                <input type="checkbox" :checked="selected.includes(data.idKeranjangDetail)" @change="toggleCheckbox(data.idKeranjangDetail)">
                            </div>
                            <div class="col-md-8 border-bottom border-5 mt-2 border-light container">
                                <p>
                                    <b>Apotek Arjawinangun</b> <br> <b class="text-secondary">{{ data.produk.namaProduk }}</b> <br> <small>{{ data.produk.hargaProduk }}</small>
                                </p>
                            </div>
                            <div class="col-md-2 border-bottom border-5 border-light mt-2">
                                <P class="text-primary mt-3"
                                    @click="$redirect({ name: 'Detail Produk', params: { id: data.produk.kodeProduk } })">
                                    Lihat
                                    Produk</P>
                            </div>
                            <div class="d-flex justify-content-end">
                                <p class="px-5">
                                    <i class="fas fa-trash text-danger" @click="deleteOne(data.idKeranjangDetail)"></i>
                                </p>
                                <p></p>
                                <div>
                                    <i class="fas fa-minus text-success" @click="decrementQty(data.idKeranjangDetail)"></i>
                                    <span class="ms-2 me-2">{{ data.qty }}</span>
                                    <i class="fas fa-plus text-success" :class="{ 'disabled': data.qty === 1 }"
                                        @click="incrementQty(data.idKeranjangDetail)"></i>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="col-lg-3 col-md-12 sticky-center">
                    <div class="card shadow-lg border-0">
                        <div class="card-header">
                            <b>Ringkasan Belanja</b>
                        </div>
                        <div class="card-body">
                            <div class="card-text border-bottom pb-2 text-secondary">
                                <p class="mb-0">
                                    <small>Total Harga: {{ items.jumlahHarga }} </small>
                                </p>
                                <p class="mb-0">
                                    <small>Total Diskon Barang: {{ items.jumlahHarga }} </small>
                                </p>
                            </div>
                            <p class="mb-0 mt-2">
                                <b>Total Harga: {{ items.jumlahHarga }} </b>
                            </p>
                        </div>
                        <div class="card-footer text-center">
                            <button @click="$redirect({name: 'Checkout'})" :class="'btn btn-sm w-100 btn-dark'" :disabled="selected.length === 0">
                                Beli Sekarang ({{ calculateProduct() }})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="row p-3 justify-content-center">
                <div class="col-md-8">
                    <p>nampaknya kamu belum masukkin produk nihhhhh</p>
                </div>
            </div>
        </template>
        <div class="row p-3">
        <div class="col-8 col-md-12">
            <div>
                <h5><b>Rekomendasi Produk Untukmu</b></h5>
            </div>
            <div class="row row-cols-1 row-cols-md-6 g-4">
                <div class="col" v-for="data in dataProduk">
                    <template v-if="isLoading">
                        <SkeletonLoading />
                    </template>
                    <div v-else class="card shadow border-0" v-if="!isLoading">
                        <div class="embed-responsive embed-responsive-16by9">
                            <img src="../../../assets/images/9.png" class="card-img-top" alt="...">
                        </div>
                        <div class="card-body">
                            <p class="mb-0">{{ data.namaProduk }}</p>
                            <div class="text-secondary" style="font-size: 14px">
                                <p class="mb-0"><small>{{ data.deskripsiProduk }}</small></p>
                                <div class="d-flex justify-content-end">
                                    <p class="mb-2"><small>{{ data.hargaProduk }}</small></p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <router-link class="btn btn-sm btn-outline-primary w-75"
                                        :to="{ name: 'Detail Produk', params: { id: data.kodeProduk } }">
                                        detail
                                    </router-link>
                                    <div class="">
                                        <button class="btn btn-sm btn-primary" @click="addToCart(data.id)">
                                            <i class="fas fa-cart-shopping text-light"
                                                ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue'
export default {
    data() {
        return {
            items: {},
            produk_id: '',
            idKeranjangDetail: '',
            isLoading: false,
            selected: [],
            detail: [],
            isSelected: [],
            dataProduk: [],
            selectAll: false,
            produk_id: ''
        }
    },
    computed: {
        hasProduk() {
            return this.detail.length > 0
        },
        idDetail() {
            return this.items.idKeranjang
        }
    },
    methods: {
        clickAll() {
            if (this.selectAll) {
                this.$nextTick(() => {
                    this.selected = this.detail.map(data => data.idKeranjangDetail);
                });
            } else {
                this.selected = [];
            }
        },
        toggleAllCheckboxes() {
            if (this.selectAll) {
                this.selected = this.detail.map(data => data.idKeranjangDetail);
            } else {
                this.selected = [];
            }
        },
        calculateProduct() {
            let totalPrice = 0;
            for (const data of this.detail) {
                if (this.selected.includes(data.idKeranjangDetail)) {
                    totalPrice += data.qty;
                }
            }
            return totalPrice;
        },
        getDetailCheckout() {
            let type = "getData"
            let url = [
                "keranjang", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.items = result.data
                this.getKeranjang()
            }).catch((err) => {
                console.log(err);
            })
        },
        getKeranjang() {
            let type = "getData"
            this.$store.dispatch(type, [
                `keranjang/${this.idDetail}`, []
            ]).then((result) => {
                this.isLoading = false
                this.detail = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        withBui() {
            let type = "postData"
            let url = [
                "invoice", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                window.open(result.data.invoiceUrl, "_blank")
            }).catch((err) => {
                console.log(err);
            })
        },
        incrementQty(idKeranjangDetail) {
            let type = "putData"
            let url = [
                `detail_keranjang/tambah/${idKeranjangDetail}`, {},
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false,
                    this.getDetailCheckout()
            }).catch((err) => {
                console.log(err);
            })
        },
        decrementQty(idKeranjangDetail) {
            let type = "putData"
            let url = [
                `detail_keranjang/kurang/${idKeranjangDetail}`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.getDetailCheckout()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteOne(idKeranjangDetail) {
            let type = "deleteData";
            let url = [
                `detail_keranjang`, idKeranjangDetail, {}
            ];
            this.$swal({
                icon: 'question',
                title: "Apakah kamu ingin menghapus produk ini dari keranjang?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch(type, url)
                        .then((result) => {
                            this.$swal({
                                icon: 'success',
                                title: 'Berhasil hapus data keranjang'
                            });
                            this.getDetailCheckout();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
        },
        deleteChecked() {
            if (this.selected.length === 0) {
                return;
            }
            let type = "deleteData";
            let urls = this.selected.map((idKeranjangDetail) => ["detail_keranjang", idKeranjangDetail]);
            this.$swal({
                icon: 'question',
                title: "Apakah kamu ingin menghapus produk ini dari keranjang?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((results) => {
                if (results.isConfirmed) {
                    Promise.all(urls.map((url) => this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                    this.getDetailCheckout();
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            this.selected = [];
        },
        getProduk() {
            let type = "getData"
            let url = [
                "apotek/produk/data_produk", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataProduk = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        addToCart(produk_id) {
            const message = "Data Berhasil di Tambahkan"
            let type = "postData"
            let url = [
                "keranjang", {
                    produk_id
                }, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                if (result.pesan == message) {
                    this.$swal({
                        icon: 'success',
                        title: 'berhasil menambahkan ke keranjang'
                    })
                    this.getDetailCheckout()
                } else {
                    this.$swal({
                        icon: 'error',
                        title: 'kamu harus login dulu nih'
                    }).then(()=>{
                        this.$router.push({name: 'LoginUser'})
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        },

    },
    mounted() {
        this.getDetailCheckout(),
        this.getProduk()
    },
    components: {
        LoadingComponent, ButtonComponent, SkeletonLoading
    },
    watch: {
        checked: {
            handler() {
                this.calculateProduct();
            },
            deep: true,
        },
        selectAll: {
            handler() {
                this.toggleAllCheckboxes();
            },
            immediate: true,
        },
    },


}
</script>
  
<style></style>
  