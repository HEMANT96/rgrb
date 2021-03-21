import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';
import Intro from '../views/Intro.vue';
import Register from '../views/auth/Register.vue';
import SignIn from '../views/auth/SignIn.vue';

import EnterPhone from '../views/auth/EnterPhone.vue';
import PhoneVerification from '../views/auth/PhoneVerification.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/intro'
  },
  {
    path: '/intro',
    component: Intro,
  },
  {
    path: '/signin',
    component: SignIn,
  },
  {
    path: '/personal-info',
    component: () => import('@/views/auth/RegisterPersonalInfo.vue')
  },
  {
    path: '/delivery-details',
    component: () => import('@/views/auth/RegisterDeliverDetail.vue')
  },
  {
    path: '/productdelivery-details',
    component: () => import('@/views/auth/DeliveryDetails.vue')
  },
  {
    path: '/phone-verification',
    component: () => import('@/views/auth/PhoneVerification.vue')
  },
  {
    path: '/reset-password',
    component: () => import('@/views/auth/ResetPassword.vue')
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/enter-phone',
    component: EnterPhone
  },
  {
    path: '/phone-verification',
    component: PhoneVerification
  },
  {
    path: '/enable',
    component: () => import('@/views/auth/Enable.vue'),
  },
  {
    path: '/selection',
    component: () => import('@/views/auth/Selection.vue'),
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
        children: [
          {
            path: 'dealoftheday',
            component: () => import('@/components/home/DealOfTheDay.vue'),
          },
          {
            path: 'filter',
            component: () => import('@/components/home/Filter.vue'),
          }
        ]
      },
      {
        path: 'search',
        component: () => import('@/views/Search.vue')
      },

      {
        path: 'explore',
        component: () => import('@/views/Explore.vue'),
        children: [
          {
            path: 'restaurant',
            component: () => import('@/components/explore/Restaurant.vue'),
            children: [
              {
                path: 'review',
                component: () => import('@/components/explore/Review.vue'),

              }
            ]

          }
        ]
      },
      {
        path: 'favourite',
        component: () => import('@/views/Favourite.vue')
      },

      {
        path: 'profile',
        component: () => import('@/views/Profile.vue'),
        children: [
          {
            path: 'settings',
            component: () => import('@/components/profile/Settings.vue'),
          },
          {
            path: 'address',
            component: () => import('@/components/profile/Address.vue'),
          },
          {
            path: 'paymentMethod',
            component: () => import('@/components/profile/PaymentMethod.vue'),
          },
          {
            path: 'orderpreview',
            component: () => import('@/components/profile/MyOrdersPreview.vue'),
          },
          {
            path: 'promoCode',
            component: () => import('@/components/profile/PromoCode.vue'),
          },
          {
            path: 'disCover',
            component: () => import('@/components/profile/Address.vue'),
          },
          {
            path: 'success-payment',
            component:() => import('@/components/profile/Success.vue'),
          },
          {
            path: 'cancle-payment',
            component: () => import('@/components/profile/Cancle.vue'),
          },
          {
            path: 'restaurant-info',
            component: () => import('@/components/profile/RestaurantInfo.vue')
          },
          {
            path: 'restaurant-menu',
            component: () => import('@/components/profile/RestaurantMenu.vue')
          },
          {
            path: 'restaurant-review',
            component: () => import('@/components/profile/RestaurantReview.vue')
          },
          {
            path: 'grilledBeef',
            component: () => import('@/components/profile/GrilledBeefPage.vue')
          },
          {
            path: 'orders-history',
            component: () => import('@/components/profile/MyOrdersHistory.vue'),
            children: [
              {
                path: 'comming-orders',
                component: () => import('@/components/profile/CommingOrder.vue'),

              }
            ]
          },
          
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
