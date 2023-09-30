<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-8">
                <SkeletonLoading v-if="isLoading" />
                <div class="blog-detail p-5" v-if="!isLoading">
                    <h1 class="blog-title">{{ artikel.judulArtikel }}</h1>
                    <p class="blog-meta">dipublikasikan pada {{ artikel.tanggal }} oleh dr. {{ artikel.getUser.nama }}</p>
                    <img :src="artikel.foto" alt="Blog Image" class="blog-image img-fluid">
                    <div class="blog-content">
                        {{ artikel.deskripsi }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
export default {
    data() {
        return {
            artikel: [],
            isLoading: false
        }
    },
    components: {
        SkeletonLoading
    },
    computed: {
        slugFromParams() {
            return this.$route.params.slug
        }
    },
    created() {
        this.getDetailArtikel()
    },
    methods: {
        getDetailArtikel() {
            let type = "getData"
            let url = [
                "master/artikel/" + this.slugFromParams, []
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.artikel = result.data
                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
            }).catch((err) => {
                console.log(err);
            })
        },
    },
}
</script>
<style>
.blog-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.blog-meta {
    font-size: 14px;
    color: #888;
    margin-bottom: 20px;
}

.blog-image {
    width: 50%;
    height: auto;
    margin-bottom: 20px;
}

.blog-content {
    font-size: 16px;
    line-height: 1.6;
}
</style>