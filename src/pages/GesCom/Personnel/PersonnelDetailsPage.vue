<template>
    
<PersonnelDetailsContent/>
        
</template>
<script lang="ts">
    import { defineComponent } from "vue";
  
    import PersonnelDetailsContent from "@/components/GesCom/Personnel/PersonnelDetailsContent.vue";

    export default defineComponent({
      name: "PersonnelDetailsPage",
      components: {

        PersonnelDetailsContent,
      },
    });
  </script>