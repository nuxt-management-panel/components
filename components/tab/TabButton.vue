<template>
  <button ref="btnTab"
          class="link-nav d-flex  flex-row btn-fontsize p-0 w-auto position-relative align-items-center"
          :class="design,IndexCheckForActiveButton,DisabledCheckButton,hasTabButtonBorder"
          id="v-pills-profile-tab" data-bs-toggle="pill"
          :data-bs-target="`#v-pills-profile_` + targetIndex"
          type="button"
          role="tab"
          aria-controls="v-pills-profile"
          aria-selected="false"
  >
    <div class="IconAndText align-items-center w-100 d-flex" :class="VerticalCheck">
      <div class="tab-icon d-flex align-items-center justify-content-center"
           v-if="$slots.default"
      >
        <slot>
        </slot>
      </div>
      <div class="text-tab">
      <span>
      {{ name }}
    </span>
      </div>
    </div>
    <div class="rounded position-absolute p-0" :class="BorderStyle3Check"></div>
  </button>
</template>

<script setup>
//imports
import {ref} from "vue";

//props
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
  },
  vertical: {
    type: Boolean,
    required: true,
  },
  targetIndex: {
    type: String,
  }
})
const design = inject('design');
//ternary conditions
const IndexCheckForActiveButton = props.index === 0 && 'active';
const DisabledCheckButton = props.disabled === true && 'disabled-btn';
const VerticalCheck = props.vertical === true ? 'justify-content-start padding-vertical' : 'justify-content-center padding-horizontal';
const BorderStyle3Check = props.vertical === true ? 'underline-border-vertical' : 'underline-border-horizontal';
const hasTabButtonBorder = props.vertical === true && (design === 'tab-text-primary' || design === 'tab-underline-primary') && 'border-tab-button'
//set disabled attribute when disabled mode is true
const btnTab = ref(null)
onMounted(() => {
  if (props.disabled === true) {
    btnTab.value.setAttribute('disabled', '');
  }
})
/*const BorderStyle3Check = (verticalStyle, design) => {
  switch (true) {
    case design === "tab-text-" && dropdownStyle === "mix-secondary":
      return "btn-complete-mix-secondary";
  }
};*/


</script>

<style scoped lang="scss">
@import "public/css/_colors.scss";

/* general */
.border-tab-button{
  border-bottom: 1px solid map-get($themeColors , gray03);
}
/* normal styles */
.tab-primary {
  color: map-get($themeColors, gray01) !important;
}

.tab-primary.active {
  color: map-get($themeColors, white) !important;
  background-color: map-get($themeColors, primary) !important;
}

.tab-danger {
  color: map-get($themeColors, gray01) !important;
}

.tab-danger.active {
  color: map-get($themeColors, white) !important;
  background-color: map-get($themeColors, danger) !important;
}

.tab-warning {
  color: map-get($themeColors, gray01) !important;
}

.tab-warning.active {
  color: map-get($themeColors, white) !important;
  background-color: map-get($themeColors, warning) !important;
}

.tab-success {
  color: map-get($themeColors, gray01) !important;
}

.tab-success.active {
  color: map-get($themeColors, white) !important;
  background-color: map-get($themeColors, success) !important;
}

/* light styles */
.tab-light-primary {
  color: map-get($themeColors, gray01) !important;
}

.tab-light-primary.active {
  color: map-get($themeColors, primary) !important;
  background-color: map-get($lightColors, primary) !important;
}

.tab-light-danger {
  color: map-get($themeColors, gray01) !important;
}

.tab-light-danger.active {
  color: map-get($themeColors, danger) !important;
  background-color: map-get($lightColors, danger) !important;
}

.tab-light-warning {
  color: map-get($themeColors, gray01) !important;
}

.tab-light-warning.active {
  color: map-get($themeColors, warning) !important;
  background-color: map-get($lightColors, warning) !important;
}

.tab-light-success {
  color: map-get($themeColors, gray01) !important;
}

.tab-light-success.active {
  color: map-get($themeColors, success) !important;
  background-color: map-get($lightColors, success) !important;
}

/* text styles */
.tab-text-primary {
  color: map-get($themeColors, gray02) !important;
  border-radius: 0 !important;
  transition: none !important;
  /*border-bottom: 2px solid map-get($themeColors, gray04) !important;*/
}

.tab-text-primary.active {
  color: map-get($themeColors, primary) !important;
}

.tab-text-primary .underline-border-horizontal {
  display: none;
}

.tab-text-primary.active .underline-border-horizontal {
  display: block;
  background-color: map-get($themeColors, primary);
}

.tab-text-primary .underline-border-vertical {
  display: none;
}

.tab-text-primary.active .underline-border-vertical {
  display: block;
  background-color: map-get($themeColors, primary);
}

