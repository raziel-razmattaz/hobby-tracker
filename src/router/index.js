import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";

//
import FrequencyStatistics from "../components/FrequencyStatistics.vue";
import Suggestions from "../components/Suggestions.vue";
import Calendar from "../components/Calendar.vue";

const routes = [
    {path: "/", name: "Hobbies", component: Home},
    {path: "/calendar", name: "Calendar", component: Calendar},
    {path: "/stats", name: "Frequency Chart", component: FrequencyStatistics},
    {path: "/suggestions", name: "Suggestions", component: Suggestions},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;