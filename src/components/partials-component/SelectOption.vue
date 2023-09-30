<template>
    <div :class="inputStyle">
        <select :class="formSelect" v-model="selectGender">
            <option v-for="option in options" :value="option.value">{{ option.text }}</option>
        </select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectGender: 'Laki-laki',
            options: [
                { text: 'Laki-Laki', value: 'Laki-Laki' },
                { text: 'Perempuan', value: 'Perempuan' }
            ],
            formSelect: {
                'form-select': true,
                
            },
            inputStyle: {
                'pt-3': true
            }
        }
    },
}
</script>