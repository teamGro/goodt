<template>
    <div class="card" :key="person.id">
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

<style lang="pcss">
.card {
    display: flex;

    &-data {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 1rem;
    }

    &-avatar {
        position: relative;
    }

    &-comments {
        box-sizing: border-box;
        position: absolute;
        top: -12.5px;
        right: -12.5px;

        width: auto;
        height: 25px;
        padding: 5px;

        color: #fff;
        line-height: 1;

        background-color: var(--color-primary);
    }
}

.action-btn-wrapper {
    margin-left: auto;
}
</style>