<template>
  <HeaderComponent />
  <main id="main">
    <router-view>
    </router-view>
  </main>
  <!-- <FooterComponent /> -->
</template>
<script>
import Cookies from 'js-cookie'
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      isLoading: false,
      users: null
    }
  },
  created() {
    this.getUsers()
  },
  watch: {
    users: {
      immediate: true,
      handler(newUsers) {
        if (newUsers && !Cookies.get("token")) {
          // Token is available and not set, trigger content refresh
          this.refreshContent();
        }
      }
    }
  },
  methods: {
    getUsers() {
      let type = "getData"
      let url = ["create-api", {}]
      this.isLoading = true
      this.$store.dispatch(type, url)
        .then((result) => {
          if (Cookies.get("user") != undefined) {
            Cookies.set("user", Cookies.get("user"))
          } else {
            if (Cookies.get("token") == undefined) {
              Cookies.set("token", result.token);
              window.location.reload()
            }
          }
          this.users = Cookies.get("token");
          setTimeout(() => {
            this.isLoading = false
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    refreshContent() {
      window.location.reload();
    }
  },
}
</script>
