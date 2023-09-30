<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'IndexHome' }">
        <span class="fs-4">Berobat+.</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa-solid fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <NavItem>
            <template #router>
              <router-link to="/" class="nav-link">Beranda</router-link>
            </template>
          </NavItem>
          <NavItem>
            <template #router>
              <router-link :to="{ name: 'Halaman Artikel' }" class="nav-link">Artikel</router-link>
            </template>
          </NavItem>
          <NavItem>
            <template #router>
              <router-link :to="{ name: 'Download App' }" class="nav-link">Aplikasi</router-link>
            </template>
          </NavItem>
          <li class="nav-item dropdown" v-if="isAuthenticated && user.data.getRole.idRole === 'RO-2003064'">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <b>Riwayat</b>
            </a>
            <DropdownItem>
              <template #item>
                <router-link :to="{ name: 'Riwayat Konsumen' }" class="dropdown-item">Kunjungan Medis</router-link>
                <router-link :to="{name: 'Riwayat Pembelian'}" class="dropdown-item" href="#">Pesanan Saya</router-link>
              </template>
            </DropdownItem>
          </li>
          <li v-if="!isAuthenticated" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <b>Register</b>
            </a>
            <DropdownItem>
              <template #item>
                <router-link :to="{ name: 'RegisterKonsumen' }" class="dropdown-item">Member</router-link>
                <router-link :to="{ name: 'RegisterPerawat' }" class="dropdown-item" href="#">Tenaga Medis</router-link>
              </template>
            </DropdownItem>
          </li>
          <div v-else>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <b>Profil</b>
              </a>
              <DropdownItem>
                <template #item>
                  <router-link to="/profil" class="dropdown-item">Akun</router-link>
                  <router-link to="/account" class="dropdown-item" href="#">Pengaturan</router-link>
            <li @click="logout" class="dropdown-item">Logout</li>
            </template>
            </DropdownItem>
            </li>
          </div>
          <div v-if="!isAuthenticated">
            <NavItem>
              <template #router>
                <router-link to="/login-user" class="nav-link">Login</router-link>
              </template>
            </NavItem>
          </div>
          <div v-else>
          </div>
          <div v-if="isAuthenticated && user.data.getRole.idRole === 'RO-2003064'">
            <NavItem>
              <template #router>
                <router-link :to="'/keranjang/' + keranjang.idKeranjang" class="nav-link">
                  <i class="fas fa-cart-shopping text-primary">
                    <span class="badge bg-primary">
                      {{ keranjang.total }}
                    </span>
                  </i>
                </router-link>
              </template>
            </NavItem>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import DropdownItem from '../header-components/DropdownItem.vue'
import NavItem from '../header-components/NavItem.vue'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      items: [],
      keranjang: {}
    }
  },
  computed: {
    isAuthenticated() {
      return Cookies.get('user') != null
    },
    user() {
      return JSON.parse(Cookies.get('user'));
    },
  },
  components: {
    NavItem, DropdownItem
  },
  mounted() {
    this.getTotalKeranjang()
  },
  methods: {
    logout() {
      let type = "getData"
      let url = [
        "logout", {}
      ]
      this.$store.dispatch(type, url).then((result) => {
        Cookies.remove('token')
        Cookies.remove('user')
        Cookies.remove('selectedAddress')
        window.location.replace('/')
      }).catch((err) => {
        console.log(err);
      })
    },
    getTotalKeranjang(){
      let type = "getData"
      let url = [
        "keranjang/total/by_konsumen", {}
      ]
      this.$store.dispatch(type, url).then((result)=>{
        this.keranjang = result
      }).catch((err)=>{
        console.log(err);
      })
    }
  },
}
</script>