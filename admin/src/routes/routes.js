import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue';
import AuthLayout from 'src/pages/Pages/AuthLayout.vue';
// GeneralViews
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue';

// Calendar
const Calendar = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Calendar/CalendarRoute.vue');
// Charts
const Charts = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Charts.vue');

// Components pages
const Buttons = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/Buttons.vue');
const GridSystem = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/GridSystem.vue');
const Panels = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/Panels.vue');
const SweetAlert = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/SweetAlert.vue');
const Notifications = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/Notifications.vue');
const Icons = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/Icons.vue');
const Typography = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Components/Typography.vue');

// Dashboard pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard.vue');
import Widgets from 'src/pages/Widgets.vue';

// Forms pages
const RegularForms = () => import('src/pages/Forms/RegularForms.vue');
const ExtendedForms = () => import('src/pages/Forms/ExtendedForms.vue');
const ValidationForms = () => import('src/pages/Forms/ValidationForms.vue');
const Wizard = () => import('src/pages/Forms/Wizard.vue');

// Maps pages
const GoogleMaps = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Maps/GoogleMaps.vue');
const FullScreenMap = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Maps/FullScreenMap.vue');
const VectorMaps = () =>
  import(/* webpackChunkName: "extra" */ 'src/pages/Maps/VectorMaps.vue');

// Pages
const User = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/UserProfile.vue');
const Pricing = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Pricing.vue');
const TimeLine = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/TimeLinePage.vue');
const Login = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Login.vue');
const Register = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Register.vue');
const RTL = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/RTLPage.vue');
const Lock = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Lock.vue');

// TableList pages
const RegularTables = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Tables/RegularTables.vue');
const ExtendedTables = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Tables/ExtendedTables.vue');
const PaginatedTables = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Tables/PaginatedTables.vue');
let componentsMenu = {
  path: '/components',
  component: DashboardLayout,
  redirect: '/components/buttons',
  name: 'Components',
  children: [
    {
      path: 'buttons',
      name: 'Buttons',
      components: { default: Buttons }
    },
    {
      path: 'grid-system',
      name: 'Grid System',
      components: { default: GridSystem }
    },
    {
      path: 'panels',
      name: 'Panels',
      components: { default: Panels }
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
      components: { default: SweetAlert }
    },
    {
      path: 'notifications',
      name: 'Notifications',
      components: { default: Notifications }
    },
    {
      path: 'icons',
      name: 'Icons',
      components: { default: Icons }
    },
    {
      path: 'typography',
      name: 'Typography',
      components: { default: Typography }
    }
  ]
};
let formsMenu = {
  path: '/forms',
  component: DashboardLayout,
  redirect: '/forms/regular',
  name: 'Forms',
  children: [
    {
      path: 'regular',
      name: 'Regular Forms',
      components: { default: RegularForms }
    },
    {
      path: 'extended',
      name: 'Extended Forms',
      components: { default: ExtendedForms }
    },
    {
      path: 'validation',
      name: 'Validation Forms',
      components: { default: ValidationForms }
    },
    {
      path: 'wizard',
      name: 'Wizard',
      components: { default: Wizard }
    }
  ]
};

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  name: 'Tables',
  children: [
    {
      path: 'regular',
      name: 'Regular Tables',
      components: { default: RegularTables }
    },
    {
      path: 'extended',
      name: 'Extended Tables',
      components: { default: ExtendedTables }
    },
    {
      path: 'paginated',
      name: 'Paginated Tables',
      components: { default: PaginatedTables }
    }
  ]
};

let mapsMenu = {
  path: '/maps',
  component: DashboardLayout,
  name: 'Maps',
  redirect: '/maps/google',
  children: [
    {
      path: 'google',
      name: 'Google Maps',
      components: { default: GoogleMaps }
    },
    {
      path: 'full-screen',
      name: 'Full Screen Map',
      meta: {
        hideContent: true,
        hideFooter: true
      },
      components: { default: FullScreenMap }
    },
    {
      path: 'vector-map',
      name: 'Vector Map',
      components: { default: VectorMaps }
    }
  ]
};

