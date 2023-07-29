<template>
  <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" :class="'modal-'+size">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ title }}</h1>
          <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="body"/>
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import {onMounted} from "vue";

const props = defineProps({
  id: Int8Array,
  title: String,
  size: String,
})

const emit = defineEmits('object')

onMounted(() => {

  const modal = new bootstrap.Modal($('#' + props.id), {
    focus: false,
  })
  emit('object', modal)

})


</script>

<style scoped>

</style>