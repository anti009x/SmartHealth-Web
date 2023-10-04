<template>
    <div>
      <h1>Detail Hasil Diagnosa</h1>
      <table class="table table-hover border">
        <thead class="thead-light">
          <tr>
            <th>Gejala yang kamu alami saat ini</th>
            <th>Tingkat keyakinan</th>
            <th>CF User</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gejala in gejalaTerpilih" :key="gejala.kode">
            <td>{{ gejala.kode }} - {{ gejala.nama }}</td>
            <td>{{ gejala.keyakinan }}</td>
            <td>{{ gejala.cf_user }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="mt-4">
        <h6 class="font-weight-bold">
          Tabel perhitungan penyakit: <!---{{ $diagnosa['nama_penyakit'] }} ({{ $diagnosa['kode_penyakit'] }}) -->
        </h6>
      </div>
  
      <div class="mt-4" v-for="diagnosa in hasilDiagnosa" :key="diagnosa.kode_penyakit">
        <div class="card card-body p-0 mt-5 border" style="box-shadow: none !important;">
          <div class="card-header bg-primary text-white p-2">
            <h6 class="font-weight-bold">Tabel perhitungan penyakit: {{ diagnosa.nama_penyakit }} ({{ diagnosa.kode_penyakit }})</h6>
          </div>
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th>Gejala</th>
                <th>CF User</th>
                <th>CF Expert</th>
                <th>CF (H, E)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="gejala in diagnosa.gejala" :key="gejala.kode">
                <td>{{ gejala.kode }} - {{ gejala.nama }}</td>
                <td>{{ gejala.cf_user }}</td>
                <td>{{ gejala.cf_role }}</td>
                <td>{{ gejala.hasil_perkalian }}</td>
              </tr>
            </tbody>
            <tfoot class="font-weight-bold">
              <tr>
                <td scope="row">Nilai CF</td>
                <td><span class="text-danger">{{ parseFloat(diagnosa.hasil_cf).toFixed(3) }}</span></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
  
      <div class="mt-5">
        <div class="alert alert-success">
          <h5 class="font-weight-bold">Kesimpulan</h5>
          <p>
            Berdasarkan dari gejala yang kamu pilih atau alami juga berdasarkan
            Role/Basis aturan yang sudah ditentukan oleh seorang pakar penyakit maka
            perhitungan Algoritma Certainty Factor mengambil nilai CF yang paling
            tinggi yakni
            <span v-if="cfMax">
    <b>{{ cfMax[1] }} dengan nilai CF {{ cfMax[0] }}</b>
  </span>
  <span v-else>
    Tidak ada hasil diagnosa.
  </span>
            
          </p>
        </div>
        <div class="mt-3 text-center">
          <!-- {{-- <a href="{{ asset("storage/downloads/$riwayat->file_pdf") }}" target="_blank" class="btn btn-primary mr-1"><i class="fas fa-print mr-1"></i> Print</a>
          <a href="{{ route('admin.diagnosa') }}" class="btn btn-warning mr-1"><i class="fas fa-redo mr-1"></i> Diagnosa ulang</a> --}} -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        gejalaTerpilih: [],
        hasilDiagnosa: [],  
        cfMax: null, // Tambahkan ini
      };
    },
    
    props: {
      id: {
        type: String,
        required: true
      }
    },
    mounted() {
      this.fetchDetails();
    },
    methods: {
      async fetchDetails() {
        try {
          const response = await axios.get(`riwayat/${this.id}`);
          this.gejalaTerpilih = response.data.gejala_terpilih;
          this.hasilDiagnosa = response.data.hasil_diagnosa;
          this.cfMax = response.data.cf_max; // Tambahkan ini
        } catch (error) {
          console.error('Error fetching detail: ', error);
          alert('Terjadi kesalahan saat mengambil detail diagnosa. Silakan coba lagi nanti.');
        }
      }
    }
  };
  </script>