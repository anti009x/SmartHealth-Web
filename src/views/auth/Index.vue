<template>
    <div class="container py-3 mb-5">
        <div class="row justify-content-center">
            <div class="col-lg-6 mt-3">
                <h4>Welcome <span class="text-primary">back</span></h4>
                <p class="text-secondary">
                    <small>
                        start the adventure
                    </small>
                </p>
                <div class="card shadow">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">Register</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="post">
                            <div class="row mb-3">
                                <div :class="['col-md-6', { 'has-error': submitted && !form.nama }]">
                                    <label for="name" class="form-label">Nama</label>
                                    <input type="text" id="name" class="form-control" v-model="form.nama">
                                </div>
                                <div :class="['col-md-6', { 'has-error': submitted && !form.nomorHp }]">
                                    <label for="nomor hp" class="form-label">Nomor HP</label>
                                    <input type="text" class="form-control" v-model="form.nomorHp">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div :class="['col-md-6', { 'has-error': submitted && !form.password }]">
                                    <label for="name" class="form-label">Password</label>
                                    <input type="password" class="form-control" v-model="form.password">
                                </div>
                                <div class="col-md-6">
                                    <label for="selectOption" class="form-label">Jenis Kelamin</label>
                                    <select
                                        :class="['form-select select', { 'has-error': submitted && !form.jenisKelamin }]"
                                        v-model="form.jenisKelamin">
                                        <option value="" disabled>----Pilih Jenis Kelamin----</option>
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="selectOption" class="form-label">Jenis Akun</label>
                                <select id="selectOption" class="form-select" v-model="form.option">
                                    <option value="" disabled>----Pilih Jenis Akun----</option>
                                    <option v-for="data in akun" :value="data.value" :key="data.value">
                                        {{ data.label }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="fotoInput" class="form-label me-2">Foto Pribadi *formal</label> <br>
                                <input type="file" id="fotoInput" class="form-control-file" @change="handleFoto">
                            </div>
                            <div class="mb-3">
                                <label for="fileInput" class="form-label me-2">Dokumen Pendukung STR, STRP, atau Bukti Kepemilikan</label>
                                <br>
                                <input type="file" id="fileInput" class="form-control-file" @change="handleFileDokumen">
                            </div>
                            <div class="text-center">
                                <button class="btn w-100 btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 d-none d-sm-block mt-5">
                <img src="../../assets/images/register.png" class="img-fluid" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                nama: 'fikri',
                nomorHp: '081411126356',
                password: 'password',
                jenisKelamin: 'L',
                option: 'dokter',
                foto: null,
                fileDokumen: null,
                noKtp: '2223383828288'
            },
            akun: [
                { value: 'perawat', label: 'Perawat' },
                { value: 'dokter', label: 'Dokter' },
                { value: 'rumah_sakit', label: 'Rumah Sakit' },
                { value: 'apotek', label: 'Apotek' },
            ],
            submitted: false
        };
    },
    methods: {
        changeRoute() {
            this.$router.push('RegisterKonsumen')
        },
        handleFoto(event) {
            this.form.foto = event.target.files[0];
        },
        handleFileDokumen(event) {
            this.form.fileDokumen = event.target.files[0];
        },
        async post() {
            this.submitted = true;
            const formData = new FormData();
            formData.append('nama', this.form.nama);
            formData.append('nomor_hp', this.form.nomorHp);
            formData.append('password', this.form.password);
            formData.append('option', this.form.option);
            formData.append('jenis_kelamin', this.form.jenisKelamin);
            formData.append('no_ktp', this.form.noKtp)

            const fotoFile = this.form.foto;
            if (fotoFile && (fotoFile.type === 'image/png' || fotoFile.type === 'image/jpeg')) {
                formData.append('foto', fotoFile);
            } else {
                this.$swal({
                    icon: 'error',
                    title: 'Format Foto Invalid',
                    text: 'Foto harus berformat PNG atau JPEG.',
                });
                return; 
            }
            const fileDokumenFile = this.form.fileDokumen;
            if (fileDokumenFile && fileDokumenFile.type === 'application/pdf') {
                formData.append('file_dokumen', fileDokumenFile);
            } else {
                this.$swal({
                    icon: 'error',
                    title: 'Format File Invalid',
                    text: 'Dokumen harus berformat .PDF',
                });
                return; 
            }
            this.$store.dispatch('postDataUpload', ['autentikasi/register', formData])
                .then((result) => {
                    console.log(result.success);
                    if (result.success === false) {
                        this.$swal({
                            icon: 'error',
                            title: result.message,
                            text: 'All input fields are required.',
                        });
                    } else {
                        this.$swal({
                            icon: 'success',
                            title: "berhasil melakukan registrasi",
                        }).then(() => {
                            // this.$router.push({ name: 'LoginUser' });
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },

    },
};
</script>
  
<style>
.has-error input {
    border-color: red;
}

.has-error select {
    border-color: red;
}
</style>
  