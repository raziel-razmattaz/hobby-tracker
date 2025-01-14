import { defineStore } from "pinia"

export const useHobbiesStore = defineStore('hobbies', {
    state: () => ({
        /** @type {{ text: string, id: number, doneToday: boolean }[]} */
        hobbies: JSON.parse(localStorage.getItem("hobbies")) || [],
        /** @//type {'all' | 'doneToday' | 'notDoneToday'} */
        //filter: 'all',
        nextId: 0
    }),
    /**getters: {
        hobbiesDoneToday(state) {
            return state.hobbies.filter((hobby) => hobby.doneToday)
        },
        hobbiesNotDoneToday(state) {
            return state.hobbies.filter((hobby) => !hobby.doneToday)
        },
        filteredHobbies(state) {
            if (this.filter === 'doneToday') {
                return this.hobbiesDoneToday
            } else if (this.filter === 'notDoneToday') {
                return this.hobbiesNotDoneToday
            }
            return this.hobbies
        }
    }, */
    actions: {
        addHobby(text) {
            this.hobbies.push({text, id: this.nextId++, doneToday: false});
            this.persistToLocalStorage();
        },
        removeHobby(hobbyID) {
            this.hobbies = this.hobbies.filter(hobby => hobby.id !== hobbyID);
            this.persistToLocalStorage();
        },
        persistToLocalStorage() {
            localStorage.setItem("hobbies", JSON.stringify(this.hobbies));
        },
    }
})