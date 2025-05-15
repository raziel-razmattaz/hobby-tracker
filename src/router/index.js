import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import FrequencyStatistics from "../pages/FrequencyStatistics.vue";
import Suggestions from "../pages/Suggestions.vue";
import Calendar from "../pages/Calendar.vue";
import Settings from "../pages/Settings.vue";

const routes = [
    {path: "/", name: "Hobbies", component: Home},
    {path: "/calendar", name: "Calendar", component: Calendar},
    {path: "/stats", name: "Frequency Chart", component: FrequencyStatistics},
    {path: "/settings", name: "Settings", component: Settings},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;