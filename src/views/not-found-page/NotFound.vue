<template>
    <div class="container col-md-10 col-xxl-10 py-4 px-4 border-top">
        <div class="row align-items-center">
            <div class="col-sm-6 px-4 py-4">
                <img src="../../assets/images/9.png" class="img-fluid" alt="">
            </div>
            <div class="col-sm-6 px-4 py-4 text-start font">
                <h6 class="warn text-center pt-2 pb-2 text-light"><b>Page Not Found</b></h6>
                <h1 class="warna"><b>Oh No! Error 404</b></h1>
                <p class="warnaa">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet provident eius dicta itaque, at nesciunt aliquid dolorum cum. Earum eius officiis deserunt reprehenderit soluta repellat optio consequuntur, omnis iure qui?</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-start">
                    <router-link to="/">
                    <button type="button" class="px-4 pt-1 pb-1 gap-3 button">
                        Back to Homepage
                    </button>
                    </router-link>
                    <router-link to="" class="bold mt-1 px-3" style="text-decoration: none;">Visit Our Help Center</router-link>
                  </div>
            </div>
        </div>
    </div>
</template>

<style>
.warn{
    background-color: rgb(42, 104, 158);
    border-radius: 20px;
    width: 30%;
}
.font .warna{
    color: rgb(1, 1, 67);
    font-size: 65px;
}
.font .warnaa{
    font-size: 18px;
    line-height: auto;
    color: rgb(152, 152, 152);
}

.font .button{
    background-color: rgb(58, 102, 185);
    color: white;
    border-radius: 8px;
    font-weight: 400;
    border: none;
}

.font .bold{
    color: rgb(155, 187, 218);
    font-weight: 500;
}
</style>