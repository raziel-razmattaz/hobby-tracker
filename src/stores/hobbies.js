import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

export const useHobbiesStore = defineStore('hobbies', {
    state: () => ({
        /** @type {{ text: string, id: number, hobbyHistory: string[], category: string }[]} */
        hobbies: JSON.parse(localStorage.getItem("hobbies")) || [],
        /** @type { string[] } */
        categories: ['Creative', 'Stimulating', 'Relaxing', 'Social', 'Physical'],
    }),
    actions: {
        addHobby(text, category) {
            this.hobbies.push({text, id: uuidv4(), hobbyHistory: [], category});
            this.persistToLocalStorage();
        },
        removeHobby(hobbyID) {
            this.hobbies = this.hobbies.filter(hobby => hobby.id !== hobbyID);
            this.persistToLocalStorage();
        },
        removeAllHobbies() {
            localStorage.removeItem('hobbies');
            this.hobbies = [];
            this.persistToLocalStorage();
        },
        removeHobbyHistory() {
            this.hobbies.forEach(hobby => { hobby.hobbyHistory = [] });
            this.persistToLocalStorage();
        },
        toggleDoneToday(hobbyID) {
            const today = new Date().toISOString().split('T')[0];
            const hobby = this.hobbies.find(hobby => hobby.id === hobbyID);
            if (hobby) {
                const dateIndex = hobby.hobbyHistory.indexOf(today);
                if (dateIndex !== -1) {
                    hobby.hobbyHistory.splice(dateIndex, 1);
                } else {
                    hobby.hobbyHistory.push(today);
                }
                this.persistToLocalStorage();
            }
        },
        getHobbiesLastMonth() {
            const now = new Date();
            const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
            return this.hobbies.map((hobby) => ({
                ...hobby,
                hobbyHistory: hobby.hobbyHistory.filter((date) => new Date(date) >= thirtyDaysAgo),
            }));
        },
        getHobbiesLastWeek() {
            const now = new Date();
            const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
            return this.hobbies.map((hobby) => ({
                ...hobby,
                hobbyHistory: hobby.hobbyHistory.filter((date) => new Date(date) >= sevenDaysAgo),
            }));
        },
        getHobbiesByCategory(category) {
            return this.hobbies.filter(hobby => hobby.category === category);
        },
        persistToLocalStorage() {
            localStorage.setItem("hobbies", JSON.stringify(this.hobbies));
        },
    }
})