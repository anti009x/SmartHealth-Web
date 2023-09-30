<template>
    <div class="card shadow border-0 rounded">
        <div class="card-body">
            <i :class="'fa-solid px-2 text-dark ' + icon"></i>
            <h4 class="px-2 text-dark">{{ labelTitle }}
            </h4>
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
        icon: {
            type: String,
            default: "fa-briefcase"
        }
    }
}
</script>

<style>
.medicine {
    padding-top: 0;
}

.medicine .box {
    padding: 25px 30px;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
    transition: all ease-in-out 0.3s;
}

.medicine .box span {
    display: block;
    font-size: 18px;
    font-weight: 600;
    color: #000087
}

.medicine .box h4 {
    font-size: 18px;
    font-weight: 600;
    padding: 0;
    margin: 2px 0;
    color: #000087;
}

.medicine .box:hover {
    padding: 20px 20px 30px 30px;
    box-shadow: 10px 15px 30px rgba(0, 0, 0, 0.18);
}

.medicine .box:hover span,
.medicine .box:hover h4 {
    color: #1843ff;
}
</style>