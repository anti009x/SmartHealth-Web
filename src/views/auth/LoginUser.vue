<template>
  <div class="px-8 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-8 mb-5 mb-lg-0">
          <h1 class="my-2 display-5 fw-bold ls-tight">
            Log In to your Account <br />
            <span class="text-primary">Welcome back, you!</span>
          </h1>
          <p style="color: hsl(217, 10%, 50.8%)">
            
          </p>
        </div>
        <div class="col-lg-4 mb-5 mb-lg-0">
          <div class="card">
            <div class="card-body py-5 px-md-5">
              <Form @submit="handleSubmit">
                <div :class="['form-outline mb-2 text-start', { 'has-error': submitted && !user.nomor_hp }]">
                  <label class="form-label" for="form3Example3">Phone number</label>
                  <input type="text" name="phoneNumber" class="form-control" v-model="user.nomor_hp" />
                </div>
                <div :class="['form-outline mb-2 text-start', { 'has-error': submitted && !user.password }]">
                  <label class="form-label" for="form3Example4">Password</label>
                  <input type="password" class="form-control" v-model="user.password" />
                </div>
                <div class="d-flex justify-content-start">
                  <input type="text" class="form-control w-50 me-3" :value="captchaText" disabled>
                  <input type="text" class="form-control" placeholder="captcha" v-model="userInput" @input="checkCaptcha">
                </div>
                <div class="d-flex justify-content-start">
                  <p @click="reload" class="me-4 text-primary"><small>re-load captcha</small></p>
                  <p v-if="showMessage" :class="messageClass">
                  <small>{{ message }}</small>
                  </p>
                </div>
                <button type="submit" class="btn btn-primary btn-block w-100 mb-2">
                  Sign In
                </button>
              </Form>
              <p class="text-center">lupa password? <span class="text-primary"><router-link
                    style="text-decoration: none;" :to="{ name: 'Forgot Password' }">klik di sini</router-link></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
// import * as validate from 'yup'
import { Form } from 'vee-validate'
import InputField from '@/components/partials-component/InputField.vue';
import iziToast from "izitoast";
export default {
  data() {
    return {
      user: {
        nomor_hp: '',
        password: ''
      },
      errorMsg: '',
      errorClass: 'text-danger',
      submitted: false,
      captchaText: this.generateCaptchaText(),
      userInput: '',
      showMessage: false,
      message: '',
      messageClass: '',
      captchaValid: false,
    }
  },
  components: {
    Form, InputField
  },
  methods: {
    reload() {
      window.location = '/login-user'
    },
    generateCaptchaText() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let captcha = '';
      for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return captcha;
    },
    checkCaptcha() {
      if (this.userInput === this.captchaText) {
        this.showMessage = true;
        this.message = 'Captcha benar!';
        this.messageClass = 'success';
        this.captchaValid = true;
      } else {
        this.showMessage = true;
        this.message = 'Captcha salah';
        this.messageClass = 'error';
        this.captchaValid = false;
      }
    },
    async handleSubmit() {
      this.submitted = true;

      this.checkCaptcha();

      if (!this.captchaValid) {
        this.$swal({
          icon: 'error',
          title: 'Invalid CAPTCHA',
          text: 'Please enter the correct CAPTCHA value.',
        });
        return;
      }

      let type = "postData";
      let url = ["autentikasi/login", this.user, {}];

      try {
        const response = await this.$store.dispatch(type, url);
        const cekRole = response.data.getRole.idRole;

        if (cekRole == "RO-2003064") {
          Cookies.set("token", response.data.token);
          Cookies.set("user", JSON.stringify(response));
          iziToast.success({
            transitionIn: 'fadeInUp',
            timeout: 2000,
            title: "Berhasil",
            message: "Berhasil Login",
            position: "bottomCenter",
          });
          window.location = '/';
        } else {
          iziToast.error({
            transitionIn: 'fadeInUp',
            timeout: 2000,
            title: "Gagal",
            message: "maaf, hanya konsumen yang dapat login",
            position: "topCenter",
          });
        }
      } catch (err) {
        this.$swal({
          icon: 'error',
          title: "Maaf Error",
          text: 'Periksa Kembali Nomor Hp dan Password',
        });
      }
    },
  },
}
</script>
<style>
.has-error input {
  border-color: red;
}
</style>