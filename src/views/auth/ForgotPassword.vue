<template>
  <div class="container py-5">
    <div class="col-12 col-md-6 mx-auto">
      <div class="card shadow">
        <div class="card-body">
          <h5 class="mb-3">Forgot Password</h5>
          <InputField v-model="form.email" placeholder="masukkan email anda yang terdaftar" />
          <div class="d-flex justify-content-start">
            <div class="me-3 border rounded ps-3 pe-3">
              <p>{{ captchaText }}
              </p>
            </div>
            <div>
              <input type="text" class="form-control" placeholder="captcha" v-model="userInput" @input="checkCaptcha">
            </div>
          </div>
          <div class="d-flex justify-content-start">
            <p @click="reload" class="me-4 text-primary"><small>re-load captcha</small></p>
            <p v-if="showMessage" :class="messageClass">{{ message }}</p>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-sm btn-primary" type="submit" @click="postEmail">
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue';
import iziToast from 'izitoast';

export default {
  data() {
    return {
      form: {
        email: '',
      },
      captchaText: this.generateCaptchaText(),
      userInput: '',
      showMessage: false,
      message: '',
      messageClass: '',
      captchaValid: false,
    };
  },
  components: {
    InputField,
  },
  methods: {
    reload() {
      window.location = '/forgot_password'
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
        this.message = 'Captcha salah. Silahkan coba lagi';
        this.messageClass = 'error';
        this.captchaValid = false;
      }
    },
    postEmail() {
      let type = 'postData';
      let url = ['autentikasi/confirm_email', this.form, {}];

      this.checkCaptcha();

      if (!this.captchaValid) {
        this.$swal({
          icon: 'error',
          title: 'Invalid CAPTCHA',
          text: 'Please enter the correct CAPTCHA value.',
        });
        return;
      }

      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (result.status == false) {
            this.$swal({
              icon: 'error',
              title: 'Check Your Email',
              text: result.pesan,
            });
          } else if(result.pesan === 'Berhasil') {
            this.$swal({
              icon: 'success',
              title: 'cek email anda yaaa',
              text: result.pesan
            }).then(()=>{
              this.$router.push({name: 'LoginUser'})
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.captcha {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 5px;
  display: inline-block;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>