<template>
    <div class="px-2 pt-3">
        <p>{{Label}}</p>
    </div>
</template>

<script>
export default {
    props: {
        Label: {
            type: String,
            default: "Belum Ada Judul"
        }
    }
}
</script>

<style>
.px-2{
    font-size: 18px;
    font-weight: 600;
}
</style>