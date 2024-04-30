export const subPages = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'login'
    }
  },
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: 'dashboard'
    }
  },
  {
    path: '/403',
    component: () => import('@/views/403.vue'),
    meta: {
      title: '403'
    }
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404'
    }
  }
]

export const pages = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: 'home',
      icon: 'home'
    }
  },
  {
    path: '/load-forecasting',
    redirect: '/load-forecasting/regional-loads',
    meta: {
      title: 'load-forecasting',
      icon: 'load-forecasting'
    },
    children: [
      {
        path: '/load-forecasting/regional-loads',
        component: () => import('@/views/load-forecasting/regional-loads/index.vue'),
        meta: {
          title: 'regional-loads'
        }
      },
      {
        path: '/load-forecasting/main-transformer-load',
        component: () => import('@/views/load-forecasting/main-transformer-load/index.vue'),
        meta: {
          title: 'main-transformer-load'
        }
      },
      {
        path: '/load-forecasting/feeder-load',
        component: () => import('@/views/load-forecasting/feeder-load/index.vue'),
        meta: {
          title: 'feeder-load'
        }
      }
    ]
  },
  {
    path: '/analytical-tools',
    component: () => import('@/views/analytical-tools/index.vue'),
    meta: {
      title: 'analytical-tools',
      icon: 'analytical-tools'
    }
  },
  {
    path: '/weather-forecasting',
    redirect: '/weather-forecasting/weather-forecast',
    meta: {
      title: 'weather-forecasting',
      icon: 'weather-forecasting'
    },
    children: [
      {
        path: '/weather-forecasting/weather-forecast',
        component: () => import('@/views//weather-forecasting/weather-forecast/index.vue'),
        meta: {
          title: 'weather-forecast'
        }
      },
      {
        path: '/weather-forecasting/meteorological-monitoring',
        component: () => import('@/views//weather-forecasting/meteorological-monitoring/index.vue'),
        meta: {
          title: 'meteorological-monitoring'
        }
      }
    ]
  },
  {
    path: '/load-warning',
    component: () => import('@/views/load-warning/index.vue'),
    meta: {
      title: 'load-warning',
      icon: 'load-warning'
    }
  },
  {
    path: '/system',
    component: () => import('@/views/system/index.vue'),
    meta: {
      title: 'system',
      icon: 'system'
    }
  }
]

export default [...pages, ...subPages]
