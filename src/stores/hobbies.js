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
        filterHobbiesSince(daysAgo) { //filters hobbyHistory not hobbies! this is for the stats page
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - daysAgo);
            cutoff.setHours(0, 0, 0, 0);
            return this.hobbies.map(hobby => {
                const filteredHistory = (hobby.hobbyHistory || []).filter(dateString => {
                    const date = new Date(dateString);
                    date.setHours(0, 0, 0, 0);
                    return date >= cutoff;
                });
                return {
                    text: hobby.text,
                    id: hobby.id,
                    category: hobby.category,
                    hobbyHistory: filteredHistory,
                };
            });
        },
        getHobbiesLastMonth() { 
            return this.filterHobbiesSince(30);
        },
        getHobbiesLastWeek() {
            return this.filterHobbiesSince(7);
        },
        getHobbiesByCategory(category) {
            return this.hobbies.filter(hobby => hobby.category === category);
        },
        persistToLocalStorage() {
            localStorage.setItem("hobbies", JSON.stringify(this.hobbies));
        },
    }
})