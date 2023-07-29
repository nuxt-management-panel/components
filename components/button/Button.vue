<template>
  <div class="btn-wrapper">
    <!--main button-->
    <button
        id="Base"
        :type="submit ? 'submit' : 'button'"
        :class="design, RoundedCheck , ButtonSizeCheck(sort , size) , DisabledCheck"
        class="btn main d-flex align-items-center justify-content-center"
        :disabled="btnDisabled"
        v-if="!loading"
    >
      <div class="icon" v-if="$slots.icon">
        <slot name="icon"></slot>
      </div>

      <span class="text">
        {{ name }}
      </span>
    </button>

    <!-- loading button -->
    <button
        :class="ButtonSizeCheck(sort , size),design,RoundedCheck"
        class="btn
           loading
           opacity-loading
           d-flex
           align-items-center
           test
           justify-content-center"
        type="button"
        disabled
        v-else
    >
      <!--spinner loading icon-->
      <span
          class="spinner-border"
          role="status"
          aria-hidden="true"
      >
        </span>
      <!--name of loading button-->
      <span>
                {{ name }}
        </span>
    </button>
  </div>
</template>

<script setup>
/* imports */
import {ref} from "vue";
/* props */
const props = defineProps({
  design: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
    default: 'md',
  },
  name: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  dir: {
    type: String,
  },
  rounded: {
    type: Boolean,
  },
  sort: {
    type: String,
    required: true,
  },
  submit:Boolean
})

/* one line conditions */
const RoundedCheck = props.rounded === true && 'rounded-btn';
const DisabledCheck = props.disabled === true && 'btn-disabled';

/* reactive variables */
const btnDisabled = ref(props.disabled);

const ButtonSizeCheck = (sort, size) => {
  switch (true) {
    case sort === 'text' && size === 'lg':
      return props.loading === true ? 'btn-lg-loading' : 'btn-lg'
    case sort === 'text' && size === 'md':
      return props.loading === true ? 'btn-md-loading' : 'btn-md'
    case sort === 'text' && size === 'sm':
      return props.loading === true ? 'btn-sm-loading' : 'btn-sm'
    case sort === 'icon' && size === 'lg':
      return 'icon-lg'
    case sort === 'icon' && size === 'md':
      return 'icon-md'
    case sort === 'icon' && size === 'sm':
      return 'icon-sm'
    case sort === 'text-icon' && size === 'lg':
      return 'btn-icon-lg'
    case sort === 'text-icon' && size === 'md':
      return 'btn-icon-md'
    case sort === 'text-icon' && size === 'sm':
      return 'btn-icon-sm'
  }
}
</script>

<style scoped lang="scss">
@import "../../public/css/_colors.scss";

/* general styles */
.btn:active , .btn:focus{
  outline: none;
  border: none;
  box-shadow: none;
}
.rounded-btn {
  border-radius: 30px !important;
}


/**** btn base styles ****/
.btn-primary{
  color: map-get($themeColors, white) !important;
  background-color: map-get($themeColors, primary) !important;
  border: none !important;
}

.btn-primary:hover {
  background-color: map-get($hoverColors, primary) !important;
}

.btn-danger{
  color: map-get($themeColors, white) !important;
  background-color: map-get($themeColors, danger) !important;
  border: none !important;
}

.btn-danger:hover {
  background-color: map-get($hoverColors, danger) !important;
}

.btn-warning{
  color: map-get($themeColors, white) !important;
  background-color: map-get($themeColors, warning) !important;
  border: none !important;
}

.btn-warning:hover {
  background-color: map-get($hoverColors, warning) !important;
}

.btn-success{
  color: map-get($themeColors, white) !important;
  background-color: map-get($themeColors, success) !important;
  border: none !important;
}

.btn-success:hover {
  background-color: map-get($hoverColors, success) !important;
}


/* btn light styles */
.btn-light-primary{
  background-color: map-get($lightColors, primary) !important;
  color: map-get($themeColors, primary) !important;
  border: none !important;
}
.btn-light-primary:hover {
  background-color: map-get($themeColors, primary) !important;
  color: map-get($themeColors, white) !important;
}

.btn-light-danger{
  background-color: map-get($lightColors, danger) !important;
  color: map-get($themeColors, danger) !important;
  border: none !important;
}
.btn-light-danger:hover {
  background-color: map-get($themeColors, danger) !important;
  color: map-get($themeColors, white) !important;
}

