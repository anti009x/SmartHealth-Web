export default [
    {
        path: '/chat/',
        component: () => import('@/views/content/dokter/IndexDokter.vue'),
        children: [
            {
                path: '',
                redirect: '/',
            },
            {
                path: 'dokter-perawat',
                name: 'Page Dokter',
                component: () => import('@/views/content/dokter/SpesialisDokter.vue'),
            },
            {
                path: 'perawat/:idPerawat/:idAhli',
                name: 'Detail Perawat',
                component: () => import('@/views/content/perawat/DetailPerawat.vue'),
            },
            {
                path: 'cari',
                name: 'Cari Keahlian',
                component: ()=>import('@/views/content/dokter/SearchByKeahlian.vue'),
                params: true
            },
            {
                path: 'spesialis/:idSpesialis/dokter',
                name: 'Dokter Spesialis',
                component: ()=>import('@/views/content/dokter/spesialis/IndexDokterBySpesialis.vue')
            },
            {
                path: 'dokter/:idDokter/:idAhli',
                name: 'Detail Dokter',
                component: () => import('@/views/content/dokter/detail-dokter/DetailDokter.vue'),
            },
            {
                path: 'all-dokter',
                name: 'Semua Dokter',
                component: () => import('@/views/content/dokter/index-dokter/IndexAllDokter.vue'),
            },
            {
                path: 'all-perawat',
                name: 'Semua Perawat',
                component: () => import('@/views/content/perawat/IndexPerawat.vue')
            }
        ],
    },
]