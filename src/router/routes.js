import Register from "./modules/register";
import LoginUser from "./modules/auth";
import ProfilUser from "./modules/account"
import ArtikelModules from "./modules/artikel"
import DokterModules from "./modules/dokter"
import DiagnosaModules from "./modules/diagnosa"
import RumahSakitModules from "./modules/rumahSakit"
import IndexHome from "@/views/content/IndexHome.vue"
import PageNotFound from "@/views/not-found-page/NotFound.vue"
import PublicRoutes from "./modules/publicRoutes";
import diagnosis from "./modules/diagnosis";
const routes = [
    ...PublicRoutes,
    ...Register,
    ...LoginUser,
    ...ProfilUser,
    ...ArtikelModules,
    ...DiagnosaModules,
    ...DokterModules,
    ...RumahSakitModules,
    ...diagnosis,
    {
        path: '/',
        name: 'IndexHome',
        component: IndexHome
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'PageNotFound', 
        component: PageNotFound 
    },

]

export default routes