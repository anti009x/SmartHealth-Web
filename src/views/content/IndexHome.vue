<template>
  <section id="hero" class="d-flex align-items-start">
    <div class="container">
      <div class="px-5 py-5 mt-4" data-aos="fade-right" data-aos-duration="3000">
        <h1 :class="'display-4 fw-bold ' + colorText">Solusi Kesehatan Anda</h1>
        <div class="col-lg-6">
          <p class="lead fw-bold">
            Konsultasi Dokter, Perawatan Intensif, Beli Obat, Informasi Seputar Kesehatan, Semua
            bisa di Berobat+
          </p>
          <ButtonComponent Label="get started" Color=" btn-primary" />
        </div>
      </div>
    </div>
  </section>
  <section id="feature">
    <div class="container">
      <TitleFeature Label="Layanan Utama" />
      <p class="ms-2">Berikut pelayanan klinis yang tersedia</p>
      <div class="row g-4 row-cols-lg-3">
        <div @click="$redirect({ name: 'Page Dokter' })">
          <template v-if="isLoading">
            <SkeletonLoading />
          </template>
          <FeaturePrimary
            v-else
            labelTitle="Chat Dengan Dokter"
            icon="fa-user-doctor"
            labelParagraph="Konsultasi chat dengan dokter "
          >
          </FeaturePrimary>
        </div>
        <template v-if="isLoading">
          <SkeletonLoading />
        </template>
        <div v-else @click="$redirect({ name: 'Data Produk' })">
          <FeaturePrimary
            v-if="!isLoading"
            labelTitle="Toko Kesehatan"
            icon="fa-suitcase-medical"
            labelParagraph="Obat dan Vitamin"
          >
          </FeaturePrimary>
        </div>
        <div @click="$redirect({ name: 'Rumah Sakit Terdekat' })">
          <SkeletonLoading v-if="isLoading" />
          <FeaturePrimary
            v-if="!isLoading"
            labelTitle="Rumah Sakit"
            icon="fa-hospital"
            labelParagraph="Buat janji dengan RS"
          >
          </FeaturePrimary>
        </div>

        <div @click="$redirect({ name: 'diagnosispakar' })">
          <SkeletonLoading v-if="isLoading" />
          <FeaturePrimary
            v-if="!isLoading"
            labelTitle="Diagnosis Kesehatan"
            icon="fa-solid fa-file-medical"
            labelParagraph="Dapatkan Informasi Kesehatan Dengan Mengisi Form Quersioner"
          >
          </FeaturePrimary>
        </div>

        <div @click="$redirect({ name: 'Halaman Diagnosa Stroke' })">
          <template v-if="isLoading">
            <SkeletonLoading />
          </template>
          <FeaturePrimary
            v-else
            labelTitle="Diagnosis Stroke"
            icon="fa-solid fa-stethoscope"
            labelParagraph="Diagnosis Stroke"
          >
          </FeaturePrimary>
        </div>

        <div @click="$redirect({ name: 'Halaman Stroke Analysis' })">
          <template v-if="isLoading">
            <SkeletonLoading />
          </template>
          <FeaturePrimary
            v-else
            labelTitle="Test Risiko Stroke"
            icon="fa-solid fa-brain"
            labelParagraph="Kenali tanda kamu menginap stroke"
          >
          </FeaturePrimary>
        </div>
      </div>

      <div></div>
    </div>
  </section>
  <section id="services" class="services">
    <div class="container">
      <div class="row" style="flex-wrap: nowrap">
        <div class="d-flex justify-content-between">
          <div class="col-sm-6">
            <TitleFeature Label="Baca Artikel" class="mb-0" />
            <p class="ms-2">Dapatkan informasi kesehatan dan lainnya</p>
          </div>
          <template v-if="artikels.length > 4">
            <div class="col-sm-6 text-end">
              <TitleFeature
                Label="Lihat semua"
                @click="$redirect('/artikel')"
                class="text-primary"
              />
            </div>
          </template>
          <template v-else> </template>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col" v-for="data in limitedData.artikels" :key="data.id">
          <template v-if="loadingArtikel">
            <SkeletonLoading />
          </template>
          <CardArtikel
            v-else
            :title="data.judulArtikel"
            :image="data.foto"
            :description="data.deskripsi"
            @click="$redirect('/artikel/' + data.slugArtikel)"
          >
          </CardArtikel>
        </div>
      </div>
    </div>
  </section>
  <section id="obat">
    <div class="container mb-5">
      <div class="d-flex justify-content-between">
        <TitleFeature Label="Obat & Vitamin" />
        <div v-if="produkKategori.length > 4">
          <TitleFeature
            Label="Lihat semua"
            class="text-primary"
            @click="$redirect({ name: 'Semua Kategori' })"
          />
        </div>
        <div v-else></div>
      </div>
      <p class="ms-2">
        Dapatkan informasi seputar kandungan, aturan, petunjuk penggunaan obat dan vitamin di sini
      </p>
      <div class="row g-4 row-cols-lg-4">
        <div v-for="data in limitedData.produkKategori" :key="data.id">
          <SkeletonLoading v-if="isLoading" />
          <router-link
            :to="{
              name: 'Produk Kategori',
              params: { idKategori: data.idKategoriProduk, namaKategori: data.namaKategoriProduk }
            }"
            style="text-decoration: none"
          >
            <CardMedicine v-if="!isLoading" :labelTitle="data.namaKategoriProduk" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import FeaturePrimary from '@/components/FeaturePrimary.vue'
import TitleFeature from '@/components/partials-component/TitleFeature.vue'
import CardArtikel from '@/components/card/CardArtikel.vue'
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue'
import CardMedicine from '@/components/card/CardMedicine.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import Cookies from 'js-cookie'
export default {
  props: {
    colorText: {
      type: String,
      default: 'text-primary'
    }
  },
  components: {
    ButtonComponent,
    FeaturePrimary,
    TitleFeature,
    LoadingComponent,
    CardArtikel,
    CardMedicine,
    SkeletonLoading
  },
  data() {
    return {
      users: [],
      artikels: [],
      produkKategori: [],
      limit: 4,
      maxLength: 20,
      isLoading: false,
      loadingArtikel: false
    }
  },
  created() {
    this.getArtikel()
    this.getKategoriObat()
  },
  computed: {
    limitedData() {
      return {
        artikels: this.artikels.slice(0, this.limit),
        produkKategori: this.produkKategori.slice(0, this.limit)
      }
    }
  },
  methods: {
    getArtikel() {
      let type = 'getData'
      let url = ['master/artikel', {}]
      this.loadingArtikel = true
      this.$store
        .dispatch(type, url)
        .then((result) => {
          this.artikels = result.data
          this.loadingArtikel = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getKategoriObat() {
      let type = 'getData'
      let url = ['master/produk/kategori_produk', {}]
      this.isLoading = true
      this.$store
        .dispatch(type, url)
        .then((result) => {
          this.produkKategori = result.data
          this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
@media (max-width: 767px) {
  .row {
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .col-md-4.col-lg-3 {
    flex: 0 0 auto;
    width: auto;
  }
}
</style>
