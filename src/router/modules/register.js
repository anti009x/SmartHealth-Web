export default [
  {
    path: '/register-member/',
    name: 'RegisterKonsumen',
    meta: {
      title: 'Registrasi Member'
    },
    component: () => import('@/views/auth/IndexRegister.vue')
  },
  {
    path: '/register-tenaga-medis/',
    name: 'RegisterPerawat',
    meta: {
      title: 'Registrasi Tenaga Medis'
    },
    component: () => import('@/views/auth/Index.vue')
  }
]
