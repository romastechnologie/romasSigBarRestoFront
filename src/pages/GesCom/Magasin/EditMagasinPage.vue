<template>
    <EditMagasin />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditMagasin from '@/components/GesCom/Magasin/EditMagasin.vue';

export default defineComponent({
    name: "EditMagasinPage",
    components: {
        EditMagasin
    },
});
</script>

<style scoped></style>
