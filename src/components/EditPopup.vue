<template>
    <ui-popup>
        <template #header>
            <h3>Имя Фамилия Сотрудника</h3>
            <input type="hidden" v-model="person.id" />
        </template>
        <template #body>
            <div class="form">
                <div class="form-elem">
                    <label class="form-elem-label">name</label>
                    <input
                        type="text"
                        v-model="person.name"
                        ref="name"
                        :class="{ 'form-elem-input-error': errors.name }" />
                </div>
                <div class="form-elem">
                    <label class="form-elem-label">email</label>
                    <input
                        type="email"
                        v-model="person.email"
                        ref="email"
                        :class="{ 'form-elem-input-error': errors.email }" />
                </div>
                <div class="form-elem">
                    <label class="form-elem-label">position</label>
                    <select ref="position" v-model="person.position">
                        <option v-for="(value, i) in positions" :key="i" :value="value">{{ value }}</option>
                    </select>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="popup-btn-group">
                <button class="outline" @click="onPersonEdit($event)" ref="cancel">Отменить</button>
                <button
                    :class="{ 'btn-disabled': checkPersonInfo }"
                    @click="onPersonEdit($event)"
                    ref="save"
                    :disabled="checkPersonInfo">
                    Сохранить
                </button>
            </div>
        </template>
    </ui-popup>
</template>

<script>
import UiPopup from './Popup.vue';
const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export default {
    props: ['editingPerson', 'positions', 'cancel', 'isPersonEditMode'],
    components: { UiPopup },
    data() {
        return {
            errors: {}
        };
    },
    methods: {
        onPersonEdit(e) {
            let isError = false;
            this.errors = {};

            const fullName = this.person.name.split(' ');
            if (
                fullName.length < 2 ||
                fullName[0].length < 2 ||
                fullName[1].length < 2 ||
                !isNaN(fullName[0].charAt(0)) ||
                !isNaN(fullName[1].charAt(0))
            ) {
                this.errors.name = true;
                isError = true;
            }

            if (!emailRegEx.test(this.person.email)) {
                this.errors.email = true;
                isError = true;
            }

            if (!isError) {
                if (this.$refs.save === e.target) {
                    this.$emit('personEdit', { ...this.person });
                } else {
                    if (
                        this.person.name === this.editingPerson.name &&
                        this.person.email === this.editingPerson.email &&
                        this.person.position === this.editingPerson.position
                    ) {
                        this.$emit('update:isPersonEditMode', false);
                        return;
                    }
                    this.$emit('cancel', true);
                }
            }
        }
    },
    computed: {
        checkPersonInfo() {
            if (this.person.name.length === 0 || this.person.email.length === 0) {
                return 'disabled';
            }
            return false;
        },
        person() {
            return Object.assign({}, this.editingPerson);
        }
    }
};
</script>

<style>
.btn-disabled {
    cursor: not-allowed;
}
</style>