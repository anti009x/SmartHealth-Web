<template>
    <div class="container py-5">
        <div class="col-12 col-md-6 mx-auto">
            <div class="card shadow">
                <div class="card-header">
                    <h4>
                        Reset Password
                    </h4>
                </div>
                <div class="card-body">
                    <Form :validation-schema="schema" v-slot="{errors}">
                        <div class="form-group">
                            <label for="">Password Baru</label>
                            <input type="password" name="passwordd" class="form-control" v-model="form.password">
                            <!-- <span>
                                {{ errors.passwordd }}
                            </span> -->
                        </div>
                        <div class="form-group mt-2">
                            <label for="">Konfirmasi Password</label>
                            <input type="password" name="confirm" class="form-control" v-model="form.confirm_password">
                            <!-- <span>
                                {{ errors.confirm }}
                            </span> -->
                        </div>
                    </Form>
                <div class="form-group">
                    <button class="btn mt-3 btn-primary" type="submit" @click="changePassword">
                        submit
                    </button>
                </div>
                </div>
            </div>  
        </div>
    </div>
</template>
<script>
import {Form} from 'vee-validate'
import * as valid from 'yup'
export default {
    data(){
        return{
            form: {
                password: '',
                confirm_password: ''
            }
        }
    },
    computed: {
        idFromParams(){
            return this.$route.params.token
        },
        schema(){
            return valid.object({
                passwordd: valid.string().required().min(8),
                confirm: valid.string().required().min(8)
            })
        }
    },
    methods: {
        changePassword(){
            let type = "putData"
            let url = [
                `autentikasi/forgot_password/${this.idFromParams}`, this.form, {}
            ]
            this.$store.dispatch(type, url).then((response) => {
                if(response.status == false){
                    this.$swal({
                        icon: 'error',
                        title: 'gagal',
                        text: response.pesan
                    })
                } else if(response.success == false){
                    this.$swal({
                        icon: 'error',
                        title: 'gagal',
                        text: response.message
                    })
                }
                else{
                    this.$swal({
                        icon: 'success',
                        title: 'berhasil reset password',
                    }).then(()=>{
                        this.$router.push({name: 'LoginUser'})
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        Form
    }
}
</script>