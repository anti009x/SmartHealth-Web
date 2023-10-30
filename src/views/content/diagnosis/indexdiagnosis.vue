<template>
  <div class="container py-5">
    <h2 class="text-center mb-4">Diagnosa Penyakit</h2>

    <div class="text-center mb-3">
      <router-link to="/hasil_diagnosis" class="btn btn-info">Lihat Hasil Diagnosa</router-link>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

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

          <div class="text-center mt-3">
            <button type="submit" class="btn btn-primary" :disabled="isLoading">Diagnosa sekarang</button>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

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
          this.$set(this.diagnosa, item.id, '');
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

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}
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
