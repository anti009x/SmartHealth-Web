<template>
    <SectionHeaderBody Judul="Kategori Produk" Slogan="Cari Kategori Produkmu Di sini">
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
    <div class="container px-5 mt-3">
        <div class="row row-cols-1 row-cols-md-6 g-4">
            <div class="col" v-for="data in produkKategori">
                <template v-if="isLoading">
                    <LoadingComponent/>
                </template>
                <div class="card shadow border" v-else @click="$redirect({name: 'Produk Kategori', params: {idKategori: data.idKategoriProduk, namaKategori: data.slugKategoriProduk} })">
                    <div class="card-body text-center text-dark rounded">
                        <p>{{ data.namaKategoriProduk }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue'
import SectionHeaderBody from '../../../components/partials-component/SectionHeaderBody.vue';
export default {
    data() {
        return {
            produkKategori: [],
            isLoading: false 
        }
    },
    created() {
        this.getKategori()
    },
    components: {
        SectionHeaderBody, LoadingComponent
    },
    methods: {
        getKategori() {
            let type = "getData"
            let url = [
                "master/produk/kategori_produk", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.produkKategori = result.data
                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>