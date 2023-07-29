<template>
  <OverlayScrollbarsComponent
      :options="scrollOptions"
      defer
  >
    <div class="scroll-bar position-relative">
      <div class="accordion test" id="accordionExample">
        <div class="accordion-item border-0" v-for="(item , index) in data"
             :class="index !== 0 ? 'accordion-item--margin':''">
          <Head :groupItem="item.group" :componentIndex="index" :menuItem="item.menu" :data="data"/>
        </div>
      </div>
    </div>
  </OverlayScrollbarsComponent>
</template>

<script setup>

import Head from "./Links/Head";
const data = inject('data');
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import 'overlayscrollbars/overlayscrollbars.css';
import 'public/css/scrollbar-sidebar.scss';
const scrollOptions = {
  showNativeOverlaidScrollbars:true,
  scrollbars:{
    visibility: 'visible',
    autoHide:'never',
    theme:'scrollbar-sidebar',
  }
}
</script>

<style scoped lang="scss">
@import "public/css/_colors.scss";
.accordion{
  --bs-accordion-border-radius: 0 !important;
}
.scroll-bar {
  height: calc(100vh - 143px);
  padding:0 16px;
  scrollbar-width:none;
}
.accordion-item--margin {
  margin-top: 32px;
}
.item2 {
  padding: 16px 20px 16px 20px;
}
.item2 span {
  font-size: 15px;
}
</style>