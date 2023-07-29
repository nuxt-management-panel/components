<template>
  <div class="accordion-header" id="headingOne">
    <button :class="design , BorderCheck"
             class="collapsed accordion-button d-flex justify-content-between"
             type="button"
             data-bs-toggle="collapse"
            :data-bs-target="'#collapseOne_'+index"
             aria-expanded="true"
             aria-controls="collapseOne"
    >
      <span>{{ name }}</span>
      <i class="fa-solid fa-chevron-down"></i>
    </button>
  </div>
</template>

<script setup>
//props
const props = defineProps({
  design: {
    type:String,
    required:true,
  },
  index: {
    type:String,
  },
  name: {
    type:String,
    required:true,
  },
  border:{
    type:String,
    required:true,
  },
})

const randomId = inject('randomId');

//ternary conditions
const BorderCheck = props.border === 'border' ? '' : 'accordion-radius-btn';
</script>

<style scoped lang="scss">
@import "public/css/_colors.scss";


.accordion-primary {
  background-color: map-get($themeColors, primary) !important;
  box-shadow: none !important;
}


.accordion-warning {
  background-color: map-get($themeColors, warning) !important;
  box-shadow: none !important;
}


.accordion-danger {
  background-color: map-get($themeColors, danger) !important;
  box-shadow: none !important;
}


.accordion-success {
  background-color: map-get($themeColors, success) !important;
  color: map-get($themeColors, white) !important;
  box-shadow: none !important;
}


.accordion-secondary {
  background-color: map-get($themeColors, secondary) !important;
  box-shadow: none !important;
}

button {
  padding: 16px 30px 16px 20px;
}

.accordion-button::after {
  display: none;
}
.accordion-button:not(.collapsed) > i {
  transform: rotate(-180deg) !important;
  transition-duration: 400ms;
}
.accordion-button.collapsed > i {
  transform: rotate(0deg) !important;
  transition-duration: 400ms;
}
.accordion-radius-btn{
  border-radius: 7px !important;
}
.accordion-radius-btn:not(.collapsed){
  border-radius: 7px 7px 0 0 !important;
}
</style>