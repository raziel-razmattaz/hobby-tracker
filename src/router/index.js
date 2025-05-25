import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import FrequencyStatistics from "../pages/FrequencyStatistics.vue";
import Calendar from "../pages/Calendar.vue";
import Settings from "../pages/Settings.vue";
import About from "../pages/About.vue"

const routes = [
    {path: "/", name: "Hobbies", component: Home},
    {path: "/calendar", name: "Calendar", component: Calendar},
    {path: "/stats", name: "Frequency Chart", component: FrequencyStatistics},
    {path: "/settings", name: "Settings", component: Settings},
    {path: "/about", name: "About", component: About},
];

const router = createRouter({
    history: createWebHistory('/hobby-tracker/'),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating to: ${to.path}`);
    next();
});

export default router;