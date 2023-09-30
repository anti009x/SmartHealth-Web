export default [
    {
        path: '/profil',
        name: 'ProfilUser',
        component: () => import('@/views/content/profile-page/ProfileUser.vue'),
        meta: {
            title: 'Profil',
            requiresAuth: true
        }
    },
    {
        path: '/account',
        name: 'AccountUser',
        component: () => import('@/views/content/profile-page/SettingsAccount.vue'),
        meta: {
            title: 'Profil',
            requiresAuth: true
        }
    },
    {
        path: '/alamat',
        name: 'AlamatUser',
        component: () => import('@/views/content/profile-page/AlamatUser.vue')
    },
    {
        path: '/forgot_password',
        name: 'Forgot Password',
        component: () =>import('@/views/auth/ForgotPassword.vue')
    },
    {
        path: '/reset_password/:token/verify',
        name: 'Reset Password',
        component: () =>import('@/views/auth/ConfirmPassword.vue')
    }

]