.tab-text-danger {
  color: map-get($themeColors, gray02) !important;
  border-radius: 0 !important;
  transition: none !important;
  /*border-bottom: 2px solid map-get($themeColors, gray04) !important;*/
}

.tab-text-danger .underline-border-horizontal {
  display: none;
}

.tab-text-danger.active {
  color: map-get($themeColors, danger) !important;
}

.tab-text-danger.active .underline-border-horizontal {
  display: block;
  background-color: map-get($themeColors, danger);
}

.tab-text-danger .underline-border-vertical {
  display: none;
}

.tab-text-danger.active .underline-border-vertical {
  display: block;
  background-color: map-get($themeColors, danger);
}

.tab-text-warning {
  color: map-get($themeColors, gray02) !important;
  border-radius: 0 !important;
  transition: none !important;
  /*border-bottom: 2px solid map-get($themeColors, gray04) !important;*/
}

.tab-text-warning.active {
  color: map-get($themeColors, warning) !important;
}

.tab-text-warning .underline-border-horizontal {
  display: none;
}

.tab-text-warning.active .underline-border-horizontal {
  display: block;
  background-color: map-get($themeColors, warning);
}

.tab-text-warning .underline-border-vertical {
  display: none;
}

.tab-text-warning.active .underline-border-vertical {
  display: block;
  background-color: map-get($themeColors, warning);
}

.tab-text-success {
  color: map-get($themeColors, gray02) !important;
  border-radius: 0 !important;
  transition: none !important;
  /*border-bottom: 2px solid map-get($themeColors, gray04) !important;*/
}

.tab-text-success.active {
  color: map-get($themeColors, success) !important;
}

.tab-text-success .underline-border-horizontal {
  display: none;
}

.tab-text-success.active .underline-border-horizontal {
  display: block;
  background-color: map-get($themeColors, success);
}

.tab-text-success .underline-border-vertical {
  display: none;
}

.tab-text-success.active .underline-border-vertical {
  display: block;
  background-color: map-get($themeColors, success);
}

/* underline styles */
.tab-underline-primary {
  color: map-get($themeColors, gray02) !important;
  border-radius: 0 !important;
  transition: none !important;
  border-bottom: 2px solid map-get($themeColors, gray04) !important;
}

.tab-underline-primary.active {
  color: map-get($themeColors, gray01) !important;
  .tab-underline-border{
    background-color: map-get($themeColors , primary);
  }
}

.tab-underline-danger {
  color: map-get($themeColors, gray02) !important;
  border-radius: 0 !important;
  transition: none !important;
  border-bottom: 2px solid map-get($themeColors, gray04) !important;
}

.tab-underline-danger.active {
  color: map-get($themeColors, gray01) !important;
  border-bottom: 2px solid map-get($themeColors, danger) !important;
}

.tab-underline-success {
  color: map-get($themeColors, gray02) !important;
  border-radius: 0 !important;
  transition: none !important;
  border-bottom: 2px solid map-get($themeColors, gray04) !important;
}

.tab-underline-success.active {
  color: map-get($themeColors, gray01) !important;
  border-bottom: 2px solid map-get($themeColors, success) !important;
}

.tab-underline-warning {
  color: map-get($themeColors, gray02) !important;
  border-radius: 0 !important;
  transition: none !important;
  border-bottom: 2px solid map-get($themeColors, gray04) !important;
}

.tab-underline-warning.active {
  color: map-get($themeColors, gray01) !important;
  border-bottom: 2px solid map-get($themeColors, warning) !important;
}

/*html[dir="rtl"] .tab-component {
  direction: rtl;
}

html[dir="ltr"] .tab-component {
  direction: ltr;
}*/

.tab-component[dir="rtl"] .tab-icon,
html[dir="rtl"] .tab-icon {
  height: 24px !important;
  margin-left: 8px;
}

.tab-component[dir="ltr"] .tab-icon,
html[dir="ltr"] .tab-icon {
  height: 24px !important;
  margin-right: 8px;
}

.text-tab {
  font-size: 14px;
}

.tab-icon :slotted(i) {
  font-size: 14px !important;
}

.link-nav {
  border: none;
  background-color: transparent;
  border-radius: 7px;
  padding: 8px 16px;
  transition: all 0.15s ease-in-out;
  white-space: nowrap !important;
}

.padding-vertical {
  padding: 8px 16px !important;
}

.padding-horizontal {
  padding: 8px 16px !important;
}

.disabled-btn {
  color: #B2B2B2 !important;
}

.underline-border-horizontal {
  top: 98%;
  width: calc(100% - 30px);
  height: 4px;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.underline-border-vertical {
  top: 100%;
  width: 100%;
  height: 4px;
}
/*.tab-underline-border {
  top: 100%;
  width: 100%;
  height: 2px;
}*/
</style>