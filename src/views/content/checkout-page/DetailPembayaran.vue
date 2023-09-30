<template>
  <div class="container">
    <button class="btn btn-sm btn-primary" id="pay-button" @click="initiatePayment">Pay!</button>
    <!-- <pre><div id="result-json">JSON result will appear here after payment:<br>{{ paymentResult }}</div></pre> -->
  </div>

  <form id="submit" method="POST" @submit.prevent="kirimPesan">
    <input type="hidden" id="cart" :value="this.$route.params.idKeranjanggg">
    <input type="hidden" name="json" id="json_callback">
  </form>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      paymentResult: '',
      snapp: []
    };
  },
  created() {
    this.getToken()
  },
  methods: {

    initiatePayment() {
      window.snap.pay(this.snapp.snapToken, {
        onSuccess: function (result) {
          let id_keranjang = document.getElementById("cart").value;
          axios.post("master/pembelian/checkout", {
            id_keranjang: id_keranjang
          }).then((response) => {
            window.location = "/"
          }).catch((error) => {
            console.log(error);
          })
        },
        onPending: function()
                {
                    alert("Good, Data Anda Sedang di Proses");

                    window.location = "/";
                },
                onError: function()
                {
                    alert("Periksa Kembali Data Anda");
                },
                onClose: function()
                {
                    alert("Yaah, Transaksi Anda Dibatalkan");
                }
      })
    },
    getToken() {
      let type = "getData"
      let url = [
        `midtrans/get_token/${this.$route.params.idKeranjanggg}`, {}
      ]
      this.$store.dispatch(type, url).then((result) => {
        this.snapp = result[0]
        console.log(result);
      })
    },
  }
};
</script>
  
<style>
/* Add any styling if needed */
</style>
  