<template>
  <ul
    class="menu menu--width dropdown-menu--page-direction dropdown-menu"
    :class="
      MenuStyleCheck(dropdownType, dropdownStyle),
      divider === true ? 'pt-0 pb-2' : 'py-2'
    "
    :dir="dir"
  >
    <div
      class="divider text-gray02 d-flex flex-row p-3"
      v-if="divider"
      :class="DividerBorderCheck"
    >
      <span class="divider_span">{{ divider_name }}</span>
    </div>
    <div class="scroll-section" :class="scroll === true && 'dropdown-scroll'">
      <slot></slot>
    </div>
    <div class="mask position-absolute" v-if="IsIconMixWhite"></div>
  </ul>
</template>

<script setup>

const props = defineProps({
  divider: {
    type: Boolean,
  },
  divider_border: {
    type: Boolean,
  },
  divider_name:{
    type:String
  },
  scroll:{
    type:Boolean,
  }
});

//injection props
const dropdownType = inject("dropdown");
const dropdownStyle = inject("design");

//switch design check
const MenuStyleCheck = (dropdownType, dropdownStyle) => {
  switch (true) {
    case dropdownType === "complete" && dropdownStyle === "mix-secondary":
      return "menu-complete-mix-secondary ";
    case dropdownType === "complete" && dropdownStyle === "mix-white":
      return "menu-complete-mix-white";
    case dropdownType === "complete" && dropdownStyle === "separate-secondary":
      return "menu-complete-separate-secondary";
    case dropdownType === "complete" && dropdownStyle === "separate-white":
      return "menu-complete-separate-white";
    case dropdownType === "icon" && dropdownStyle === "mix-secondary":
      return "menu-icon-mix-secondary";
    case dropdownType === "icon" && dropdownStyle === "mix-white":
      return "menu-icon-mix-white";
    case dropdownType === "icon" && dropdownStyle === "separate-secondary":
      return "menu-icon-separate-secondary";
    case dropdownType === "icon" && dropdownStyle === "separate-white":
      return "menu-icon-separate-white";
    case dropdownType === "icon" && dropdownStyle === "table":
      return "menu-icon-separate-table";
    default:
      console.log("wrong value");
      break;
  }
};
//ternary conditions
const DividerBorderCheck = props.divider_border === true && "border-bottom mb-2";
const IsIconMixWhite = dropdownType === 'icon' && dropdownStyle === 'mix-white';

</script>

<style scoped lang="scss">
@import "public/css/_colors.scss";
/* IMPORTANT : used BEM(Block , Element , Modifier) and Hyphen Delimited Strings methods for naming css classes */

.menu--width {
  width: 100%;
}
/*.menu--height{
  max-height: 50vh;
}*/
.divider{
  border-color: map-get($themeColors,gray04) !important;
}
.divider_span{
  font-size: 14px;
  font-weight: bold;
}
.mask{
  top: -2px;
  width: 41.5px;
  height: 3px;
  background-color: white;
}
.dropdown-menu--page-direction{
  margin-top: 0 !important;
  transform: none !important;
  top: 100% !important;
}
.dropdown[dir="ltr"]{
  .dropdown-menu--page-direction{
    left: 0 !important;
  }
  .mask{
    left: 0;
  }
  .divider{
    justify-content: end;
  }
}
.dropdown[dir="rtl"]{
  .dropdown-menu--page-direction{
    right: 0 !important;
  }
  .mask{
    right: 0;
  }
  .divider{
    justify-content: end;
  }
}
html[dir="rtl"]{
  .dropdown-menu--page-direction{
    right: 0 !important;
  }
  .mask{
    right: 0;
  }
  .divider{
    justify-content: start;
  }
}
html[dir="ltr"]{
  .dropdown-menu--page-direction{
    left: 0 !important;
  }
  .mask{
    left: 0;
  }
  .divider{
    justify-content: start;
  }
}
/*
      description : We have 2 types of dropdown ( complete , icon ) ,
      and 4 styles for each ( mix-white , mix-secondary , separate-white , separate-secondary)
*/
.menu-complete-mix-secondary {
  border: none;
  border-radius: 0 0 7px 7px;
  background-color: map-get($themeColors, secondary);
}

.menu-complete-mix-white {
  border-radius: 0 0 7px 7px;
  background-color: map-get($themeColors, white);
  border-color: map-get($themeColors, gray03);
  border-top: none !important;
}

.menu-complete-separate-secondary {
  border: none;
  border-radius: 7px;
  background-color: map-get($themeColors, white);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}
.menu-complete-separate-white {
  border-radius: 7px;
  border: none !important;
  background-color: map-get($themeColors, white);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}

.menu-icon-separate-white {
  border-color: map-get($themeColors, gray04);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}

.menu-icon-separate-secondary {
  border: none;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}
.menu-icon-mix-secondary{
  border: none;
  border-bottom-left-radius:7px;
  border-bottom-right-radius:7px;
  background-color: map-get($themeColors, secondary);
}
.dropdown[dir="rtl"] .menu-icon-mix-secondary{
  border-top-left-radius:7px;
  border-top-right-radius:0;
}
.dropdown[dir="ltr"] .menu-icon-mix-secondary{
  border-top-left-radius:0;
  border-top-right-radius:7px;
}
html[dir="rtl"] .menu-icon-mix-secondary{
  border-top-left-radius:7px;
  border-top-right-radius:0;
}
html[dir="ltr"] .menu-icon-mix-secondary{
  border-top-left-radius:0;
  border-top-right-radius:7px;
}
.menu-icon-mix-white{
  border-radius: 7px 0 7px 7px;
  border-color: map-get($themeColors,gray04);
}
.dropdown[dir="rtl"] .menu-icon-mix-white{
  border-top-left-radius:7px;
  border-top-right-radius:0;
}
.dropdown[dir="ltr"] .menu-icon-mix-white{
  border-top-left-radius:0;
  border-top-right-radius:7px;
}
html[dir="rtl"] .menu-icon-mix-white{
  border-top-left-radius:7px;
  border-top-right-radius:0;
}
html[dir="ltr"] .menu-icon-mix-white{
  border-top-left-radius:0;
  border-top-right-radius:7px;
}

.menu-icon-separate-table{
  min-width: 139px;
  border-radius: 7px;
  border: 1px solid map-get($themeColors , primary);
  top: 110% !important;
}

.dropdown-scroll{
  height: 100%;
  overflow-y: auto;
}
.dropdown-scroll::-webkit-scrollbar{
  width: 5px;
}
.dropdown-scroll::-webkit-scrollbar-thumb{
  background-color: map-get($themeColors , gray03);
  border-radius: 8px;
}

</style>
