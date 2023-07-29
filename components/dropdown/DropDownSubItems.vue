<template>
  <nuxt-link :to="link" class="dropdown-item item-link p-0" :class="{'position-relative' : IsIconMixWhite}">
    <li
      class="d-flex align-items-center justify-content-start position-relative"
      :class="MenuItemsStyleCheck(dropdownType, dropdownStyle)"
    >
      <i :class="icon"></i>
      <span v-if="!$slots.default">{{ name }}</span>
      <div class="wrapper w-100" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="hover-element position-absolute"></div>
    </li>
  </nuxt-link>
</template>

<script setup>
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
// injection props
const dropdownType = inject("dropdown");
const dropdownStyle = inject("design");

//switch design check
const MenuItemsStyleCheck = (dropdownType, dropdownStyle) => {
  switch (true) {
    case dropdownType === "complete" && dropdownStyle === "mix-secondary":
      return "item-complete-mix-secondary";
    case dropdownType === "complete" && dropdownStyle === "mix-white":
      return "item-complete-mix-white";
    case dropdownType === "complete" && dropdownStyle === "separate-secondary":
      return "item-complete-separate-secondary";
    case dropdownType === "complete" && dropdownStyle === "separate-white":
      return "item-complete-separate-white";
    case dropdownType === "icon" && dropdownStyle === "mix-secondary":
      return "item-icon-mix-secondary";
    case dropdownType === "icon" && dropdownStyle === "mix-white":
      return "item-icon-mix-white";
    case dropdownType === "icon" && dropdownStyle === "separate-secondary":
      return "item-icon-separate-secondary";
    case dropdownType === "icon" && dropdownStyle === "separate-white":
      return "item-icon-separate-white";
    case dropdownType === "icon" && dropdownStyle === "table":
      return "item-icon-separate-table";
    default:
      console.log("wrong value");
      break;
  }
};
</script>

<style lang="scss" scoped>
@import "public/css/_colors.scss";
/* IMPORTANT : used BEM(Block , Element , Modifier) and Hyphen Delimited Strings methods for naming css classes */

.item-link {
  font-size: 14px;
}
.item-link > li > :slotted(i) {
  font-size: 18px;
}
html[dir="rtl"] .item-link > li > :slotted(i) {
  margin-left: 10px;
}

html[dir="ltr"] .item-link > li > :slotted(i) {
  margin-right: 10px;
}

.dropdown[dir="rtl"]{
  li{
    padding: 10px 9px 10px 16px;
  }
  span{
    margin-right: auto;
  }
}
.dropdown[dir="ltr"]{
  li{
    padding: 10px 16px 10px 9px;
  }
  span{
    margin-left: auto;
  }
}
html[dir="rtl"] li {
  padding: 10px 16px 10px 9px;
}
html[dir="ltr"] li {
  padding: 10px 9px 10px 16px;
}
.hover-element {
  width: calc(100% - 15px);
  height: 90%;
  right: 0;
  left: 0;
  margin: 0 auto 0 auto;
  border-radius: 7px;
  z-index: -200;
  transition: all 0.3s;
}
/*
      description : We have 2 types of dropdown ( complete , icon ) ,
      and 4 styles for each ( mix-white , mix-secondary , separate-white , separate-secondary)
*/

.item-complete-mix-secondary{
  color: map-get($themeColors, gray02);
}
.item-complete-mix-secondary > :slotted(i) {
  color: map-get($themeColors, gray03);
}
.item-complete-mix-secondary:hover .hover-element {
  background-color: map-get($themeColors, white);
}

.item-complete-mix-white{
  color: map-get($themeColors, gray01);
}
.item-complete-mix-white> :slotted(i) {
  color: map-get($themeColors, gray03);
}
.item-complete-mix-white:hover .hover-element {
  background-color: map-get($themeColors, secondary);
}

.item-complete-separate-secondary {
  color: map-get($themeColors, gray02);
}
.item-complete-separate-secondary > :slotted(i) {
  color: map-get($themeColors, gray03);
}
.item-complete-separate-secondary:hover .hover-element {
  background-color: map-get($themeColors, secondary);
}

.item-complete-separate-white {
  color: map-get($themeColors, gray01);
}
.item-complete-separate-white > :slotted(i) {
  color: map-get($themeColors, gray03);
}
.item-complete-separate-white:hover .hover-element {
  background-color: map-get($themeColors, secondary);
}

.item-icon-separate-white {
  color: map-get($themeColors, gray02);
}
.item-icon-separate-white:hover .hover-element {
  background-color: map-get($themeColors, secondary);
}

.item-icon-separate-secondary {
  color: map-get($themeColors, gray02);
}
.item-icon-separate-secondary:hover .hover-element {
  background-color: map-get($themeColors, secondary);
}

.item-icon-mix-secondary{
  color: map-get($themeColors, gray02);
}
.item-icon-mix-secondary:hover .hover-element{
  background-color: map-get($themeColors, white);
}

.item-icon-mix-white{
  color: map-get($themeColors, gray02);
}
.item-icon-mix-white:hover .hover-element{
  background-color: map-get($themeColors, secondary);
}

.item-icon-separate-table{
  color: map-get($themeColors , gray02);
  text-align: center;
  padding: 8px 0 !important;
}
.item-icon-separate-table:hover .hover-element{
  background-color: map-get($themeColors , secondary);
}
</style>
