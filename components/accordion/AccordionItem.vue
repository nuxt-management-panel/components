<template>
  <div class="accordion-item" :class="border === 'border'?'':border">
    <AccordionHeader :name="name" :design="design" :border="border" :index="randomIndexDataTarget"/>
    <AccordionBody :index="randomIndexDataTarget">
      <slot></slot>
    </AccordionBody>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  name:{
    type:String,
    required:true,
  },
  design:{
    type:String,
    required:true,
  },
  border:{
    type:String,
    required:true,
  }
})
/* make a random and unique number for each accordion item */
const randomIndexDataTarget = ref(null);
randomIndexDataTarget.value = Math.floor((Math.random() * 100000) + 1);
</script>

<style lang="scss" scoped>
@import "/public/css/_colors.scss";
$gray04:map-get($themeColors,gray04);
.border-margin{
  border: 1px solid $gray04 !important;
  margin-bottom: 12px !important;
  border-radius: 7px !important;
}
.border-margin .accordion-header .accordion-button{
  border: none !important;
}

.border-margin-none , .border-margin-none .accordion-header .accordion-button{
  border: none !important;
  margin-bottom: 12px !important;
}
</style>