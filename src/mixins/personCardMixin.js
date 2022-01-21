import CardAvatar from '@/components/Avatar.vue';

const personCardMixin = {
    components: { CardAvatar },
    props: ['person', 'isEdit', 'editingPerson'],
    methods: {
        onEditPerson(person) {
            const isEdit = !this.isEdit;
            this.$emit('update:isEdit', isEdit);
            this.$emit('update:editingPerson', person.id);
        }
    }
};

export default personCardMixin;
