<template>
  <div :id="'collapseOne_'+index" class="accordion-collapse collapse" aria-labelledby="headingOne"
       :data-bs-parent="'#accordionExample_'+randomIndexDataParent">
    <div class="accordion-body">
      <div class="slotsection py-2 px-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  index: String,
})

const randomIndexDataParent = inject('randomIndexDataParent');
</script>

<style scoped>

</style>