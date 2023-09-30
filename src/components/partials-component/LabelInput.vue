<template>
    <div>
        <label for="" class="mb-2">{{Name}}</label>
    </div>
</template>

<script>
export default{
    props: {
        Name: {
            type: String,
            default: "Namaa"
        }
    }
}
</script>