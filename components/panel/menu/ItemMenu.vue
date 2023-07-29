<template>
  <div class="nav-item mt-4 row dashboard parent">
    <img v-if="item === currentItem" :src="'/icons/'+item.icon+'-e.svg'" width="28" height="28"/>
    <img v-else :src="'/icons/'+item.icon+'-d.svg'" width="28" height="28"/>
    <span class="mt-2 text-center text" :class="(item === currentItem) ? 'main-color' : 'text-muted'">{{ item.name }}</span>
  </div>
</template>

<script>

export default {
  props: ['item', 'currentItem'],
}

</script>

<style scoped>


.parent {
  width: 100px;
}

.text {
  font-size: 12px;
}
</style>