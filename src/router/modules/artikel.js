export default [
    {
        path: '/artikel',
        name: 'Halaman Artikel',
        component: ()=>import('@/views/content/artikel/IndexArtikel.vue'),
    },
    {
        path: '/artikel/:slug',
        name: 'Isi Artikel',
        component: ()=>import('@/views/content/artikel/ArtikelBySlug.vue')
    },
    {
        path: '/artikel/:idKategori/:idGroupingArtikel',
        name: 'Isi Kategori Artikel',
        component: ()=>import('@/views/content/artikel/ArtikelByKategori.vue')
    },
]