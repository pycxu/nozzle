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
              { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
              { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
              { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
            ]
          },
          {
            path: '/about',
            routes: [
              { path: '/about/overview', component: 'About/Overview' },
              { path: '/about/data', component: 'About/Data' }              
            ]
          }
        ]
      }],
    antd: {},
    
};