import Recipes from './components/recipes/Recipes'
import Login from './components/Auth/Login'
import ShopList from './components/ShoppingList'

import { guardMyroute } from './main';

export const routes = [
    {
        path: '/recipes',
        component: Recipes,
        beforeEnter : guardMyroute,
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/shopping-list',
        component: ShopList,
        beforeEnter : guardMyroute,
    },
    {
        path: '/',
        redirect: '/login'
    }
]

