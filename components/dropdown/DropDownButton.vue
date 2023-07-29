<template>
  <button
    class="btn dropdown-toggle d-flex align-items-center border"
    :class="
      BtnWidthCheck,
      BtnPaddingCheck,
      BtnStyleCheck(dropdownType, dropdownStyle)
    "
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i class="btn__icon" :class="icon , IconFontSizeCheck"></i>
    <span class="btn__text text-truncate" v-if="IsShowTextAndChevron">
      {{ name }}
    </span>
    <i
      class="btn__chevron fa-solid fa-chevron-down"
      v-if="IsShowTextAndChevron"
    ></i>
    <slot></slot>
  </button>
</template>

<script setup>
//props
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
// injection props
const dropdownType = inject("dropdown");
const dropdownStyle = inject("design");

//switch design check
const BtnStyleCheck = (dropdownType, dropdownStyle) => {
  switch (true) {
    case dropdownType === "complete" && dropdownStyle === "mix-secondary":
      return "btn-complete-mix-secondary";
    case dropdownType === "complete" && dropdownStyle === "mix-white":
      return "btn-complete-mix-white";
    case dropdownType === "complete" && dropdownStyle === "separate-secondary":
      return "btn-complete-separate-secondary";
    case dropdownType === "complete" && dropdownStyle === "separate-white":
      return "btn-complete-separate-white";
    case dropdownType === "icon" && dropdownStyle === "mix-secondary":
      return "btn-icon-mix-secondary";
    case dropdownType === "icon" && dropdownStyle === "mix-white":
      return "btn-icon-mix-white";
    case dropdownType === "icon" && dropdownStyle === "separate-secondary":
      return "btn-icon-separate-secondary";
    case dropdownType === "icon" && dropdownStyle === "separate-white":
      return "btn-icon-separate-white";
      case dropdownType === "icon" && dropdownStyle === "table":
      return "btn-icon-separate-table";
    default:
      console.log("wrong value");
      break;
  }
};

//ternary or one line condition
const BtnWidthCheck =
  dropdownType === "complete" ? "btn-complete--width" : "btn-icon--width";

const IsShowTextAndChevron = dropdownType === "complete";

const BtnPaddingCheck =
  dropdownType === "complete" ? "btn-complete--padding" : "btn-icon--padding";

const IconFontSizeCheck =
  dropdownType === "complete"
    ? "btn-complete__icon--fontsize"
    : "btn-icon__icon--fontsize";

/*const IsIconMixBorder =
    (dropdownType === "icon" && dropdownStyle === "mix-white")
    ? "position-absolute d-flex btn--position"
    : "d-flex";*/
</script>

<style scoped lang="scss">
@import "public/css/_colors.scss";
/* IMPORTANT : used BEM(Block , Element , Modifier) and Hyphen Delimited Strings methods for naming css classes */

/*general styles*/
.btn {
  transition: none;
}
.btn:active,
.btn:focus {
  box-shadow: none;
  border: none;
  outline: none;
}
.btn__text {
  font-size: 14px;
}
html[dir="rtl"] .btn__text {
  margin-left: 6px;
}
html[dir="ltr"] .btn__text {
  margin-right: 6px;
}
.btn__chevron {
  font-size: 16px;
}


/*btn font-size when dropdown is Icon or Complete*/
.btn-icon__icon--fontsize {
  font-size: 20px !important;
  margin: 0 !important;
}
.btn-complete__icon--fontsize {
  font-size: 18px;
}

/*dropdown arrow margin for rtl and ltr style*/
html[dir="rtl"] .btn__chevron {
  display: block;
  margin-right: auto;
}
html[dir="ltr"] .btn__chevron {
  display: block;
  margin-left: auto;
}

/* dropdown icon direction margin in rtl and ltr styles*/
html[dir="rtl"] .btn__icon {
  margin-left: 10px;
}
html[dir="ltr"] .btn__icon {
  margin-right: 10px;
}

/* padding when button is Icon or Complete */
html[dir="rtl"] .btn-complete--padding {
  padding: 10px 16px 10px 9px;
}
html[dir="ltr"] .btn-complete--padding {
  padding: 10px 9px 10px 16px;
}
.btn-icon--padding {
  padding: 10px 12px;
  color: map-get($themeColors, gray03);
}

/*dropdown width when dropdown is complete or icon*/
.btn-complete--width {
  width: 100%;
}
.btn-icon--width {
  width: auto;
}

/* dropdown Chevron icon transition styles*/
.dropdown-toggle::after {
  display: none;
}
.dropdown-toggle:not(.show) > i.btn__chevron {
  transform: rotate(0deg) !important;
  transition-duration: 400ms;
}
.dropdown-toggle.show > i.btn__chevron {
  transform: rotate(-180deg) !important;
  transition-duration: 400ms;
}

/*
      description : We have 2 types of dropdown ( complete , icon ) ,
      and 4 styles for each ( mix-white , mix-secondary , separate-white , separate-secondary)
*/

.btn-complete-mix-secondary {
  background-color: map-get($themeColors, secondary);
  color: map-get($themeColors, gray02);
  border: none !important;
  border-radius: 7px;
}

.btn-complete-mix-secondary.show {
  border-radius: 7px 7px 0 0;
}

.btn-complete-mix-secondary .btn__text {
  color: map-get($themeColors, gray01);
}

.btn-complete-mix-white {
  background-color: map-get($themeColors, white);
  color: map-get($themeColors, gray03);
  border-radius: 7px;
  border-color: map-get($themeColors, gray03) !important;
}

.btn-complete-mix-white.show {
  border-bottom: none !important;
  border-radius: 7px 7px 0 0;
}

.btn-complete-mix-white .btn__text {
  color: map-get($themeColors, gray01);
}

.btn-complete-separate-secondary {
  background-color: map-get($themeColors, secondary);
  color: map-get($themeColors, gray02);
  border: none !important;
  border-radius: 7px;
}

.btn-complete-separate-secondary .btn__text {
  color: map-get($themeColors, gray01);
}

.btn-complete-separate-white {
  background-color: map-get($themeColors, white);
  color: map-get($themeColors, gray03);
  border-radius: 7px;
  border-color: map-get($themeColors , gray03) !important;
}

.btn-complete-separate-white .btn__text {
  color: map-get($themeColors, gray01);
}

.btn-icon-separate-white {
  border-color: map-get($themeColors, gray04) !important;
}

.btn-icon-separate-secondary {
  background-color: map-get($themeColors, secondary);
  border: none !important;
}

.btn-icon-mix-secondary {
  background-color: map-get($themeColors, secondary);
  color: map-get($themeColors, gray03);
  border: none !important;
  border-radius: 7px;
}

.btn-icon-mix-secondary.show {
  border-radius: 7px 7px 0 0;
}

.btn-icon-mix-white {
  background-color: map-get($themeColors, white);
  color: map-get($themeColors, gray03);
  border-radius: 7px;
  border-color: map-get($themeColors, gray04) !important;
}

.btn-icon-mix-white.show {
  border-radius: 7px 7px 0 0;
  border-bottom: none !important;
}
.btn-icon-separate-table{
  background-color: map-get($themeColors, secondary);
  color: map-get($themeColors, gray03);
  border:1px solid map-get($themeColors, secondary) !important;
  border-radius: 7px;
  transition: all 0.4s;
}
.btn-icon-separate-table:focus{
  color:map-get($themeColors , primary);
  border:1px solid map-get($themeColors , primary) !important;
  background-color: map-get($lightColors , primary);
}
/*.btn--position{
  z-index: 200;
}*/
</style>
