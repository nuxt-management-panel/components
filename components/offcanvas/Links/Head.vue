<template>
  <div class="accordion-header" id="headingOne">
    <!-- title of each group in sidebar -->
    <div class="group-title" v-if="data.length !== 1">
      <span class="group-title-span">{{ groupItem }}</span>
    </div>
    <!-- links section -->
    <ul class="sidebar-list p-0">
      <div class="wrapper" v-for="(item,index) in menuItem" :style="index !== 0 && 'margin-top:5px;'">
        <NuxtLink :to="item.link" class="hyperlink-tag">
          <li class="accordion-button button-link collapsed d-flex align-items-center"
              :class="item.submenu.length !== 0 ? 'accordion-button--chevron' : 'accordion-button--not-chevron'"
              data-bs-toggle="collapse"
              :data-bs-target="'#collapse_' + componentIndex + '_' +index"
              aria-expanded="false" :aria-controls="'collapse_'+ componentIndex + '_' +index">
            <span v-if="item.icon.length !== 0" class="icon-section" v-for="x in item.icon"
                  style="width: 18px;height: 18px;">
                <span class="item-icon d-block" :class="x.class" style="width: 18px;height: 18px;">
                   <span v-for="y in x.parts" class="my-auto" :class="'path'+y"></span>
                </span>
            </span>
            <span>{{ item.name }}</span>
            <i class="fa-solid fa-chevron-down chevron-icon" v-if="item.submenu.length !== 0"></i>
          </li>
        </NuxtLink>
        <div class="sub-items-parent" v-if="item.submenu.length !== 0">
          <SubSet :id="'collapse_' + componentIndex + '_' + index" :subItems="item.submenu"></SubSet>
        </div>
      </div>
    </ul>
  </div>
</template>

<script setup>

import SubSet from "./SubSet";
import {ref , watch} from "vue";
import {useRoute} from 'vue-router';

const props = defineProps({
  groupItem: {
    type: String,
    required: true,
  },
  menuItem: {
    type: Array,
    required: true,
  },
  componentIndex: Number,
  data: {
    type: Array,
    required: true,
  }
})
/*//refrence
const route = useRoute();
const currentPath = ref('');
currentPath.value = route.path;

onMounted(() => {
  console.log('onMounted-Head')
  $('.hyperlink-faculty').each((index , el)=> {
    if ($(el).attr("href") === currentPath.value){
      $('.accordion-button--not-chevron').addClass('button-focus')
    }

  })
})
onActivated(()=>{
  console.log('onUpdated-Head')
})*/
</script>

<style scoped lang="scss">
@import "public/css/_colors.scss";
@import "public/css/icons.scss";
/* global styles */
.wrapper {
  background-color: transparent;
}
.wrapper a {
  cursor: pointer;
}

.accordion-button::after {
  display: none;
}

.button-link {
  font-size: 14px;
}

.button-link:focus, .button-link:active {
  box-shadow: none !important;
}

.item-icon {
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
}

html[dir="rtl"] .icon-section {
  margin-left: 6px;
}

html[dir="ltr"] .icon-section {
  margin-right: 6px;
}

.group-title {
  display: flex;
  margin-bottom: 8px;
}

.group-title-span {
  font-size: 12px;
  color: map-get($themeColors, gray02);
}

html[dir="rtl"] .group-title-span {
  margin-left: auto;
}

.accordion-button:not(.collapsed) {
  color: inherit;
  background-color: transparent;
  box-shadow: none;
}


/* each item of accordion style */
.accordion-button {
  border-radius: 7px;
  transition: all 0.3s !important;
  background-color: transparent !important;
}

.accordion-button span {
  color: map-get($themeColors, gray01);
  transition: all 0.3s !important;
}

html[dir="rtl"] .accordion-button {
  padding: 11px 8px;
}

html[dir="ltr"] .accordion-button {
  padding: 11px 8px;
}

.accordion-button:not(.button-focus):hover {
  background-color: map-get($hoverColors, secondary) !important;
}

/* focus styles */
.button-focus {
  background-color: map-get($lightColors, primary) !important;
  color: map-get($themeColors, primary) !important;
  /*width: 0;*/
}
.button-focus span {
  color: map-get($themeColors, primary) !important;
}
/*.hyperlink-faculty:focus {
   outline: none !important;
   border: none !important;




}*/

/* chevron styles */
.chevron-icon {
  font-size: 12px;
  color: map-get($themeColors, gray02);
  transition: all 0.3s;
}

html[dir="rtl"] .chevron-icon {
  margin-right: auto;
}

html[dir="ltr"] .chevron-icon {
  margin-left: auto;
}

/*.accordion-button:not(.collapsed),
.accordion-button.collapsed {
  transition: all 0.3s;
}*/


.accordion-button:not(.collapsed) > .chevron-icon,
.accordion-button.collapsed > .chevron-icon {
  transition-duration: 400ms;
}
html[dir="rtl"] .accordion-button:not(.collapsed) > .chevron-icon {
  transform: rotate(0deg) !important;
}

html[dir="rtl"] .accordion-button.collapsed > .chevron-icon {
  transform: rotate(90deg) !important;
}

html[dir="ltr"] .accordion-button:not(.collapsed) > .chevron-icon {
  transform: rotate(0deg) !important;
}

html[dir="ltr"] .accordion-button.collapsed > .chevron-icon {
  transform: rotate(-90deg) !important;
}
</style>