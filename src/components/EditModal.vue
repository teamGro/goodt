<template>
    <ui-popup v-if="isPersonEditMode">
        <template #header>
            <h3>Имя Фамилия Сотрудника</h3>
        </template>
        <template #body>
            <div class="form">
                <div class="form-elem">
                    <label class="form-elem-label">name</label>
                    <input type="text" :value="name" />
                </div>
                <div class="form-elem">
                    <label class="form-elem-label">email</label>
                    <input type="text" :value="email" />
                </div>
                <div class="form-elem">
                    <label class="form-elem-label">position</label>
                    <select>
                        <option v-for="value in positions" :key="value" :value="value">{{ value }}</option>
                    </select>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="popup-btn-group">
                <button class="outline" @click="onPersonEdit">Отменить</button>
                <button @click="onPersonEdit">Сохранить</button>
            </div>
        </template>
    </ui-popup>
</template>

<script>
import UiPopup from './Popup.vue';
export default {
    components: { UiPopup },
    props: ['name', 'email', 'isPersonEditMode'],
    methods: {
        onPersonEdit() {
            this.isPersonEditMode = !this.isPersonEditMode;
        }
    }
};
</script>