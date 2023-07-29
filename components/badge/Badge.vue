<template>
  <span
    class="badge"
    ref="badge"
    :class="ShapeOfBadgeCondition, SizeOfBadgeCondition, design"
  >
    <div class="badge-content d-flex flex-row align-items-center">
      <i
          class="icon-alert"
        :class="SizeOfIconCondition , icon"
        v-if="showIcon === true"
      ></i>
      <span>{{ name }}</span>
      <i
        class="fa-solid fa-close dismiss-hoverEffect"
        :class="SizeOfDismissCondition"
        @click="dismissClose"
        v-if="dismiss === true"
      ></i>
    </div>
  </span>
</template>

<script setup>
//props
const props = defineProps({
  badge: {
    type: String,
    required: true,
    default:'rounded',
  },
  design: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dismiss: {
    type: Boolean,
    required: true,
  },
  showIcon: {
    type: Boolean,
    required: true,
  },
  icon:{
    type:String,
  },
  size: {
    type: String,
    required: true,
  },
});

//ternary conditions
const SizeOfBadgeCondition =
  props.size === "lg"
    ? "badge-padding-fontsize-lg"
    : "badge-padding-fontsize-sm";
const SizeOfIconCondition =
  props.size === "lg" ? "icon-styles-lg" : "icon-styles-sm";
const SizeOfDismissCondition =
  props.size === "lg" ? "dismiss-styles-lg" : "dismiss-styles-sm";
const ShapeOfBadgeCondition =
  props.badge === "rounded"
    ? "badge-rounded"
    : props.badge === "circle"
    ? "badge-circle"
    : "";

//emit
const emit = defineEmits(["onDismiss"]);

//functions
const dismissClose = () => {
  emit("onDismiss");
};
</script>

<style scoped>
.badge-padding-fontsize-sm {
  padding: 4px 8px;
  font-size: 11px;
}
.badge-padding-fontsize-lg {
  padding: 12px 17px;
  font-size: 15px;
}

/* rtl styles */
html[dir="rtl"] .icon-styles-sm,
html[dir="rtl"] .icon-styles-lg {
  margin-left: 6px;
}
html[dir="rtl"] .dismiss-styles-sm,
html[dir="rtl"] .dismiss-styles-lg {
  margin-right: 8px;
}

/* ltr styles */

html[dir="ltr"] .icon-styles-sm,
html[dir="ltr"] .icon-styles-lg {
  margin-right: 6px;
}
html[dir="ltr"] .dismiss-styles-sm,
html[dir="ltr"] .dismiss-styles-lg {
  margin-left: 8px;
}

.badge-circle {
  border-radius: 100px;
}
.badge-rounded {
  border-radius: 5px;
}
.dismiss-hoverEffect:hover {
  cursor: pointer;
}
</style>
