<template>
  <div class="container-fluid col-xxl-12 body px-4 my-5 py-2" id="heri">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-2">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="../../../assets/images/foto.png" data-aos="fade-left" data-aos-duration="1000"
          class="mx-auto d-block img-fluid animated" width="300" height="100" alt="Bootstrap Themes" loading="lazy">
      </div>
      <div class="col-lg-5" data-aos="fade-right" data-aos-duration="1000">
        <h1 class="display-5 fw-bold lh-1 mb-3">Berobat<span class="text-primary">Plus</span>.</h1>
        <p class="lead">
          Berobatplus merupakan layanan kesehatan yang dapat diakses kapanpun dan di manapun.
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" class="btn btn-primary btn-sm">Download Apps</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">Baca Lebih Lanjut</button>
        </div>
      </div>
    </div>
    <div class="row flex-lg-row-reverse align-items-center g-5">
      <div class="col-lg-6">
        <h2 class="text-primary"><b>Fitur Unggulan</b></h2>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Informasi Klinis Rumah Sakit dan Apotek
          Terdekat</p>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Konsultasi Chat sama Dokter dan Perawat</p>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Buat Janji Ketemu Dokter di Rumah Sakit</p>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Informasi Klinis Rumah Sakit dan Apotek
          Terdekat</p>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Rawat Jalan oleh Perawat Terdekat</p>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Beli obat dan vitamin di apotek terdekat</p>
      </div>
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="../../../assets/images/foto.png" class="mx-auto d-block img-fluid animated" width="300" height="100"
          alt="Bootstrap Themes" loading="lazy">
      </div>
    </div>
  </div>
</template>
<style>
#heri .animated {
  animation: up-down 1s ease-in-out infinite alternate-reverse both;
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