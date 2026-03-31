<template>
	<div class="card card-flush h-md-100">
	  <div class="card-header">
		<div class="card-title">
		  <h2>{{ nom }}</h2>
		</div>
	  </div>
	  <div class="card-body pt-1">
		<div class="fw-bolder text-gray-600">Total des permissions pour ce rôle: {{ privileges?.length }}</div>
		<table class="table">
		  <tbody>
			<tr v-for="(description, index) in filteredDescriptions" :key="index">
			 {{ description }}
			</tr>
			<tr v-if="showMore">
			  <p class="text-center">et {{ number - 4 }} de plus...</p>
			</tr>
		  </tbody>
		</table>
	  </div>
	  <div class="card-footer flex-wrap pt-2">
		<router-link :to="{ name: 'ViewRolePage', params: { id: id } }" class="default-btn me-2 text-white btn bg-success btn-md">
		  <i class="fa fa-eye lh-3 position-relative top-1"></i>
		</router-link>
		<router-link :to="{ name: 'EditRolePage', params: { id: id } }" class="btn btn-md btn-primary my-1 me-2">
		  <i class="fa fa-pencil lh-3 position-relative top-1"></i>
		</router-link>
		<button type="button" @click="$emit('delete')" class="btn btn-md btn-danger btn-active-danger my-1">
		  <i class="fa fa-trash lh-3 position-relative top-1"></i> 
		</button>
	  </div>
	</div>
  </template>
  
  <script lang="ts">
  import type { RolePermission } from "@/models/Role";
  import { defineComponent } from "vue";
  
  export default defineComponent({
	name: "RoleCard",
	props: {
	  id: {
		type: Number,
		required: true,
	  },
	  nom: {
		type: String,
		required: true,
	  },
	  number: {
		type: Number,
		required: true,
		default: 0
	  },
	  privileges: Array as () => Array<RolePermission>,
	},
	computed: {
	  filteredDescriptions(): Array<string> {
		return this.privileges
		  .filter((pri, index) => index < 4)
		  .map(pri => pri.permission ? pri.permission.description : 'Description non disponible');
	  },
	  showMore(): boolean {
		return this.number > 4;
	  }
	}
  });
  </script>
  
  <style scoped>
  /* Style pour les cellules du tableau avec débordement */
  .overflow-cell {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
  }
  </style>
  