let pagesMenu = {
  path: '/pages',
  component: DashboardLayout,
  name: 'Pages',
  redirect: '/pages/user',
  children: [
    {
      path: 'user',
      name: 'User Page',
      components: { default: User }
    },
    {
      path: 'timeline',
      name: 'Timeline Page',
      components: { default: TimeLine }
    },
    {
      path: 'rtl',
      name: 'RTL Page',
      components: { default: RTL }
    }
  ]
};

let authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: Pricing
    },
    {
      path: '/lock',
      name: 'Lock',
      component: Lock
    }
  ]
};

import {authGuard} from './auth-guard';

const RestaurantsList = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Restaurants/List.vue');
const RestaurantsEdit = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Restaurants/Edit.vue');

let restaurantsMenu = {
  path: '/restaurants',
  component: DashboardLayout,
  redirect: '/restaurants/list',
  name: 'Restaurants',
  children: [
    {
      path: 'list',
      name: 'Restaurants List',
      components: { default: RestaurantsList }
    },
    {
      path: 'edit',
      name: 'Restaurant Edit',
      components: { default: RestaurantsEdit }
    },
    {
      path: 'add',
      name: 'Restaurant Add',
      components: { default: RestaurantsEdit }
    }
  ],
  beforeEnter: authGuard
};

const CategoriesList = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/RestrorantsData/Category/List.vue');
const CategoriesEdit = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/RestrorantsData/Category/Edit.vue');

let categoriesMenu = {
  path: '/categories',
  component: DashboardLayout,
  redirect: '/categories/list',
  name: 'Categories',
  children: [
    {
      path: 'list',
      name: 'Categories List',
      components: { default: CategoriesList }
    },
    {
      path: 'edit',
      name: 'Category Edit',
      components: { default: CategoriesEdit }
    },
    {
      path: 'add',
      name: 'Category Add',
      components: { default: CategoriesEdit }
    }
  ],
  beforeEnter: authGuard
};

const MenusList = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/RestrorantsData/Menus/List.vue');
const MenusEdit = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/RestrorantsData/Menus/Edit.vue');

let menusMenu = {
  path: '/menus',
  component: DashboardLayout,
  redirect: '/menus/list',
  name: 'Menus',
  children: [
    {
      path: 'list',
      name: 'Menus List',
      components: { default: MenusList }
    },
    {
      path: 'edit',
      name: 'Menu Edit',
      components: { default: MenusEdit }
    },
    {
      path: 'add',
      name: 'Menu Add',
      components: { default: MenusEdit }
    }
  ],
  beforeEnter: authGuard
};

const PromocodeList = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/PromoCode/List.vue');
const PromocodeEdit = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/PromoCode/Edit.vue');
let promoCode  = {
  path: '/promocode',
  component: DashboardLayout,
  redirect: '/promocode/list',
  name: 'Promocodes',
  children: [
    {
      path: 'list',
      name: 'Promocodes List',
      components: { default: PromocodeList }
    },
    {
      path: 'edit',
      name: 'Promocodes Edit',
      components: { default: PromocodeEdit }
    }
  ],
  beforeEnter: authGuard
};

const OrdersList = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Orders/List.vue');

let ordersMenu = {
  path: '/orders',
  component: DashboardLayout,
  redirect: '/orders/list',
  name: 'Orders',
  children: [
    {
      path: 'list',
      name: 'Orders List',
      components: { default: OrdersList }
    }
  ],
  beforeEnter: authGuard
};


const routes = [
  {
    path: '/',
    redirect: '/login',
    name: 'Authentication'
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  authPages,
  restaurantsMenu,
  categoriesMenu,
  promoCode,
  menusMenu,
  ordersMenu,
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard layout',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard }
      },
      {
        path: 'calendar',
        name: 'Calendar',
        components: { default: Calendar }
      },
      {
        path: 'charts',
        name: 'Charts',
        components: { default: Charts }
      },
      {
        path: 'widgets',
        name: 'Widgets',
        components: { default: Widgets }
      }
    ]
  },
  { path: '*', component: NotFound }
];

export default routes;
