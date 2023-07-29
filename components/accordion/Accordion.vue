<template>
  <div class="accordion" :id="'accordionExample_'+randomIndexDataParent">
    <slot></slot>
  </div>
</template>

<script setup>
import {ref} from "vue";

const randomIndexDataParent = ref(null);
randomIndexDataParent.value = Math.floor((Math.random() * 100000) + 1);
provide('randomIndexDataParent' , randomIndexDataParent.value);
</script>

<style scoped>

</style>