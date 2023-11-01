<template>
  <div class="container">
    <div class="row align-items-top">
      <div class="d-flex">
        <!-- <div class="mh-100 col-md-6 py-4" style="background-color: #e3effa; height: 700px"> -->
        <div class="flex-item-left p-4 flex-fill">
          <h6><b>Test Risiko Stroke</b></h6>
          <p class="mb-0 py-2" style="font-size: 15px">
            Stroke merupakan gangguan fungsi otak yang terjadi karena terhentinya suplai darah ke
            otak, baik karena sumbatan (stroke iskemik) ataupun karena pecahnya pembuluh darah
            (stroke hemoragik). Stroke terjadi secara mendadak, kapanpun dan di manapun, saat
            beristirahat maupun saat beraktivitas. Untuk itu kamu harus mengenali gejala stroke
            sedini mungkin dengan langkah mudah. FAST (Face, Arms, Speech dan Time) untuk mendeteksi
            gejala awal stroke.
          </p>
          <dl style="list-style-type: none">
            <li>
              <p style="font-size: 18px"><b>Hasil test yang diperoleh</b></p>
            </li>
            <li>
              <i class="fa-solid fa-check-circle py-2 px-2"></i> Informasi seputar Stroke
              berdasarkan skor risiko
            </li>
            <li>
              <i class="fa-solid fa-check-circle px-2"></i> Akses cepat ke layanan kesehatan  yang tepat sesuai risiko
            </li>
          </dl>
        </div>
        <div class="flex-item-right flex-fill">
          <!-- Stepper -->
          <div>
            <img
              src="../../../assets/images/banner-test-stroke.png"
              alt=""
              style="height: 100%"
              justify-content
            />
            <div class="p-4">
              <p class="mb-0 py-2" style="font-size: 14px; color: #625757"><u>Disclaimer</u></p>
              <p class="mb-0 py-2" style="font-size: 11px; color: #625757">
                Test ini tidak bertujuan untuk menggantikan diagnosa medis, Anda tetap dianjurkan
                untuk berkonsultasi dengan pihak medis
              </p>
              <div class="d-grid gap-2 col-12 mx-auto">
                <button type="button" class="btn btn-primary">Lakukan Pengecekan</button>
              </div>
            </div>
            <!-- <router-view :valueSearch="valueSearch"></router-view> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from '@/components/partials-component/InputField.vue'
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue'
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import BodyDetailDokter from '@/components/BodyDetailDokter.vue'
import { debounce } from 'lodash'

export default {
  data() {
    return {
      search: '',
      dokterLimit: 4,
      specialistLimit: 12,
      isLoading: false,
      isSearching: false,
      valueSearch: []
    }
  },
  components: {
    HeaderComponent,
    FooterComponent,
    SkeletonLoading,
    BodyDetailDokter,
    LoadingComponent,
    InputField
  },
  watch: {
    search: debounce(function (val) {
      if (val !== '') {
        this.$router.push({
          path: '/chat/cari',
          query: { search: val }
        })
        this.searchKeahlian()
      } else {
        if (this.$route.path === '/chat/cari') {
          this.$router.replace({ query: null })
        } else {
          this.$router.push('/chat/dokter')
        }
      }
    }, 1000)
  },
  methods: {
    searchKeahlian() {
      if (this.isLoading) return // Prevent concurrent API requests
      this.isLoading = true

      let type = 'postData'
      let url = ['master/cari/keahlian', { nama_keahlian: this.search }, {}]

      this.$store
        .dispatch(type, url)
        .then((result) => {
          this.isLoading = false
          this.valueSearch = result.data
        })
        .catch((err) => {
          console.log(err)
          this.isLoading = false
        })
    }
  }
}
</script>

<style>
.flex-item-left {
  background-color: #f9fbfd;
  flex: 50%;
  height: 100%;
}
.flex-item-right {
  background-color: #dbf1ff;
  flex: 50%;
  height: 100%;
}
.section-bg {
  background-color: #f1f7fd;
}
.animated {
  animation: up-down 3s ease-in-out infinite alternate-reverse both;
}
li {
  font-size: 16px;
}
@keyframes up-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
</style>
