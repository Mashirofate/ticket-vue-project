import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/exhibition/:id',
    name: '展示',
    hidden: true,
    component: () => import('@/views/exhibition/index'),
    meta: { title: '展示', icon: 'dashboard' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '展示页面',
    meta: { title: '展示页面', icon: 'example' },
    children: [{
      path: 'dashboard',
      name: '系统首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '系统首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: '数据管理',
    meta: { title: '数据管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '用户管理',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/vm',
    name: '数据管理',
    meta: { title: '数据管理', icon: 'example' },
    children: [
      {
        path: 'ticketing',
        name: '票务人员管理',
        component: () => import('@/views/ticketingStaff/index'),
        meta: { title: '票务人员管理', icon: 'dashboard' }
      },
      {
        path: 'addticketingBatch',
        hidden: true,
        name: '批量导入票务人员管理',
        component: () => import('@/views/ticketingStaff/addBatch/index'),
        meta: { title: '批量导入票务人员管理', icon: 'dashboard' }
      },
      {
        path: 'activity',
        name: '活动管理',
        component: () => import('@/views/activity/index'),
        meta: { title: '活动管理', icon: 'dashboard' }
      },
      {
        path: 'vm',
        name: '场馆管理',
        component: () => import('@/views/venueManagement/index'),
        meta: { title: '场馆管理', icon: 'dashboard' }
      },
      {
        path: 'em',
        name: '场馆入口管理',
        component: () => import('@/views/entranceManagement/index'),
        meta: { title: '场馆入口管理', icon: 'dashboard' }
      },

      {
        path: 'addBatch',
        hidden: true,
        name: '批量添加人员',
        component: () => import('@/views/user/addBatch/index'),
        meta: { title: '批量添加人员', icon: 'dashboard' }
      },]
  },
  {
    path: '/example',
    component: Layout,
    hidden: true,
    redirect: '/example/table',
    name: 'Example',

    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    hidden: true,
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
