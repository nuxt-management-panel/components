<template>
  <div>
    <ul class="pagination">
      <!--      <li :class="{ 'disabled': currentPage === 1 }">
              <a href="#" @click.prevent="setCurrentPage(1)">First</a>
            </li>-->

      <li :class="{ 'disabled': currentPage === 1 }">
        <a href="#" @click.prevent="setCurrentPage(currentPage - 1), $emit('page', currentPage)"><i
            class="fa-solid fa-angle-left"></i></a>
      </li>
       <li v-if="currentPage > 2 && totalPages > 4"
          @click.prevent="setCurrentPage(1),$emit('page', currentPage )" class="total-page">
        <a>1</a>
      </li>
      <li v-if=" currentPage > 3"
          class="dots">...
      </li>

      <li v-for="page in pagesToShow"
          :key="page"
          :class="[{ 'active': page === currentPage }, $props.rounded  ? 'circle': null, $props.primary ? 'set-primary' : null, $props.outLined ? 'out-lined' : null]">
        <a href="#" @click.prevent="setCurrentPage(page), $emit('page', currentPage)">{{ page }}</a>
      </li>
      <li v-if="currentPage === totalPages - 2 && totalPages > 4" @click.prevent="setCurrentPage(totalPages)">
        <a>{{ totalPages }}</a>
      </li>
      <li v-if="totalPages > 4 && currentPage !== totalPages - 1 && currentPage !== totalPages && currentPage !== totalPages - 2 "
          class="dots">...
      </li>
      <li v-if="totalPages > 4 && currentPage !== totalPages - 1 && currentPage !== totalPages && currentPage !== totalPages - 2 "
          @click.prevent="setCurrentPage(totalPages),$emit('page', currentPage )" class="total-page">
        <a>{{ totalPages }}</a>
      </li>

      <li :class="{ 'disabled': currentPage === totalPages }">
        <a href="" @click.prevent="setCurrentPage(currentPage + 1), $emit('page', currentPage )"><i
            class="fa-solid fa-angle-right"></i></a>
      </li>
      <!--      <li :class="{ 'disabled': currentPage === totalPages }">
              <a href="#" @click.prevent="setCurrentPage(totalPages)">Last</a>
            </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    maxPagesToShow: {
      type: Number,
      default: 3
    },
    primary: Boolean,
    rounded: Boolean,
    outLined: Boolean,
    nextPage: String,
    previousPage: String
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    pagesToShow() {
      let pages = [];

      if (this.totalPages <= 4) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        let leftOffset = Math.floor(this.maxPagesToShow / 2);
        let rightOffset = this.maxPagesToShow - leftOffset - 1;

        if (this.currentPage <= leftOffset + 1) {
          pages = [1, 2, 3];
        } else if (this.currentPage >= this.totalPages - rightOffset) {
          pages = [
            this.totalPages - 2,
            this.totalPages - 1,
            this.totalPages
          ];
        } else {
          pages = [
            this.currentPage - leftOffset,
            this.currentPage,
            this.currentPage + rightOffset
          ];
        }
      }

      return pages;
    }
  },
  methods: {
    setCurrentPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  },
};

</script>


<style lang="scss" scoped>
@import "public/css/_colors.scss";

ul {
  direction: ltr !important;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.pagination li {

  margin: 0 8px;
  width: 32px;
  height: 32px;
}

.pagination li a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  border: none !important;
  color: map-get($themeColors, gray01);
}

.pagination li.disabled a {
  color: map-get($themeColors, gray02);
  cursor: not-allowed;
}

.pagination li.disabled a:hover {
  color: map-get($themeColors, gray02) !important;
  cursor: not-allowed;
}

.pagination li.active a {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 7px;
  background-color: map-get($themeColors, secondary);
  color: map-get($themeColors, gray02);
}

.pagination li.active.set-primary a {
  background-color: map-get($themeColors, primary) !important;
  color: white;
}

.pagination li.active.circle a {
  border-radius: 100px !important;
}

.pagination li.active.out-lined a {
  border: 2px solid map-get($themeColors, primary) !important;
  background-color: white !important;
  color: map-get($themeColors, primary) !important;
}

.total-page {
  cursor: pointer;
  margin-left: 0px !important;
}

.dots {
  display: flex;
  justify-content: center;
}

</style>
