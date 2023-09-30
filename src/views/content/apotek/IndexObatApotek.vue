<template>
    <SectionHeaderBody Judul="BerobatShop" :Slogan="'Cari Produk ' + this.$route.params.namaKategori + ' di sini'">
        <template #router>
            <router-link style="text-decoration: none" :to="{ name: 'IndexHome' }">
                <p class="text-light">
                    Home
                    /
                    <router-link :to="{ name: 'Data Produk' }" class="text-light" style="text-decoration: none">
                        {{ $route.name }}
                    </router-link>
                </p>
            </router-link>
        </template>
        <template #input>
            <div class="input-group">
                <span class="input-group-text border-0 bg-warning" id="search-addon"><i
                        class="fas fa-magnifying-glass text-light"></i></span>
                <input type="search" class="form-control rounded p-2" placeholder="Cari nama obat atau vitamin" />
            </div>
        </template>
    </SectionHeaderBody>
    <div class="container-fluid" style="background-color:ghostwhite;">
        <div class="container pb-3">
            <div class="d-flex justify-content-between mt-3 pt-3">
                <h6><b>Produk</b></h6>
            </div>
            <div class="row g-4">
                <div v-for="data in produkKategori" class="col-6 col-sm-4 col-md-3 col-lg-2">
                    <template v-if="isLoading">
                        <SkeletonLoading />
                    </template>
                    <div v-else class="card shadow border-0">
                        <div class="embed-responsive embed-responsive-16by9">
                            <img src="../../../assets/images/obat.jpeg" class="card-img-top h-50" alt="foto belum tersedia">
                        </div>
                        <div class="card-body">
                            <p class="mb-0">{{ data.produk.namaProduk }}</p>
                            <p class="mb-1 text-secondary" style="font-size: 14px"><small> Cirebon | terjual 2
                                </small></p>
                            <div class="text-secondary">
                                <div class="d-flex justify-content-end">
                                    <p class="mb-0" style="font-size: 12px">
                                        4.5
                                        <i class="fas fa-star text-warning mb-2"></i>
                                    </p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <router-link class="btn btn-sm btn-outline-primary w-100"
                                        :to="{ name: 'Detail Produk', params: { id: data.produk.kodeProduk } }">
                                        detail
                                    </router-link>
                                    <!-- <button class="btn btn-sm btn-primary" > -->
                                    <i class="fas fa-cart-shopping text-primary mt-2 ms-1" @click="addCart(data.produk.idProduk)"></i>
                                    <!-- </button> -->
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
import SectionHeaderBody from '../../../components/partials-component/SectionHeaderBody.vue'
import SkeletonLoading from '@/components/partials-component/LoadingComponent.vue'
export default {
    data() {
        return {
            produkKategori: [],
            isLoading: false,
            produk_id: ''
        };
    },
    created() {
        this.getKategoriProduk();
    },
    computed: {
        hasProduk() {
            return this.produkKategori.length > 0
        }
    },
    methods: {
        getKategoriProduk() {
            const kategoriId = this.$route.params.idKategori;
            let type = "getData";
            let url = [
                `apotek/produk/produk_kategori/${kategoriId}`,
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.produkKategori = result.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        addCart(produk_id){
            let type = "postData"
            let url = [
                "keranjang", {produk_id}, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.$swal({
                    icon: 'success',
                    title: (result.pesan)
                })
                console.log(result
                );
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: { SectionHeaderBody, SkeletonLoading }
}
</script>