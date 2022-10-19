import WallPage from "../Pages/WallPage.vue"
import LoginPage from "../Pages/LoginPage.vue"
import SignUpPage from "../Pages/SignUpPage.vue"
import {
    createRouter,
    createWebHistory
} from "vue-router"

const routes = [{
        path: "/login",
        component: LoginPage
    },
    {
        path: "/home",
        component: WallPage
    },
    {
        path: "/signup",
        component: SignUpPage
    },
    {
        path: "/",
        redirect: "/home"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from) => {
    console.log("from", from)
    console.log("to", to)

    if (!publicPages.includes(to.path) && !isTokenLS()) {
        return router.push("/Login")
    }
})

const publicPages = ["/Login", "/signup"]

function isTokenLS() {
    return localStorage.getItem("token") != null
}

export default router;