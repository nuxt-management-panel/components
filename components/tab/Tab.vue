<template>
  <div class="d-flex tab-component" :class="VerticalCheckForParentDiv">
    <div class="nav nav-pills d-flex  py-2 position-relative"
         :class="overflowCheck"
         id="v-pills-tab"
         role="tablist"
         aria-orientation="vertical"
    >
      <div class="wrapper d-flex mb-4 flex-row flex-grow-1" :class="VerticalCheckForNavButtons , hasBorderGeneral">
        <slot name="tabButton"></slot>
      </div>
    </div>
    <div class="tab-content  flex-grow-1"
         id="v-pills-tabContent"
         :style="`margin:`+margin"
    >
      <slot name="tabBody"></slot>
    </div>
  </div>
</template>

<script setup>
//props

const props = defineProps({
  vertical: {
    type: Boolean,
    required: true,
    default: false,
  },
  design: {
    type: Boolean,
    required: true,
  },
  margin: {
    type: String,
  }
});
//ternary conditions
const VerticalCheckForParentDiv = props.vertical === false ? 'flex-column' : 'flex-row';
const VerticalCheckForNavButtons = props.vertical === false ? 'flex-row' : 'flex-column';
const overflowCheck = props.vertical === false && 'overflow-btn';
const hasBorderGeneral = props.vertical === false && (props.design === 'tab-text-primary' || props.design === 'tab-underline-primary') && 'tab-general-border'
/*const VerticalCheckForBody = props.vertical === false?'mt-3 ms-0':'ms-3 pt-2';*/

/*const SpacesCheck = (design , vertical) => {
  if(vertical === true){
    if(design === 'tab-text-primary' || design === 'tab-underline-pr')
  }
}*/
provide('design', props.design);
</script>

<style scoped lang="scss">
@import "public/css/_colors.scss";

.tab-general-border {
  border-bottom: 1px solid map-get($themeColors, gray04);
}

html[dir="rtl"] .tab-component .nav-pills {
}

html[dir="ltr"] .tab-component .nav-pills {
}

/*html[dir="rtl"] .tab-content {
  margin-right: 16px;
}

html[dir="ltr"] .tab-content {
  margin-left: 16px;
}*/

.overflow-btn {
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
}

::-webkit-scrollbar {
  height: 5px !important;
}

::-webkit-scrollbar-thumb {
  background: #e5e3e3;
  border-radius: 100px;

}

/*.border-bottom-tab{
  border-bottom: 2px solid map-get($themeColors,gray04);
}*/
</style>
