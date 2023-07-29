<template>
  <div class="card">

    <div class="card-header bg-white d-flex justify-content-between align-items-center">
      {{ title }}
      <slot name="header" />
    </div>

    <div class="card-body">
      <slot/>
    </div>

    <div v-if="$slots.footer" class="card-footer bg-white p-0">
      <div class="col-12 d-flex justify-content-end p-2">
        <slot name="footer"/>
      </div>
    </div>

  </div>
</template>

<script setup>

defineProps({
  title: String,
  btn_name: String
})
</script>

<style scoped>

</style>