.btn-light-warning{
  background-color: map-get($lightColors, warning) !important;
  color: map-get($themeColors, warning) !important;
  border: none !important;
}
.btn-light-warning:hover {
  background-color: map-get($themeColors, warning) !important;
  color: map-get($themeColors, white) !important;
}

.btn-light-success{
  background-color: map-get($lightColors, success) !important;
  color: map-get($themeColors, success) !important;
  border: none !important;
}
.btn-light-success:hover {
  background-color: map-get($themeColors, success) !important;
  color: map-get($themeColors, white) !important;
}

/* btn outline styles */
.btn-outline-primary{
  background-color: transparent !important;
  border-color: map-get($themeColors, primary) !important;
  color: map-get($themeColors, primary) !important;
}
.btn-outline-primary:hover{
  background-color: map-get($lightColors, primary) !important;
}

.btn-outline-danger{
  background-color: transparent !important;
  border-color: map-get($themeColors, danger) !important;
  color: map-get($themeColors, danger) !important;
}
.btn-outline-danger:hover {
  background-color: map-get($lightColors, danger) !important;
}

.btn-outline-success{
  background-color: transparent !important;
  border-color: map-get($themeColors, success) !important;
  color: map-get($themeColors, success) !important;
}
.btn-outline-success:hover {
  background-color: map-get($lightColors, success) !important;
}

.btn-outline-warning{
  background-color: transparent !important;
  border-color: map-get($themeColors, warning) !important;
  color: map-get($themeColors, warning) !important;
}
.btn-outline-warning:hover {
  background-color: map-get($lightColors, warning) !important;
}


/* ------- size section -------- */


/***** btn without icon and with text *****/

.btn-lg {
  width: auto;
  height: 65px !important;
  font-size: 22px;
  padding: 0 40px;
  border-radius: 7px;
}

html[dir="rtl"] .btn-lg-loading {
  width: auto;
  height: 65px !important;
  font-size: 22px;
  border-radius: 7px;
  padding: 0 26px 0 40px !important;
}

html[dir="ltr"] .btn-lg-loading {
  width: auto;
  height: 65px !important;
  font-size: 22px;
  border-radius: 7px;
  padding: 0 40px 0 26px !important;
}

html[dir="rtl"] .btn-lg-loading .spinner-border{
  width: 24px !important;
  height: 24px !important;
  margin-left: 12px;
}

html[dir="ltr"] .btn-lg-loading .spinner-border{
  width: 24px !important;
  height: 24px !important;
  margin-right: 12px;
}

.btn-md {
  width: auto;
  height: 44px !important;
  font-size: 16px;
  padding: 0 24px;
  border-radius: 7px;
}

html[dir="rtl"] .btn-md-loading{
  width: auto;
  height: 44px !important;
  font-size: 16px;
  border-radius: 7px;
  padding: 0 16px 0 24px !important;
}

html[dir="ltr"] .btn-md-loading{
  width: auto;
  height: 44px !important;
  font-size: 16px;
  border-radius: 7px;
  padding: 0 24px 0 16px !important;
}

html[dir="rtl"] .btn-md-loading .spinner-border{
  width: 18px !important;
  height: 18px !important;
  margin-left: 8px;
}

html[dir="ltr"] .btn-md-loading .spinner-border{
  width: 18px !important;
  height: 18px !important;
  margin-right: 8px;
}

.btn-sm {
  width: auto;
  height: 32px !important;
  font-size: 14px;
  padding: 0 20px;
  border-radius: 7px;
}

html[dir="rtl"] .btn-sm-loading{
  width: auto;
  height: 32px !important;
  font-size: 14px;
  border-radius: 7px;
  padding: 0 12px 0 20px !important;
}

html[dir="ltr"] .btn-sm-loading{
  width: auto;
  height: 32px !important;
  font-size: 14px;
  border-radius: 7px;
  padding: 0 20px 0 12px !important;
}

html[dir="rtl"] .btn-sm-loading .spinner-border{
  width: 14px !important;
  height: 14px !important;
  margin-left: 4px;
}

html[dir="ltr"] .btn-sm-loading .spinner-border{
  width: 14px !important;
  height: 14px !important;
  margin-right: 4px;
}

/**** btn with icon and without text ****/
.icon-lg {
  width: 65px !important;
  height: 65px !important;
  border-radius: 7px;
}

