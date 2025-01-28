import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

//TODO in hobby-store-update:
//add function to delete all hobby data
//add delete all data button to settings
//add function to delete all hobbyhistory data only
//add delete hobby history button to stats
//add buttons to switch between week, month or lifetime stats
//possibly: clean up into pages?
//add hobby categories
//allow setting of hobby category when adding hobby
//allow filtering by hobby category in stats (ie return all "Creative" hobbies)
//included: refactor analogous to donut chart (ie you only pass the calculated list to frequencychart)

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
        removeAllHobbies() {
            localStorage.removeItem('hobbies');
            this.hobbies = [];
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
        persistToLocalStorage() {
            localStorage.setItem("hobbies", JSON.stringify(this.hobbies));
        },
    }
})