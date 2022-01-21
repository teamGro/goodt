<template>
    <div class="card card-manager" :key="person.id">
        <div class="card-avatar">
            <card-avatar :url="person.avatar"></card-avatar>
            <div class="card-comments" v-if="person.comments && person.comments.length">
                {{ person.comments.length }}
            </div>
        </div>

        <div class="card-data">
            <div class="card-name">
                <b>{{ person.name }}</b>
            </div>
            <div class="card-email">{{ person.email }}</div>
        </div>

        <div class="action-btn-wrapper">
            <button class="action-btn" @click="onEditPerson(person)">edit</button>
        </div>
    </div>
</template>

<script>
import personCardMixin from '@/mixins/personCardMixin';

export default {
    mixins: [personCardMixin]
};
</script>

<style>
.card-manager {
    color: #fff;
    background-color: gray !important;
}
</style>
