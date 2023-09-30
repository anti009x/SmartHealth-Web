<template>
    <div class="container col-md-10 col-xxl-10 py-4 px-4 border-top">
        <div class="row">
            <div class="col-lg-5 px-4 py-4">
                <div class="card text-center mb-3" style="width: 18rem;">
                    <div class="card-header rounded text-bg-danger px-5 py-5">
                        <div class="">
                            <img src="../../../assets/images/avadoktercowo.png" class="bg-info rounded-circle" style="width:30%;"
                                alt="">
                        </div>
                        <p class="mb-0">{{ form.nama }}</p>
                        <p class="mb-2">{{ form.nomor_hp }}</p>
                    </div>
                    <div class="card-body text-start px-3 ms-3 py-3">
                        <p class="card-text mb-0">Usia: <span><b>{{ form.usia }} tahun</b></span></p>
                        <p class="card-text mb-0">Berat badan : <span><b>{{ form.beratBadan }} kg</b></span></p>
                        <p class="card-text">Tinggi badan: <span><b>{{ form.tinggiBadan }} cm</b></span></p>
                    </div>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="header">
                    <h6>
                        Edit Profile
                    </h6>
                </div>
                <div class="position-relative text-center">
                    <!-- <p class="text-bg-success pb-1 pt-1 rounded position-absolute" style="top:5%; right: 65%">
                        {{ form.data.getRole.namaRole }} </p> -->
                    <img src="../../../assets/images/avadoktercowo.png" class="bg-info rounded-circle" style="width:30%;" alt="">
                    <p class="text-bg-primary pb-1 pt-1 rounded-circle position-absolute" style="bottom:3%; left: 60%"><span
                            class="px-2 py-2" style="font-size: 14px;"><i class="fas fa-pencil"></i></span></p>
                </div>
                <div class="py-3 align-items-start">
                    <Form @submit="editData" :validation-schema="schema" v-slot="{ errors }">
                        <div class="row">
                            <div class="col-sm-6 col-6">
                                <label for="" class="mb-2">Nama Lengkap</label>
                                <InputField class="w-100" Name="nama" v-model="form.nama" />
                                <label for="" class="mb-2">Nomor HP</label>
                                <InputField class="w-100" Name="nomorHp" v-model="form.nomorHp" />
                                <span :class="[errorClass]">{{errors.nomorHp}}</span>
                            </div>
                            <div class="col-sm-6 col-6">
                                <label for="" class="mb-2">Email</label>
                                <InputField class="w-100" Name="email" v-model="form.email" />
                                <label for="" class="mb-2">Tempat Lahir</label>
                                <InputField class="w-100" Name="jenisKelamin" v-model="form.tempatLahir" />
                            </div>
                        </div>
                        <label for="" class="mb-2">Alamat</label>
                        <InputField class="w-100" Name="alamat" v-model="form.alamat" />
                        <div class="row">
                            <div class="col-sm-6 col-6">
                                <label for="" class="mb-2">Tinggi Badan</label>
                                <InputField class="w-100" Name="tinggiBadan" v-model="form.tinggiBadan" />
                                <label for="" class="mb-2">Usia</label>
                                <InputField class="w-100" Name="usia" v-model="form.usia" />
                            </div>
                            <div class="col-sm-6 col-6">
                                <label for="" class="mb-2">Tanggal Lahir</label>
                                <InputField class="w-100" Name="tanggal" type="date" v-model="form.tanggalLahir" />
                                <label for="" class="mb-2">Berat Badan</label>
                                <InputField class="w-100" Name="beratBadan" v-model="form.beratBadan" />
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-sm btn-primary w-25">Save</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import axios from "axios";
import InputField from '@/components/partials-component/InputField.vue';
import { Form } from 'vee-validate';
import iziToast from 'izitoast';
import * as validate from 'yup'
export default {
    data() {
        return {
            form: {
                nama: '',
                email: '',  
                nomorHp: '',
                tempatLahir: '',
                alamat: '',
                tinggiBadan: '',
                usia: '',
                tanggalLahir: '',
                beratBadan: '',
            },
            nik: '',
            errorClass: 'text-danger'
        }
    },
    computed: {
        schema() {
            const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

            return validate.object({
                nomorHp: validate.string()
                    .required("required")
                    .matches(phoneRegExp, 'Phone number is not valid')
                    .min(10, "too short")
                    .max(13, "too long"),
            })
        }
    },
    mounted() {
        this.getData()
    },
    components: {
        InputField, Form
    },
    methods: {
        getData() {
            const cookie = Cookies.get("user");
            const parsing = JSON.parse(cookie);

            const cekRole = parsing.data.getRole.namaRole;

            let type = "getData"
            let url = null;

            if (cekRole == "Konsumen") {
                url = [
                    "akun/profil/konsumen/profil", []
                ]
            } else {
                url = [
                    "akun/profil/perawat/profil", []
                ]
            }
            this.$store.dispatch(type, url).then((result) => {
                this.form = result.data.user
                this.nik = result.data.nik
            }).catch((err) => {
                console.log(err);
            })
        },
        async editData() {
            const cookie = Cookies.get("user");
            const parsing = JSON.parse(cookie);

            try {
                const data = {
                    nik: 999,
                    nama: this.form.nama,
                    email: this.form.email,
                    nomor_hp: this.form.nomorHp,
                    tanggal_lahir: this.form.tanggalLahir,
                    alamat: this.form.alamat,
                    tinggi_badan: this.form.tinggiBadan,
                    berat_badan: this.form.beratBadan,
                    usia: this.form.usia,
                    tempat_lahir: this.form.tempatLahir,
                }
                const response = await axios({
                    url: "akun/profil/konsumen/profil",
                    method: "PUT",
                    Authorization: "Bearer " + parsing.data.token,
                    data: data
                }).then((result) => {
                    setTimeout(() => {
                        iziToast.success({
                            transitionIn: 'fadeInUp',
                            timeout: 2000,
                            title: "Berhasil",
                            message: "Berhasil Ubah Data",
                            position: "topRight",
                        })
                    }, 2000);
                }).catch((error) => {
                    console.log(error);
                })

            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>