<template>
    <div class="container">
        <template v-if="isLoading">
            <LoadingComponent class="mt-4" />
        </template>
        <template v-else-if="!detail.length">
            <div class="alert alert-warning mt-4 text-center">
                <p>
                    Yuk, segera checkout barang kamu sekarangg
                </p>
            </div>
        </template>
        <div v-else class="row p-lg-4">
            <h5 class="mb-3"><b>Checkout</b></h5>
            <div class="col-lg-9 col-md-12">
                <div class="border-bottom w-100 mb-1">
                    <h6><b>Alamat Pengiriman</b></h6>
                </div>
                <div class="border-bottom w-100 mb-1">
                    <P>{{ profil.user.nama }} <span v-if="selectedAddressData">({{ selectedAddressData.simpanSebagai
                    }})</span> <br> {{ profil.user.nomorHp }}
                        <br> <small class="text-secondary">
                            <div v-if="selectedAddressData">
                                <p>
                                    {{ selectedAddressData.lokasi }}
                                    <br />
                                    Note: {{ selectedAddressData.detail }}
                                </p>
                            </div>
                        </small>
                    </P>
                </div>
                <div class="border-bottom w-100 mb-3 p-2">
                    <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#tambahData">
                        pilih alamat pengiriman
                    </button>
                </div>
                <div class="row g-0 mt-2">
                    <template v-for="(data, index) in detail" :key="index">
                        <div class="col-md-10 border-bottom border-5 mt-2 border-light container">
                            <P><b>Pesanan {{ index + 1 }}</b></P>
                            <p>
                                <b>Apotek Arjawinangun</b> <br> <b class="text-secondary">{{ data.produk.namaProduk
                                }}</b> <br> <small> {{ data.qty }} produk | {{ data.produk.hargaProduk }}</small>
                            </p>
                        </div>
                        <div class="col-md-2 border-bottom border-5 border-light mt-2">
                        </div>
                        <div class="d-flex justify-content-between px-2">
                            <h6>Subtotal</h6>
                            <h6><b>{{ data.jumlahHarga }}</b></h6>
                        </div>
                    </template>
                </div>
            </div>
            <div class="col-lg-3 col-md-12">
                <div class="sticky-top">
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
                            <button @click="initiatePayment" :class="'btn btn-sm w-100 btn-dark'">
                                Bayar Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ModalComponent id="tambahData" labelBy="exampleModalLabel" :modalTitle="'Pilih Alamat Pengiriman'">
        <template #modal>
            <button class="btn rounded btn-outline-success mb-2 text-center w-100" @click="gantiHalaman">Tambah Alamat
                Baru</button>
            <div v-for="(data, index) in alamat" :key="index">
                <div :class="['card shadow mb-2', { 'border-primary': data.clicked }]" @click="aksi(data, index)">
                    <div class="card-body">
                        <p>
                            <b> {{ profil.user.nama }} </b> <span class="bg-primary rounded pe-2 ps-2 text-light">{{
                                data.simpanSebagai }}</span> <br> {{ profil.user.nomorHp }} <br> {{ data.lokasi }} <br>
                            note: {{
                                data.detail }}
                        </p>
                    </div>
                </div>
            </div>
            <button class="btn btn-success btn-sm rounded mb-2 text-center w-25"
                @click="saveAlamatToCookies">Simpan</button>
        </template>
    </ModalComponent>
    <ModalComponent id="tambahAlamat" modalTitle="Tambah Alamat">
        <template #modal>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for=""><b>Label Alamat</b></label>
                        <input type="text" v-model="form.simpan_sebagai" class="form-control" placeholder="contoh: Rumah">
                        <label for=""><b>Pilih Provinsi</b></label>
                        <select class="form-select w-100" v-model="selectedProvinsi" @change="showKabupaten">
                            <option value=""><b>pilih provinsi</b></option>
                            <option :value="data.id" v-for="data in provinsi">{{ data.nama }}</option>
                        </select>
                        <label for=""><b>Pilih Kabupaten atau Kota</b></label>
                        <select class="form-select w-100 mb-1" :disabled="isKotaDisabled" @change="showKecamatan"
                            v-model="selectedKota" id="kota" placeholder="pilih kota">
                            <option value="" selected>pilih kota</option>
                            <option :value="data.id" v-for="data in kota">{{ data.nama }}</option>
                        </select>
                        <label for=""><b>Pilih Kecamatan</b></label>
                        <select class="form-select w-100 mb-1" :disabled="isKecamatanDisabled" v-model="selectedKecamatan"
                            id="kecamatan" @change="showKelurahan" placeholder="pilih kecamatan">
                            <option value="" selected>pilih kecamatan</option>
                            <option :value="data.id" v-for="data in kecamatan">{{ data.nama }}</option>
                        </select>
                        <label for=""><b>Pilih Kelurahan</b></label>
                        <select class="form-select w-100 mb-1" :disabled="isKelurahanDisabled" v-model="selectedKelurahan"
                            id="kelurahan" placeholder="pilih kelurahan">
                            <option value="">pilih kelurahan</option>
                            <option :value="data.id" v-for="data in kelurahan">{{ data.nama }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6 ms-auto">
                    <label for=""><b>Detail Lokasi</b></label>
                    <textarea class="form-control mt-2 mb-1" :value="selectedLocations" rows="4"></textarea>
                    <label for=""><b>Catatan</b></label>
                    <textarea class="form-control mt-2 mb-2" v-model="form.detail" rows="4"></textarea>
                    <button class="btn btn-sm btn-success w-100" @click="postAlamat">Simpan Alamat</button>
                </div>
            </div>
        </template>
    </ModalComponent>
    <!-- <div class="container">
        <button class="btn btn-sm btn-primary" id="pay-button" @click="initiatePayment">Pay!</button>
        <pre><div id="result-json">JSON result will appear here after payment:<br>{{ paymentResult }}</div></pre>
      </div> -->
<!--     
      <form id="submit" method="POST" @submit.prevent="kirimPesan">
        <input type="hidden" id="cart" :value="this.$route.params.idKeranjanggg">
        <input type="hidden" name="json" id="json_callback">
      </form> -->
</template>
  
<script>
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import InputField from '@/components/partials-component/InputField.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue'
import Cookies from 'js-cookie'
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
            produk_id: '',
            profil: {},
            alamat: [],
            form: {
                simpan_sebagai: 'Rumah',
                lokasi: '',
                detail: 'Taro di depan aja'
            },
            selectedKota: null,
            selectedProvinsi: null,
            selectedKecamatan: null,
            selectedKelurahan: null,
            selectedIndex: null,
            paymentResult: '',
      snapp: []
        }
    },
    computed: {
        hasProduk() {
            return this.detail.length > 0
        },
        idDetail() {
            return this.items.idKeranjang
        },
        selectedAddressData() {
            const selectedAddressJson = Cookies.get('selectedAddress');
            return selectedAddressJson ? JSON.parse(selectedAddressJson) : null;
        },
        idKeranjang(){
            return this.detail
        }
    },
    methods: {
        getToken() {
      let type = "getData"
      let url = [
        `midtrans/get_token/${this.$route.params.idKeranjang}`, {}
      ]
      this.$store.dispatch(type, url).then((result) => {
        this.snapp = result[0]
        console.log(result);
      })
    },
        initiatePayment() {
      window.snap.pay(this.snapp.snapToken, {
        onSuccess: function (result) {
          let id_keranjang = document.getElementById("cart").value;
          axios.post("master/pembelian/checkout", {
            id_keranjang: id_keranjang
          }).then((response) => {
            window.location = "/"
          }).catch((error) => {
            console.log(error);
          })
        },
        onPending: function()
                {
                    alert("Good, Data Anda Sedang di Proses");

                    window.location = "/";
                },
                onError: function()
                {
                    alert("Periksa Kembali Data Anda");
                },
                onClose: function()
                {
                    alert("Yaah, Transaksi Anda Dibatalkan");
                }
      })
    },
        gantiHalaman() {
            window.location = '/alamat'
        },
        saveAlamatToCookies() {
            const selectedAddress = this.alamat.find((data) => data.clicked === true);

            if (selectedAddress) {
                const selectedAddressJson = JSON.stringify(selectedAddress);

                Cookies.set('selectedAddress', selectedAddressJson);
                this.selectedAddressData = selectedAddress; // Update the data property
                this.$swal({
                    icon: 'success',
                    title: 'Berhasil menyimpan perubahan alamat',
                }).then(() => {
                    window.location.reload(); // Refresh the page after clicking "OK"
                });
            } else {
                Cookies.remove('selectedAddress');
                this.selectedAddressData = null; // Update the data property
            }
        },
        aksi(data, index) {
            if (this.selectedIndex === index) {
                return;
            }
            if (this.selectedIndex !== null) {
                this.alamat[this.selectedIndex].clicked = false;
            }

            data.clicked = true;
            this.selectedIndex = index;
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
            this.isLoading = true
            this.$store.dispatch(type, [
                `keranjang/${this.idDetail}`, []
            ]).then((result) => {
                this.isLoading = false
                this.detail = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getProfil() {
            let type = "getData"
            let url = [
                "akun/profil/konsumen/profil", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.profil = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getAlamat() {
            let type = "getData"
            let url = [
                "master/alamat_user", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.alamat = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getSelectedName(selectedId, data) {
            if (!selectedId || !data) return ''; // Return an empty string if no data or ID is selected
            const selectedData = data.find(item => item.id === selectedId);
            return selectedData ? selectedData.nama : ''; // Return the name or an empty string if not found
        },
    },
    mounted() {
        this.getDetailCheckout(),
            this.getProfil(),
            this.getAlamat(),
            this.getToken()
        // this.getProvinsi(),
    },
    components: {
        LoadingComponent, ButtonComponent, SkeletonLoading, ModalComponent, InputField
    },
    watch: {
        checked: {
            handler() {
                this.calculateProduct();
            },
            deep: true,
        },
    },


}
</script>
  
<style>
.clickable {
    pointer-events: none;
}
</style>