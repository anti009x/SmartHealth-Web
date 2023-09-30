<template>
  <div class="body">
    <section id="services">
      <div class="container">
        <h5>Topik Terkini</h5>
        <div class="d-flex justify-content-start">
          <div v-for="data in kategoriArtikel">
            <p class="me-2 rounded border px-3 cursor-pointer"
              :class="{ 'bg-dark text-light': selectedKategori === data.idKategoriArtikel }"
              @click="selectKategori(data.idKategoriArtikel)">
              {{ data.namaKategori }}
            </p>
          </div>
        </div>
        <div class="row g-4">
          <div v-if="selectedKategori === null" v-for="data in allArtikel" class="col-md-4 col-lg-3 rounded">
            <template v-if="isLoading">
              <SkeletonLoading />
            </template>
            <CardArtikel v-else data-aos="fade-right" data-aos-duration="300" :title="data.judulArtikel"
              :image="data.foto" :description="data.deskripsi" @click="$redirect('/artikel/' + data.slugArtikel)">
            </CardArtikel>
          </div>
          <div v-else class="col-md-4 col-lg-3 rounded" v-for="item in artikel">
            <template v-if="isLoading">
              <SkeletonLoading />
            </template>
            <CardArtikel v-else data-aos="fade-right" data-aos-duration="300" :title="item.judulArtikel"
              :image="item.foto" :description="item.deskripsi"
              @click="$redirect('artikel/' + item.namaKategori + '/' + item.idArtikel)">
            </CardArtikel>
          </div>
          <div v-if="artikel.length < 1 && selectedKategori != null">
            <div class="alert alert-info text-center">
              <p>Maaf Data Artikel Belum Tersedia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
<script>
import CardArtikel from '@/components/card/CardArtikel.vue';
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
export default {
  components: {
    CardArtikel, SkeletonLoading
  },
  data() {
    return {
      artikel: [],
      kategoriArtikel: [],
      allArtikel: [],
      selectedKategori: null,
      isLoading: false
    };
  },
  created() {
    this.getKategori()
    this.getArtikel()
  },
  watch: {
    selectedKategori(val) {
      this.getGroupingArtikel()
    }
  },
  methods: {
    selectKategori(id) {
      this.selectedKategori = id;
    },
    getKategori() {
      let type = "getData"
      let url = [
        "master/kategori_artikel", {}
      ]
      this.$store.dispatch(type, url).then((result) => {
        this.kategoriArtikel = result.data
      }).catch((err) => {
        console.log(err);
      })
    },
    getGroupingArtikel() {
      let type = "getData"
      let url = [
        `master/grouping_artikel/${this.selectedKategori}/kategori`, {
        }
      ]
      this.isLoading = true
      this.$store.dispatch(type, url).then((result) => {
        this.artikel = result.data
        setTimeout(() => {
          this.isLoading = false
        }, 1000);
      }).catch((err) => {
        console.log(err);
      })
    },
    getArtikel() {
      let type = "getData"
      let url = [
        "master/artikel", {}
      ]
      this.isLoading = true
      this.$store.dispatch(type, url).then((result) => {
        this.allArtikel = result.data
        this.isLoading = false
      }).catch((err) => {
        console.log(err);
      })
    }
  },
};
</script>