<template>
  <div class="product-names" v-if="fileUrl">
    <div class="light-product-box">
      <a href="#" data-bs-toggle="modal" :data-bs-target="'#imageModal' + keyValue">
        <img :src="imageUrl" class="img-fluid thumbnail" :alt="libelle" />
      </a>
    </div>
  </div>
  <div class="product-names" v-else>
    <div class="light-product-box">
      <vue-feather type="camera-off"></vue-feather>
    </div>
  </div>
  <div class="modal fade" :id="'imageModal' + keyValue" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="imageModalLabel">{{ libelle }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <inner-image-zoom :src="imageUrl" :zoomSrc="imageUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { getUrlApiForProductFiles } from "@/utils/utils";
import InnerImageZoom from 'vue-inner-image-zoom';

export default defineComponent({
  name: "ModalImage",
  components: {
    'inner-image-zoom': InnerImageZoom
  },
  props: {
    fileUrl: {
      type: String,
      default: null
    },
    keyValue: {
      type: [String, Number],
      default: null
    },
    libelle: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const fileUrl = props.fileUrl;
    // Utiliser une propriété calculée pour l’URL de l’image
    const imageUrl = computed(() => {
      return props.fileUrl ? getUrlApiForProductFiles(props.fileUrl) : '/default-image.jpg';
    });

    return {
      imageUrl,
      getUrlApiForProductFiles,
      fileUrl,
    };
  },
});
</script>

<style scoped>
.thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
}

.modal-body img {
  max-height: 70vh;
  object-fit: contain;
}
</style>