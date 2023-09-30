export default [
    {
        path: '/download-app',
        name: 'Download App',
        component: ()=>import('@/views/content/download-page/IndexDownload.vue')
    },
    {
        path: '/riwayat-medis',
        name: 'Riwayat Konsumen',
        component: ()=>import('@/views/content/riwayat/IndexRiwayat.vue')
    },
    {
        path: '/riwayat-pembelian',
        name: 'Riwayat Pembelian',
        component: ()=>import('@/views/content/riwayat/IndexRiwayatPembelian.vue')
    },
    {
    path: '/produk',
        name: 'Data Produk',
        component: () => import('@/views/content/obat-produk/IndexProduk.vue')
    },
    {
        path: '/produk/:id',
        name: 'Detail Produk',
        component: () => import('@/views/content/obat-produk/DetailProduk.vue')
    },
    {
        path: '/produk/kategori/:idKategori/:namaKategori',
        name: 'Produk Kategori',
        component: () => import('@/views/content/apotek/IndexObatApotek.vue')
    },
    {
        path: '/produk/kategori',
        name: 'Semua Kategori',
        component: () => import('@/views/content/obat-produk/IndexKategoriProduk.vue')
    },
    {
        path: '/test_ongkir',
        component: () => import('@/views/content/test-ongkir/IndexOngkir.vue')
    },
    {
        path: '/keranjang/:idKeranjang',
        name: 'Keranjang',
        component: () => import('@/views/content/checkout-page/IndexKeranjang.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/keranjang/shipment/:idKeranjang',
        name: 'Checkout',
        component: () => import('@/views/content/checkout-page/IndexCheckout.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/detail/:idJadwalDokter',
        name: 'Detail Janji Jadwal Dokter',
        component: ()=>import('@/views/content/riwayat/IndexQrCode.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/detail-pembayaran/:idKeranjanggg',
        name: 'Detail Pembayaran',
        component: ()=>import('@/views/content/checkout-page/DetailPembayaran.vue'),
        meta: {
            requiresAuth: true
        }
    }
]