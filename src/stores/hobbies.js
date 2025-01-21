import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

export const useHobbiesStore = defineStore('hobbies', {
    state: () => ({
        /** @type {{ text: string, id: number, hobbyHistory: string[] }[]} */
        hobbies: JSON.parse(localStorage.getItem("hobbies")) || [],
        /** @//type {'all' | 'doneToday' | 'notDoneToday'} */
        //filter: 'all'
    }),
    actions: {
        addHobby(text) {
            this.hobbies.push({text, id: uuidv4(), hobbyHistory: []});
            this.persistToLocalStorage();
        },
        removeHobby(hobbyID) {
            this.hobbies = this.hobbies.filter(hobby => hobby.id !== hobbyID);
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
        persistToLocalStorage() {
            localStorage.setItem("hobbies", JSON.stringify(this.hobbies));
        },
    }
})