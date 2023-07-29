<template>
  <small class="d-inline-flex align-items-center small bg-white rounded mx-2 px-2">
    <i @click="$emit('remove')" class="fa-solid fa-xmark text-secondary pe-2 cursor"></i>
    <span>{{ title }}</span>
    <span v-if="span" class="text-secondary small mx-1">({{ title }})</span>
  </small>
</template>

<script>
export default {
  name: "Tag",
  props: ['title', 'span']
}
</script>

<style scoped>

</style>