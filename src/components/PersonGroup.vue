<template>
    <div class="person-group">
        <h2 class="person-group-title">{{ positionName }}</h2>
        <ul class="person-group__list list">
            <li v-for="person in persons" :key="person.id" class="person-group__item">
                <PersonCard
                    :person="person"
                    :isEdit.sync="localEdit"
                    :editingPerson.sync="localEditingPerson"
                    v-if="person.position !== 'Manager'" />
                <PersonCardManager
                    :person="person"
                    :isEdit.sync="localEdit"
                    :editingPerson.sync="localEditingPerson"
                    v-else />
            </li>
        </ul>
    </div>
</template>

<script>
import PersonCard from './PersonCard.vue';
import PersonCardManager from './PersonManagerCard.vue';

export default {
    components: { PersonCard, PersonCardManager },
    props: ['persons', 'isEdit', 'editingPerson'],
    computed: {
        positionName() {
            return this.persons[0].position || '';
        },
        localEdit: {
            get() {
                return this.isEdit;
            },
            set(val) {
                this.$emit('update:isEdit', val);
            }
        },
        localEditingPerson: {
            get() {
                return this.editingPerson;
            },
            set(val) {
                this.$emit('update:editingPerson', val);
            }
        }
    }
};
</script>

<style lang="pcss" scoped>
.person-group {
    &-title {
        margin-bottom: 1rem;
        font-weight: 700;
        font-size: 25px;
    }

    &__list {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    &__item {
        width: calc(100% / 3 - 0.7rem);
    }
}
</style>