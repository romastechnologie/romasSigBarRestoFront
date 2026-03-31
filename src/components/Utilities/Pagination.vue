<template>
    <p class="mb-0 text-paragraph">
        <span v-if="totalElements>0">
          Affichage de <span class="fw-bold">{{ ((page-1) * limit) + 1  }}</span> 
          à <span class="fw-bold">{{ ((limit * page) > totalElements) ? totalElements : (limit * page) }}</span>
          sur <span class="fw-bold">{{ totalElements }}</span>  enregistrement(s)
        </span>
        <span v-else>
            Aucun enregistrement trouvé
        </span>
    </p>
    <nav class="mt-15 mt-md-0">
        <ul class="pagination mb-0">
        <li class="page-item" :class="{disabled:page === 1 }">
            <a class="page-link" href="javascript:;" aria-label="Previous"
            @click="pagination(page-1, limit)">
            <i class="fa fa-angle-left"></i>
            </a>
        </li>
        <li v-for="n in pageNumbers" :key="n" @click="pagination(n, limit)" class="page-item">
            <a :class="{ active: n === page }" class="page-link" href="javascript:;">{{ n }}</a>
        </li>
        <li class="page-item" :class="{disabled:page === totalPages }">
            <a class="page-link " href="javascript:;" aria-label="Next"
            @click="pagination(page+1, limit)">
            <i class="fa fa-angle-right"></i>
            </a>
        </li>
        </ul>
    </nav>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'PaginationComponent',
    emits: ['paginate'],
  props: ['page', 'totalPages', 'limit','totalElements'],
  setup(props, { emit }) {
    const pageNumbers = computed(() => {
      let numbers = [];
      let start = props.page - 2 > 0 ? props.page - 2 : 1;
      let end = props.page + 2 <= props.totalPages ? props.page + 2 : props.totalPages;

      if (start > 1) {
        numbers.push('<<', 1, '...');
      }

      for (let i = start; i <= end; i++) {
        numbers.push(i);
      }

      if (end < props.totalPages) {
        numbers.push('...', props.totalPages, '>>');
      }

      return numbers;
    });

    const pagination = (page_, limit_) => {
      // emit('paginate', { page_, limit_ });
      // if (typeof page_ === 'number') {
      //   emit('paginate', { page_, limit_ });
      // }
      if (typeof page_ === 'string') {
        switch (page_) {
          case '<<':
            emit('paginate', { page_: 1, limit_ });
            break;
          case '>>':
            emit('paginate', { page_: props.totalPages, limit_ });
            break;
        }
      } else if (typeof page_ === 'number') {
        emit('paginate', { page_, limit_ });
      }

    };

    return { pageNumbers, pagination };
  },
};
</script>