<template>
    <!-- Tampilan tabel data riwayat -->
    <H1>Hasil Diagnosa</H1>
    <div class="table-responsive">
      <table class="table table-hover border">
        <!-- Header tabel -->
        
        <thead>
          <th>ID</th>
          <th>Penyakit terdiagnosa</th>
          <th>Tanggal</th>
          <th></th>
        </thead>
        <!-- Data tabel -->
        <tbody>
          <tr v-for="data in sortedResults" :key="data.id">
            <td>{{ data.id }}</td>
            <td>
              <span v-html="getDiagnosedDisease(data)"></span>
            </td>
            <td>{{ formatTanggal(data.created_at) }}</td>
            <td><button @click="viewDetails(data.id)">View Details</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapActions } from 'vuex';
  
  // Gantilah URL API Anda dengan variabel lingkungan jika memungkinkan
  const apiUrl = 'riwayat';
  
  function konversiArrayPHPkeJS(arrayPHP) {
    try {
      if (typeof arrayPHP === 'string') {
        const diseaseMatches = arrayPHP.match(/"(.*?)"/g);
        if (diseaseMatches) {
          const diseases = diseaseMatches.map(match => match.replace(/"/g, ''));
          return diseases;
        }
      }
  
      const parsedArray = JSON.parse(arrayPHP);
      if (Array.isArray(parsedArray) && parsedArray.length > 1) {
        return [parsedArray[1], parsedArray[0]]; // Hapus perkalian dengan 100 di sini
      }
    } catch (error) {
      console.error('Error parsing cf_max data:', error);
    }
    return ['Tidak ada penyakit yang didiagnosis', 0];
  }
  
  export default {
    data() {
      return {
        results: []
      };
    },
    computed: {
    sortedResults() {
      return this.results.slice().sort((a, b) => a.id - b.id);
    }
  },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get(apiUrl);
          this.results = response.data.data;
        } catch (error) {
          console.error('Error fetching data: ', error);
          alert('Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.');
        }
      },
     
      viewDetails(id) {
        mapActions('diagnosis', ['detail_diagnosis']),
        this.$router.push({ name: 'detail_diagnosis', params: { id } });
      },
      getDiagnosedDisease(data) {
        if (data.cf_max) {
          const [disease, percentage] = konversiArrayPHPkeJS(data.cf_max);
  
          if (percentage !== undefined) {
            const formattedPercentage = (percentage * 100).toFixed(2);
            return `${disease} (${formattedPercentage}%)`;
          }
  
          return `${disease}`;
        }
  
        return 'Tidak ada penyakit yang didiagnosis';
      },
      formatTanggal(tanggal) {
        return new Date(tanggal).toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      }
    }
  };
  </script>
  