.icon-lg .icon :slotted(i) {
  font-size: 32px;
  display: block;
  margin: auto 0;
}

.icon-lg .spinner-border {
  width: 32px !important;
  height: 32px !important;
}

.icon-md {
  width: 50px !important;
  height: 50px !important;
  border-radius: 7px;
}

.icon-md .icon :slotted(i) {
  font-size: 24px;
  display: block;
  margin: auto 0;
}

.icon-md .spinner-border {
  width: 24px !important;
  height: 24px !important;
}

.icon-sm {
  width: 32px !important;
  height: 32px !important;
  border-radius: 7px;
  padding: 0;
}

.icon-sm .icon :slotted(i) {
  font-size: 16px;
  display: block;
  margin: auto 0;
}

.icon-sm .spinner-border {
  width: 16px !important;
  height: 16px !important;
}

.opacity-loading {
  opacity: 0.5 !important;
}

/******  btn with icon and text ******/
html[dir="rtl"] .btn-icon-lg{
  width: auto;
  height: 65px !important;
  font-size: 22px !important;
  padding: 0 26px 0 40px;
  border-radius: 7px;
}

html[dir="ltr"] .btn-icon-lg {
  width: auto;
  height: 65px !important;
  font-size: 22px !important;
  padding: 0 40px 0 26px;
  border-radius: 7px;
}

html[dir="rtl"] .btn-icon-lg .icon :slotted(i){
  font-size: 24px !important;
  display: block;
  margin: auto 0 auto 12px;
}

html[dir="ltr"] .btn-icon-lg .icon :slotted(i){
  font-size: 24px !important;
  display: block;
  margin: auto 12px auto 0;
}

html[dir="rtl"] .btn-icon-lg .spinner-border{
  width: 24px !important;
  height: 24px !important;
  margin-left: 12px !important;
}

html[dir="ltr"] .btn-icon-lg .spinner-border{
  width: 24px !important;
  height: 24px !important;
  margin-right: 12px !important;
}

html[dir="rtl"] .btn-icon-md{
  width: auto;
  height: 44px !important;
  font-size: 18px !important;
  padding: 0 16px 0 24px;
  border-radius: 7px;
}

html[dir="ltr"] .btn-icon-md{
  width: auto;
  height: 44px !important;
  font-size: 18px !important;
  padding: 0 24px 0 16px;
  border-radius: 7px;
}

html[dir="rtl"] .btn-icon-md .icon :slotted(i) {
  font-size: 18px !important;
  display: block;
  margin: auto 0 auto 8px;
}

html[dir="ltr"] .btn-icon-md .icon :slotted(i){
  font-size: 18px !important;
  display: block;
  margin: auto 8px auto 0;
}

html[dir="rtl"] .btn-icon-md .spinner-border{
  width: 18px !important;
  height: 18px !important;
  margin-left: 8px;
}

html[dir="ltr"] .btn-icon-md .spinner-border{
  width: 18px !important;
  height: 18px !important;
  margin-right: 8px;
}

html[dir="rtl"] .btn-icon-sm{
  width: auto;
  height: 32px !important;
  font-size: 14px !important;
  padding: 0 12px 0 20px;
  border-radius: 7px;
}

html[dir="ltr"] .btn-icon-sm {
  width: auto;
  height: 32px !important;
  font-size: 14px !important;
  padding: 0 20px 0 12px;
  border-radius: 7px;
}

html[dir="rtl"] .btn-icon-sm .icon :slotted(i){
  font-size: 14px !important;
  display: block;
  margin: auto 0 auto 4px;
}

html[dir="ltr"] .btn-icon-sm .icon :slotted(i){
  font-size: 14px !important;
  display: block;
  margin: auto 4px auto 0;
}

html[dir="rtl"] .btn-icon-sm .spinner-border{
  width: 14px !important;
  height: 14px !important;
  margin-left: 4px !important;
}

html[dir="ltr"] .btn-icon-sm .spinner-border{
  width: 14px !important;
  height: 14px !important;
  margin-right: 4px !important;
}

/* disabled style */
.btn-disabled,
.btn-disabled:hover,
.btn-disabled:focus,
.btn-disabled:active {
  background-color: map-get($themeColors, secondary) !important;
  color: map-get($themeColors, gray03) !important;
  cursor: auto !important;
  border: none !important;

}
</style>
