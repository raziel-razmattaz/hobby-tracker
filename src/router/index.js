import { createRouter, createWebHistory } from "vue-router";
import FrequencyStatistics from "../components/FrequencyStatistics.vue";
import HobbyManager from "../components/HobbyManager.vue";
import Suggestions from "../components/Suggestions.vue";
import Calendar from "../components/Calendar.vue";
import QuickStatistics from "../components/QuickStatistics.vue";

const routes = [
    {path: "/", name: "Hobbies", component: HobbyManager},
    {path: "/calendar", name: "Calendar", component: Calendar},
    {path: "/stats", name: "Frequency Chart", component: FrequencyStatistics},
    {path: "/suggestions", name: "Suggestions", component: Suggestions},
    {path: "/quick", name: "Quick Overview", component: QuickStatistics},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;