<template>
<div class="container py-5">

    <h2 class="text-center mb-4 fw-semibold ">HASIL DIAGNOSA</h2>
    <div class="table-responsive shadow-lg p-3 mb-5  rounded ">
      <table class="table table-hover border">
        <thead >
          <tr>
            <th>ID</th>
            <th>Penyakit Terdiagnosa</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="data in sortedResults" :key="data.id">
            <td>{{ data.id }}</td>
            <td><span v-html="getDiagnosedDisease(data)"></span></td>
            <td>{{ formatTanggal(data.created_at) }}</td>
            <td ><button class="btn btn-primary" @click="viewDetails(data.id)">Lihat Detail</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

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
      return [parsedArray[1], parsedArray[0]];
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
    ...mapActions('diagnosis', ['detail_diagnosis']),
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
      this.detail_diagnosis(id);
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

<style scoped>

h2{
  text-shadow: 1px 1px #0099ff;
  color: rgb(0, 0, 0);
  font-family: cursive;
}
.container {
  max-width: 800px;
  margin: auto;
}

h2{
    text-shadow: 1px 1px #0099ff;
  color: rgb(0, 0, 0);
  font-family: cursive;
  }



</style>
