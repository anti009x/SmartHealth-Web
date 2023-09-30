export default [
    {
        path: '/pelayanan_klinis',
        name: "Rumah Sakit Terdekat",
        component: () => import('@/views/content/rumah-sakit/index-rumah-sakit/IndexHospital.vue')
    },
    {
        path: '/detail_rumah_sakit/:id',
        name: 'Detail Hospital',
        component: () => import('@/views/content/rumah-sakit/index-rumah-sakit/DetailHospital.vue'),
    },
    {
        path: '/detail_rumah_sakit/:idPenyakit/:id/:namaSpesialis',
        name: 'Detail Spesialis Rs',
        component: () => import('@/views/content/rumah-sakit/index-rumah-sakit/DetailSpesialisRs.vue'),
    },
    {
        path: '/detail_apotek/:namaApotek/:idApotek',
        name: 'Detail Apotek',
        component: () =>import('@/views/content/apotek/ProdukByApotek.vue')
    },
    {
        path: '/detail_rumah_sakit/buat_janji/:idAhli/:idRumahSakit/:namaSpesialis',
        name: 'Detail Janji Rs',
        component: () => import('@/views/content/rumah-sakit/janji-rs/IndexJanjiRs.vue'),
    },
    {
        path: '/buat_janji/:idAhli/:idJadwalPraktek',
        name: 'Detail Janji',
        component: () => import('@/views/content/rumah-sakit/janji-rs/DetailJanjiRs.vue'),
        meta: {
            requiresAuth: true
        }
    },
]