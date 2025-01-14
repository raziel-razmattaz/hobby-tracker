import { defineStore } from "pinia"

export const useHobbiesStore = defineStore('hobbies', {
    state: () => ({
        /** @type {{ text: string, id: number, hobbyHistory: string[] }[]} */
        hobbies: JSON.parse(localStorage.getItem("hobbies")) || [],
        /** @//type {'all' | 'doneToday' | 'notDoneToday'} */
        //filter: 'all',
        nextId: 0
    }),
    actions: {
        addHobby(text) {
            this.hobbies.push({text, id: this.nextId++, hobbyHistory: []});
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
        persistToLocalStorage() {
            localStorage.setItem("hobbies", JSON.stringify(this.hobbies));
        },
    }
})