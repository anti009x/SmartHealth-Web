<template>
  <SectionHeaderBody>
    <div class="container-fluid p-lg-4 bg-primary">
      <div class="container">
        <router-link style="text-decoration: none" to="/">
          <p class="text-light">
            Home /
            <router-link to="/produk-obat" class="text-light" style="text-decoration: none">
              {{ $route.name }}
            </router-link>
          </p>
        </router-link>
        <div class="d-flex justify-content-between">
          <div class="text-light mb-3 d-none d-sm-block">
            <h3>Diagnosa Gejala Stroke Berdasarkan Wajah</h3>
            <h5 style="display: flex; justify-content: start">Kenali gejala stroke lebih awal.</h5>
          </div>
        </div>
        <div class="d-flex justify-content-start pb-2"></div>
      </div>
    </div>
  </SectionHeaderBody>
  <div class="container pt-3">
    <div class="row">
      <Camera icon="fas fa-solid fa-camera" style="border-radius: 0.2em"></Camera>
    </div>
  </div>
</template>
<script>
import Camera from '@/components/partials-component/Camera.vue'

export default {
  components: {
    Camera
  }
}
</script>
<style>
.fa-solid,
.fa-brands {
  border-radius: 0.2em;
  padding: 0.3em;
}
</style>
