<template>
    <div id="app">
        <div class="search-bar">
            <input type="text" class="search-input" v-model="searchString" placeholder="Search by first/last" />
        </div>

        <ul class="persons-list">
            <li v-for="(persons, i) in filteredPersons" :key="i">
                <PersonGroup :persons="persons" :isEdit.sync="isPersonEditMode" :editingPerson.sync="editingPersonId" />
            </li>
        </ul>

        <EditPopup
            v-if="isPersonEditMode"
            :editingPerson="editingPerson"
            :positions="positions"
            :cancel="isCanceled"
            :isPersonEditMode.sync="isPersonEditMode"
            @personEdit="updatePersonInfo($event)"
            @cancel="showCancelPopup" />

        <CancelPopup v-if="isCanceled" :isCanceled.sync="isCanceled" :isEditMode.sync="isPersonEditMode" />
    </div>
</template>
<script>
import ApiService from './api/service.js';
import EditPopup from './components/EditPopup.vue';
import CancelPopup from './components/CancelPopup.vue';
import CardAvatar from './components/Avatar.vue';
import PersonGroup from '@/components/PersonGroup.vue';
import persons from './api/data';

const apiService = new ApiService();

export default {
    name: 'App',
    components: { EditPopup, CardAvatar, PersonGroup, CancelPopup },
    data: () => ({
        persons: persons,
        positions: [],
        isPersonEditMode: false,
        searchString: '',
        editingPersonId: null,
        isCanceled: false
    }),
    computed: {
        /**
         * @return {import('./api/service.js').Person[]}
         */
        filteredPersons() {
            if (!this.searchString) {
                return this.personsByGroup(this.persons);
            }
            const filterResult = [];
            this.persons.forEach((person) => {
                const fullName = person.name.split(' ');
                const email = person.email.split('@');

                if (fullName[0].toLowerCase().startsWith(this.searchString.toLowerCase())) {
                    filterResult.push(person);
                } else if (fullName[1].toLowerCase().startsWith(this.searchString.toLowerCase())) {
                    filterResult.push(person);
                } else if (email[0].toLowerCase().startsWith(this.searchString.toLowerCase())) {
                    filterResult.push(person);
                } else if (email[1].toLowerCase().startsWith(this.searchString.toLowerCase())) {
                    filterResult.push(person);
                }
            });

            return this.personsByGroup(filterResult);
        },
        editingPerson() {
            return this.persons.find((person) => person.id === this.editingPersonId);
        }
    },
    methods: {
        personsByGroup(persons) {
            const personsWithPosition = {};
            persons.forEach((person) => {
                if (personsWithPosition[person.position]) {
                    personsWithPosition[person.position].push(person);
                } else {
                    personsWithPosition[person.position] = [];
                    personsWithPosition[person.position].push(person);
                }
            });

            return personsWithPosition;
        },
        async fetchPersons() {
            const persons = await apiService.getPersons();
            const comments = await apiService.getComments();

            const normalizedPersons = persons.map((person) => {
                if (!this.positions.find((item) => item === person.position)) {
                    this.positions.push(person.position);
                }
                return {
                    ...person,
                    comments: comments.filter((comment) => comment.personId === person.id)
                };
            });

            this.persons = normalizedPersons;
        },
        updatePersonInfo(updatedPerson) {
            this.persons = this.persons.map((person) => {
                if (person.id === updatedPerson.id) {
                    return {
                        ...person,
                        name: updatedPerson.name,
                        email: updatedPerson.email,
                        position: updatedPerson.position
                    };
                }
                return {
                    ...person
                };
            });
            this.isPersonEditMode = !this.isPersonEditMode;
        },
        showCancelPopup() {
            this.isCanceled = !this.isCanceled;
        }
    },
    created() {
        this.fetchPersons();
    }
};
</script>

<style lang="pcss">
.persons-list {
    list-style: none;
}

.search-bar {
    margin-bottom: 1rem;
}

.search-input {
    cursor: pointer;
    width: 100%;
}
.person-group {
    margin-bottom: 2rem;

    &-name {
        margin-bottom: 1rem;
    }
}

.popup-btn-group {
    text-align: right;

    button {
        margin-left: 1rem;
    }
}

.action-btn {
    width: auto;
    height: auto;
    border-bottom: 1px dashed currentColor;
    box-shadow: none;
    padding: 0;

    font: inherit;
    color: var(--color-primary);
    font-size: var(--font-size-small);
    line-height: 1;
    cursor: pointer;

    background-color: transparent;
}
.list {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}

.form {
    width: 25rem;

    &-elem {
        margin-bottom: 1rem;

        &:last-child {
            margin-bottom: 0;
        }

        &-label {
            display: block;

            font-size: var(--font-size-small);
            text-transform: uppercase;
            opacity: 0.5;
        }
        &-input-error {
            border: 1px solid rgb(231, 93, 93);
        }
    }
}

.card {
    padding: 1rem;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);

    background: white;

    &-avatar {
        position: relative;
        margin-right: 1rem;

        &-email {
            font-size: var(--font-size-small);
        }

        &-email,
        &-name {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}

.card-email {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
