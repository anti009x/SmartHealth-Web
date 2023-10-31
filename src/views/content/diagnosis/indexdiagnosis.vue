<template>
<<<<<<< HEAD


<body>
  <div class="stars">
  <div class="star"></div>
  <div class="star"></div>
  <div class="star"></div>
  <div class="star"></div>
  <div class="star"></div>
  <div class="star"></div>
  <div class="star"></div>
  <div class="star"></div>
  <div class="star"></div>
  <div class="star"></div>
  <div class="star"></div>
</div>
  <div class="container py-5 ">

    <h2 class="text-center mb-4 fw-semibold">DIAGNOSA PENYAKIT</h2>

    <div class="text-center mb-3 ">
      <router-link to="/hasil_diagnosis" class="btn btn-primary btn-sm btn-outline-dark  " style="color:white;box-shadow: 2px 2px black; ">Lihat Hasil Diagnosa</router-link>
=======
  <div class="container py-5">
    <h2 class="text-center mb-4">Diagnosa Penyakit</h2>

    <div class="text-center mb-3">
      <router-link to="/hasil_diagnosis" class="btn btn-info">Lihat Hasil Diagnosa</router-link>
>>>>>>> 7c237a928acae26b27f1756e3bc76a0341151cb6
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

<<<<<<< HEAD
    <div class="card ">
      <div class="card-body" >
        <form @submit.prevent="submitForm">
          <p > Pilih gejala yang sedang dirasakan.</p>
          <div class="row">
            <div class="col-md-6 " style="font-family: cursive;" v-for="(item, index) in gejala" :key="index">
              <div class="form-group ">
                <label><b>{{ item.nama }}</b>
                </label>
                <select v-model="diagnosa[item.id]" class="form-control select-control" 
                        :class="getBorderColor(diagnosa[item.id])">
                  <option :value="null" disabled :selected="!diagnosa[item.id]">Pilihlah Opsi Gejala</option>
                  <option :value="`${item.id}+-1`" >Pasti tidak</option>
=======
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <p>Pilih gejala yang sedang dirasakan.</p>

          <div class="row">
            <div class="col-md-6" v-for="(item, index) in gejala" :key="index">
              <div class="form-group">
                <label><b>{{ item.nama }}</b></label>
                <select v-model="diagnosa[item.id]" 
                        class="form-control select-control" 
                        :class="getBorderColor(diagnosa[item.id])">
                  <option :value="`${item.id}+-1`">Pasti tidak</option>
>>>>>>> 7c237a928acae26b27f1756e3bc76a0341151cb6
                  <option :value="`${item.id}+-0.8`">Hampir pasti tidak</option>
                  <option :value="`${item.id}+-0.6`">Kemungkinan besar tidak</option>
                  <option :value="`${item.id}+-0.4`">Mungkin tidak</option>
                  <option value="" selected>Tidak tahu</option>
                  <option :value="`${item.id}+0.4`">Mungkin</option>
                  <option :value="`${item.id}+0.6`">Sangat mungkin</option>
                  <option :value="`${item.id}+0.8`">Hampir pasti</option>
                  <option :value="`${item.id}+1`">Pasti</option>
                </select>
              </div>
            </div>
          </div>
<<<<<<< HEAD

          <div class="text-center mt-3">
            <button type="submit" class="btn btn-primary  btn-outline-dark  " style="color:white;box-shadow: 2px 2px black; " :disabled="isLoading">Diagnosa sekarang</button>
          </div>

        </form>
      </div>
    </div>

  </div>
</body>    
</template>

=======

          <div class="text-center mt-3">
            <button type="submit" class="btn btn-primary" :disabled="isLoading">Diagnosa sekarang</button>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

>>>>>>> 7c237a928acae26b27f1756e3bc76a0341151cb6
<script>
import axios from 'axios';

export default {
  data() {
    return {
      gejala: [],
      diagnosa: {},
      error: null,
      isLoading: false
    };
  },
  methods: {
    loadGejala() {
      axios.get('/diagnosa').then(response => {
        this.gejala = response.data;
        this.gejala.forEach(item => {
          this.$set(this.diagnosa, item.id, null);
        });
      }).catch(error => {
        console.log(error);
      });
    },
    submitForm() {
      this.isLoading = true;
      axios.post('diagnosa', {
        diagnosa: Object.values(this.diagnosa)
      }).then(response => {
        this.isLoading = false;
        this.$router.push({ name: 'hasil_riwayat' });
      }).catch(error => {
        this.isLoading = false;
        this.error = "Data Terkirim , Bisa Langsung Check Hasil Diagnosa.Jika Datanya Belum Terkirim Harap Kirim Ulang";
      });
    },
    getBorderColor(value) {
      return value === "" ? 'border-danger' : 'border-success';
    }
  },
  mounted() {
    this.loadGejala();
  }
}

</script>

<<<<<<< HEAD
<style  scoped>

  
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%);
  overflow: hidden;
}

.stars {


  transform: rotate(-45deg);
}

