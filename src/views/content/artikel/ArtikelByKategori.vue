<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-8">
                <SkeletonLoading v-if="isLoading" />
                <div class="blog-detail p-5" v-if="!isLoading">
                    <h1 class="blog-title">{{ detailArtikel.judulArtikel }}</h1>
                    <p class="blog-meta">dipublikasikan pada {{ detailArtikel.tanggal }} oleh dr. {{ detailArtikel.getUser.nama }}</p>
                    <img :src="detailArtikel.foto" alt="Blog Image" class="blog-image img-fluid">
                    <div class="blog-content">
                        {{ detailArtikel.deskripsi }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            detailArtikel: {}
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.idGroupingArtikel
        },
        idArtikel(){
            return this.detailArtikel.idArtikel
        }
    },
    created() {
        this.getDetailArtikel()
    },
    methods: {
        getDetailArtikel() {
            let type = "getData"
            let url = [
                "master/artikel/" + this.idFromParams + "/edit", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.detailArtikel = result.data
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>