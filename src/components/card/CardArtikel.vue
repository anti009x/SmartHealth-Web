<template>
    <div class="card">
        <img :src="image" class="card-img-top rounded" alt="...">
        <h5 :class="'title pt-2 ' + textColor">{{ title }}</h5>
        <p class="description mb-0" style="">{{ description }}</p>
        <slot name="anyText"></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        title: {
            type: String,
            default: "kosong"
        },
        description: {
            type: String,
            default: "kosong"
        },
        image: {
            type: String,
            default: 'https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=170667a&w=0&k=20&c=gsR5TEhp1tfg-qj1DAYdghj9NfM0ldfNEMJUfAzHGtU='
        },
        textColor: {
            type: String,
            default: 'text-dark'
        }
    },
}
</script>