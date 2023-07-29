<template>
  <div>
    <div class="my-4 rounded cursor text-muted">
      <NuxtLink :to="item.link" class="item"
                :class="(item.link === currentPath || isActive) ? 'main-color' : 'text-muted'">
        <h6 class="item" data-bs-toggle="collapse" :data-bs-target="'#collapse_'+index">
          <img v-if="item.link === currentPath || isActive" :src="'/icons/'+item.icon+'-e.svg'" width="20" height="20"
               class="me-2" alt="">
          <img v-else :src="'/icons/'+item.icon+'-d.svg'" width="20" height="20" class="me-2" alt="">
          {{ item.name }}
          <svg v-if="item.submenu.length !== 0" xmlns="http://www.w3.org/2000/svg" width="13" height="13"
               fill="currentColor"
               class="bi bi-chevron-left float-end mt-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </h6>
      </NuxtLink>


      <div v-if="item.submenu.length !== 0" class="collapse sub mt-3 ms-3" :class="{'show':isActive}"
           :id="'collapse_'+index">
        <ul class="btn-toggle-nav list-unstyled ms-2 pb-1 small">
          <li v-for="item in item.submenu" class="nav-item text-muted mb-1">
            <NuxtLink :to="item.link"
                      :class="(item.link === currentPath) ? ['main-color',isActive = true] : ['text-muted']">
              - {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  props: ['item', 'index', 'currentPath'],
  data() {
    return {
      isActive: false
    }
  },

}

</script>

<style scoped>

</style>