<template>
    <div class="layanan">
        <div class="row me-2 ms-2">
            <div class="box">
                <span class="mb-0"><i :class="'fa-solid ' + icon"></i></span>
                <h4>{{ labelTitle }}</h4>
                <p>{{ labelParagraph }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        labelTitle: {
            type: String,
            default: "Belum Diisi"
        },
        labelParagraph: {
            type: String,
            default: "Belum Diisi"
        },
        icon :{
            type: String,
            default: "fa-briefcase"
        }
    }
}
</script>

<style>
.layanan {
    padding-top: 0;
}

.layanan .box {
    padding: 25px 30px;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
    transition: all ease-in-out 0.3s;
}

.layanan .box span {
    display: block;
    font-size: 20px;
    font-weight: 700;
    color: #000087;
}

.layanan .box h4 {
    font-size: 18px;
    font-weight: 600;
    padding: 0;
    margin: 2px 0;
    color: #434175;
}

.layanan .box p {
    color: #aaaaaa;
    font-size: 14px;
    margin: 0;
    padding: 0;
}

.layanan .box:hover {
    background: #5a5af3;
    padding: 20px 20px 30px 30px;
    box-shadow: 10px 15px 30px rgba(0, 0, 0, 0.18);
}

.layanan .box:hover span,
.layanan .box:hover h4,
.layanan .box:hover p {
    color: #fff;
}
</style>