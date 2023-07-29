<template>
  <div>
    <label class="d-block mb-1">{{ title }}</label>
    <div class="p-2 rounded parent" :class="'bg-'+color">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: ['title', 'color'],
}
</script>

<style scoped>
.parent{
  min-height: 40px !important;
}
</style>