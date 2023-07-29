<template>
  <div
    class="alert d-flex justify-content-start"
    :class="design"
    role="alert"
  >
    <div class="alert__icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
    <div class="alert__content my-1">
      <slot name="content"></slot>
    </div>
    <div
      class="alert__dismiss p-0 text-center ms-auto"
      type="button"
      data-bs-dismiss="alert"
      aria-label="Close"
      v-if="dismiss"
    >
      <i :class="icon"></i>
    </div>
  </div>
</template>

<script setup>
//props
const props = defineProps({
  design: {
    type: String,
    required: true,
  },
  dismiss: {
    type: Boolean,
    required: true,
  },
  icon: {
    type: String,
    default:'fa-solid fa-close',
  },
});
</script>
<style scoped lang="scss">
/* BEM and Hyphen delimited String */
@import "public/css/_colors.scss";
:slotted(i) {
  font-size: 36px;
}
.alert__dismiss {
  background: none;
  font-size: 24px;
  opacity: 100% !important;
}
/* rtl style */
html[dir="rtl"] .alert__icon {
  margin-left: 16px !important;
}
html[dir="rtl"] .alert__content {
  margin-left: 48px;
}
/*ltr styles */
html[dir="ltr"] .alert__icon {
  margin-right: 16px;
}
html[dir="ltr"] .alert__content {
  margin-right: 48px;
}

.alert-primary {
  background-color: map-get($alertColors, primary);
  border-color: map-get($themeColors, primary);

  .alert__icon , .alert__dismiss{
    color: map-get($themeColors, primary);
  }
}
.alert-danger {
  background-color: map-get($alertColors, danger);
  border-color: map-get($themeColors, danger);

  .alert__icon , .alert__dismiss{
    color: map-get($themeColors, danger);
  }
}
.alert-success {
  background-color: map-get($alertColors, primary);
  border-color: map-get($themeColors, success);

  .alert__icon , .alert__dismiss{
    color: map-get($themeColors, success);
  }
}
.alert-warning {
  background-color: map-get($alertColors, warning);
  border-color: map-get($themeColors, warning);

  .alert__icon , .alert__dismiss{
    color: map-get($themeColors, warning);
  }
}
</style>
