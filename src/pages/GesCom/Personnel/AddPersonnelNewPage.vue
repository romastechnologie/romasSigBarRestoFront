<template>
   
  <AddPersonnelContent/>
                       
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AddPersonnelContent from "@/components/GesCom/Personnel/AddPersonnelContent.vue";
export default defineComponent({
    name: "AddPersonnelNewPage",
    components: {
        AddPersonnelContent,
    },
  });
</script>