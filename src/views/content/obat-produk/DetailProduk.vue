<template>
    <div class="container col-xxl-10">
        <div class="row">
            <div class="col-lg-4">
                <div class="pt-5">
                    <img :src="detailProduk.fotoProduk" class="img-fluid" alt="foto belum tersedia">
                </div>
            </div>
            <div class="col-lg-4">
                <div class="pt-5">
                    <h5 class="text-dark"><b>{{ detailProduk.namaProduk }}</b></h5>
                    <h3>{{ detailProduk.hargaProduk }}</h3>
                    <hr>
                    <h5 class="text-primary"><b>Detail</b></h5>
                    <p>
                        {{ detailProduk.deskripsiProduk }}
                    </p>
                        <button class="btn btn-sm btn-outline-primary" @click="addCart(detailProduk.id)">
                          Add to cart  <i class="fas fa-cart-shopping"></i>
                        </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import iziToast from 'izitoast'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
export default {
    data() {
        return {
            isLoading: false,
            detailProduk: [],
            produk_id: ''
        }
    },
    components: {
        SkeletonLoading
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        pathUrl() {
            return this.$route.fullPath
        }
    },
    created() {
            this.getDetailProduk()
    },
    methods: {
        shareProduk() {
            const pesan = this.detailProduk.deskripsiProduk
            const path = this.pathUrl
            window.location = `https://api.whatsapp.com/send?text=${pesan}., http://10.0.140.209:5173${path}`
        },
        getDetailProduk() {
            let type = "getData"
            let url = [
                "apotek/produk/data_produk/" + this.idFromParams + "/edit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailProduk = result.data
            }).catch((error) => {
                console.log(err);
            })
        },
        addCart(produk_id){
            let type = "postData"
            let url = [
                "keranjang", {produk_id}, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                iziToast.success({
                    icon: 'sucesss',
                    title: 'Berhasil menambahkan produk ke keranjang',
                    position: 'topRight',
                    timeout: 2000
                })
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>

<style>
.form-control:focus {
    border-color: #4538db;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(95, 124, 218, 0.6);
}
</style>

<script>
</script>