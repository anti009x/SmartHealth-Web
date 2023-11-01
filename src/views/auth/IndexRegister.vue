<template>
  <div class="container py-3 mb-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 mt-3">
        <h4>Halo!</h4>
        <p class="text-secondary">
          <small> Silakan registrasi terlebih dulu </small>
        </p>
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Register</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row mb-3">
                <div :class="['col-md-6', { 'has-error': submitted && !form.nama }]">
                  <label for="name" class="form-label">Nama</label>
                  <input type="text" id="name" class="form-control" v-model="form.nama" />
                </div>
                <div :class="['col-md-6', { 'has-error': submitted && !form.email }]">
                  <label for="email" class="form-label">Email</label>
                  <input type="text" class="form-control" v-model="form.email" />
                </div>
              </div>
              <div class="row mb-3">
                <div :class="['col-md-6', { 'has-error': submitted && !form.password }]">
                  <label for="name" class="form-label">Password</label>
                  <input type="password" class="form-control" v-model="form.password" />
                </div>
                <div :class="['col-md-6', { 'has-error': submitted && !nik }]">
                  <label for="nik" class="form-label">NIK</label>
                  <input type="text" class="form-control" v-model="nik" />
                </div>
              </div>
              <div class="row mb-3">
                <div :class="['col-md-6', { 'has-error': submitted && !form.nomor_hp }]">
                  <label for="name" class="form-label">Nomor Hp</label>
                  <input type="text" class="form-control" v-model="form.nomor_hp" />
                </div>
                <div :class="['col-md-6', { 'has-error': submitted && !form.alamat }]">
                  <label for="alamat" class="form-label">Alamat</label>
                  <input type="text" class="form-control" v-model="form.alamat" />
                </div>
              </div>
              <div class="text-center">
                <button class="btn w-100 btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-6 d-none d-sm-block mt-5">
        <img src="../../assets/images/register.png" class="img-fluid" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
import SelectOption from '@/components/partials-component/SelectOption.vue'
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
  data() {
    return {
      nik: '',
      form: {
        nama: '',
        email: '',
        nomor_hp: '',
        password: '',
        alamat: '',
        status: ''
      },
      submitted: false
    }
  },
  components: {
    InputField,
    SelectOption,
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  },
  methods: {
    handleSubmit() {
      this.submitted = true
      let type = 'postData'
      const data = {
        nik: this.nik,
        nama: this.form.nama,
        email: this.form.email,
        alamat: this.form.alamat,
        nomor_hp: this.form.nomor_hp,
        password: this.form.password,
        status: 1
      }
      let url = ['akun/konsumen', data]
      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (result.success === false) {
            this.$swal({
              icon: 'error',
              title: 'gagal',
              text: 'Semua kolom wajib diisi'
            })
          } else {
            this.$swal({
              icon: 'success',
              title: 'berhasil register'
            }).then(() => {
              this.$router.push({ name: 'LoginUser' })
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.has-error input {
  border-color: red;
}
</style>
