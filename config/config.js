export default {
    routes: [{
        path: '/',
        component: '../layout/index',
        routes: [
          {
            path: '/',
            component: './dashboard/monitor',
          },
          {
            path: '/dashboard',
            routes: [
              { path: '/dashboard/monitor', component: 'dashboard/monitor' },
              { path: '/dashboard/analysis', component: 'dashboard/analysis' },
              { path: '/dashboard/workplace', component: 'dashboard/workplace' }
            ]
          },
          {
            path: '/about',
            routes: [
              { path: '/about/overview', component: 'about/overview' },
              { path: '/about/data', component: 'about/data' }              
            ]
          }
        ]
      }],
    antd: {},
};