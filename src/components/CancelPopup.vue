<template>
    <ui-popup>
        <template #header>
            <h3>Все несохраненные изменения будут утеряны. Вы уверены?</h3>
        </template>
        <template #body></template>
        <template #footer>
            <div class="popup-btn-group">
                <button class="outline" @click="onBack">Назад</button>
                <button @click="onContinue">Продолжить</button>
            </div>
        </template>
    </ui-popup>
</template>

<script>
import UiPopup from './Popup.vue';

export default {
    components: { UiPopup },
    props: ['isCanceled', 'isEditMode'],
    methods: {
        onBack() {
            this.$emit('update:isCanceled', false);
        },
        onContinue() {
            this.$emit('update:isCanceled', false);
            this.$emit('update:isEditMode', false);
        }
    }
};
</script>