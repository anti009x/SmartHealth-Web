<template>
    <div class="card border-0">
        <div class="row">
            <div class="col-6 py-2">
                    <img src="../../assets/images/avadoktercowo.png" class="img-fluid rounded" alt="">
            </div>
            <div class="col-6 py-3 mt-3 px-3">
                <p class="mb-1" style="font-size: 14px;"><b>{{ nama }}</b></p>
                <p class="text-secondary text-sm mb-1" :style="styleParagraph">
                    {{Label}}
                </p>
                <div class="d-flex justify-content-start" :style="styleParagraph">
                    <p class="rounded mb-1 me-1"><i class="ms-1 fa-solid fa-briefcase"></i> 1 tahun &nbsp;</p>
                    <p class="rounded mb-1"><i :class="'ms-1 fa-solid ' + icon "></i>
                        {{rating}} &nbsp;</p>
                </div>
                <div>
                    <p class="mb-1" :style="styleParagraph">Rp. {{ biaya }}</p>
                </div>
                <div class="pt-3">
                    <button class="btn btn-sm text-light w-50"
                        :style="styleButton">{{labelButton}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            styleButton: {
                'background-color': '#00235B',
                'font-size': '12px'
            },
            styleParagraph: {
                'font-size': '12px'
            }
        }
    },
    props: {
        Image: {
            type: String,
            default: ''
        },
        nama: {
            type: String,
            default: ''
        },
        biaya: {
            type: String,
            default: ''
        },
        Label: {
            type: String,
            default: ''
        },
        labelButton: {
            type: String,
            default: 'Chat'
        },
        icon: {
            type: String,
            default: 'fa-star'
        },
        rating: {
            type: String,
            default: '5'
        }
    }
}
</script>