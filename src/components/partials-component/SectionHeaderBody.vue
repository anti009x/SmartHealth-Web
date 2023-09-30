<template>
    <div class="container-fluid p-lg-4 bg-primary">
        <div class="container">
            <slot name="router"></slot>
            <div class="d-flex justify-content-between">
                <div class="text-light mb-3 d-none d-sm-block">
                    <h3>
                        {{ Judul }}
                    </h3>
                    <h4>
                        {{Slogan}}
                    </h4>
                </div>
                <div class="text-light mb-3 mt-2">
                    <h6 class="text-end">
                        {{ Alamat }}
                    </h6>
                    <div class="rounded text-center px-3" style="background-color: navy;">
                        <slot name=lokasi>
                            
                        </slot>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-start">
                <div class="col-12 col-md-6">
                    <slot name="input">

                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        Judul: {
            type: String
        },
        Slogan: {
            type: String
        },
        Alamat: {
            type: String
        }
    }
}
</script>