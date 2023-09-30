export default[{
    path: '/login-user',
    name: 'LoginUser',
    component: () =>import('@/views/auth/LoginUser.vue'),
    meta: {
        title: 'login-user'
    }
}]