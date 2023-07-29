<template>
  <div class="dropdown" :class="IsIconType">
    <slot name="dropBtn"></slot>
    <slot name="menu">
      <slot></slot>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  dropdown: {
    type: String,
  },
  design: {
    type: String,
  },
});
//ternary condition
/*const DropDownIconStyleCheck =
  props.dropdown === "icon" &&
  props.design === "mix-white" &&
  "position-relative";*/
//provide props that sends from here to children
provide("dropdown", props.dropdown);
provide("design", props.design);

const IsIconType = props.dropdown === 'icon' ? 'drop-down-width-icon':'drop-down-width-complete';
</script>

<style scoped>
.drop-down-width-complete {
  min-width: 160px;
}
.drop-down-width-icon{
  width: fit-content;
  height: fit-content;
}
</style>
