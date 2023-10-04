<template>
  <div class="text-center">
    <h2>Diagnosa Penyakit</h2>

    <a href="/hasil_diagnosis">Check Hasil Diagnosa</a>
    
    <!-- Error Alert -->
    <div v-if="error" class="alert alert-danger mx-auto" style="max-width: 600px;">{{ error }}</div>
    
    <section class="row">
      <!-- chart section -->
      <div class="col-md-12">
        <div class="card mx-auto" style="max-width: 800px;">
          <div class="card-body">
            <form @submit.prevent="submitForm">

              <!-- <label for="nama"><b><i class="fas fa-user mr-1"></i> Nama</b></label>
              <input type="text" class="form-control mb-3 mx-auto" style="max-width: 300px;" v-model="nama"> -->

              <p>Pilih gejala yang sedang dirasakan.</p>
              <label for=""><b><i class="fas fa-th mr-1"></i> Gejala-gejala</b></label>

          
              <div class="row">
                
                <div class="col-md-4 mx-auto border-data border-container" v-for="(item, index) in gejala" :key="index">
    <div class=" border-container">
        <span class="ml-2">{{ item.nama }}</span>
        <select v-model="diagnosa[item.id]" 
                class="form-control form-control-sm select-control" 
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

              <div class="mt-3">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">Diagnosa sekarang</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      // nama: '',
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
      nama: '',
        diagnosa: Object.values(this.diagnosa)
      }).then(response => {
        this.isLoading = false;
        this.response = response('Succes');
        // this.$router.push({ name: 'hasil_riwayat' });
      }).catch(error => {
        this.isLoading = false;
        this.error = "Data Terkirim , Bisa Langsung Check Hasil Diagnosa.Jika Datanya Belum Terkirim Harap Kirim Ulang";
        // this.$router.push({ name: 'hasil_riwayat' });
      });
    },
    getBorderColor(value) {
      return value === "" ? 'red-border' : 'green-border';
    }
  },
  mounted() {
    this.loadGejala();
  }
}
</script>

<style scoped>
.red-border {
  border: 1px solid rgba(227, 39, 79, .8);
}
.green-border {
  border: 1px solid rgba(50, 179, 104, .8);
}

.select-control {
    margin-right: 4rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid #d1d5db;
    align-items: center;

}


.select-control:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.select-control:focus {
    outline: none;
    border-color: #007BFF;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.border-container {
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.border-container:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

</style>
