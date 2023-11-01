export default [
  {
    path: '/diagnosis',
    name: 'diagnosispakar',
    component: () => import('@/views/content/diagnosis/indexdiagnosis.vue')
  },

  {
    path: '/hasil_diagnosis',
    name: 'hasil_riwayat',
    component: () => import('@/views/content/diagnosis/hasil_diagnosis.vue')
  },

  {
    path: '/detail_diagnosis/:id',
    name: 'detail_diagnosis',
    component: () => import('@/views/content/diagnosis/detail_diagnosis.vue'),
    props: true
  }
]
