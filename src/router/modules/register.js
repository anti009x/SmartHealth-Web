    export default [
    {
        path: '/register-konsumen/',
        name: "RegisterKonsumen",
        component: () => import('@/views/auth/IndexRegister.vue')
    },
    {
        path: '/page-register/',
        name: "RegisterPerawat",
        component: () => import('@/views/auth/Index.vue')
    }
    ]