.star {
  --star-color: #02b7ff;
  --star-tail-length: 6em;
  --star-tail-height: 2px;
  --star-width: calc(var(--star-tail-length) / 6);
  --fall-duration: 9s;
  --tail-fade-duration: var(--fall-duration);
  position: absolute;
  top: var(--top-offset);
  left: 0;
  width: var(--star-tail-length);
  height: var(--star-tail-height);
  color: var(--star-color);
  background: linear-gradient(45deg, currentColor, transparent);
  border-radius: 50%;
  filter: drop-shadow(0 0 6px currentColor);
  transform: translate3d(104em, 0, 0);
  animation: fall var(--fall-duration) var(--fall-delay) linear infinite, tail-fade var(--tail-fade-duration) var(--fall-delay) ease-out infinite;
}
@media screen and (max-width: 750px) {
  .star {
    animation: fall var(--fall-duration) var(--fall-delay) linear infinite;
  }
}
.star:nth-child(1) {
  --star-tail-length: 5.03em;
  --top-offset: 59.93vh;
  --fall-duration: 9.626s;
  --fall-delay: 8.996s;
}
.star:nth-child(2) {
  --star-tail-length: 7.2em;
  --top-offset: 71.04vh;
  --fall-duration: 11.112s;
  --fall-delay: 3.405s;
}
.star:nth-child(3) {
  --star-tail-length: 7.18em;
  --top-offset: 76.01vh;
  --fall-duration: 11.91s;
  --fall-delay: 0.859s;
}
.star:nth-child(4) {
  --star-tail-length: 5.14em;
  --top-offset: 52.36vh;
  --fall-duration: 6.971s;
  --fall-delay: 8.571s;
}
.star:nth-child(5) {
  --star-tail-length: 6.69em;
  --top-offset: 14.99vh;
  --fall-duration: 7.856s;
  --fall-delay: 9.288s;
}
.star:nth-child(6) {
  --star-tail-length: 5.98em;
  --top-offset: 22vh;
  --fall-duration: 8.507s;
  --fall-delay: 7.882s;
}
.star:nth-child(7) {
  --star-tail-length: 5.37em;
  --top-offset: 26.56vh;
  --fall-duration: 8.907s;
  --fall-delay: 1.577s;
}
.star:nth-child(8) {
  --star-tail-length: 7.5em;
  --top-offset: 56.58vh;
  --fall-duration: 7.118s;
  --fall-delay: 2.689s;
}
.star:nth-child(9) {
  --star-tail-length: 5.35em;
  --top-offset: 67.4vh;
  --fall-duration: 7.911s;
  --fall-delay: 5.894s;
}
.star:nth-child(10) {
  --star-tail-length: 7.45em;
  --top-offset: 95.77vh;
  --fall-duration: 11.931s;
  --fall-delay: 1.085s;
}
.star:nth-child(11) {
  --star-tail-length: 7.48em;
  --top-offset: 21.96vh;
  --fall-duration: 9.074s;
  --fall-delay: 7.508s;
}
.star:nth-child(12) {
  --star-tail-length: 6.93em;
  --top-offset: 94.48vh;
  --fall-duration: 8.435s;
  --fall-delay: 9.398s;
}
.star:nth-child(13) {
  --star-tail-length: 6em;
  --top-offset: 49.1vh;
  --fall-duration: 8.1s;
  --fall-delay: 9.61s;
}
.star:nth-child(14) {
  --star-tail-length: 7.37em;
  --top-offset: 11.43vh;
  --fall-duration: 8.823s;
  --fall-delay: 6.682s;
}
.star::before, .star::after {
  position: absolute;
  content: "";
  top: 0;
  left: calc(var(--star-width) / -2);
  width: var(--star-width);
  height: 100%;
  background: linear-gradient(45deg, transparent, currentColor, transparent);
  border-radius: inherit;
  animation: blink 2s linear infinite;
}
.star::before {
  transform: rotate(45deg);
}
.star::after {
  transform: rotate(-45deg);
}

@keyframes fall {
  to {
    transform: translate3d(-30em, 0, 0);
  }
}
@keyframes tail-fade {
  0%, 50% {
    width: var(--star-tail-length);
    opacity: 1;
  }
  70%, 80% {
    width: 0;
    opacity: 0.4;
  }
  100% {
    width: 0;
    opacity: 0;
  }
}
@keyframes blink {
  50% {
    opacity: 0.6;
  }
}



.form-group option {
  font-family: cursive;

}

  h2{
    text-shadow: 1px 1px #0026ff;
  color: rgb(255, 255, 255);
  font-family: cursive;
  }

=======
<style scoped>
>>>>>>> 7c237a928acae26b27f1756e3bc76a0341151cb6
.container {
  max-width: 800px;
  margin: auto;
}
<<<<<<< HEAD

p{
  font-weight: bold;
  font-family:cursive;
}
=======
>>>>>>> 7c237a928acae26b27f1756e3bc76a0341151cb6
.select-control:focus {
  outline: none;
  box-shadow: none !important;
}
.border-danger {
  border-color: #dc3545 !important;
}
.border-success {
  border-color: #28a745 !important;
}
</style>
