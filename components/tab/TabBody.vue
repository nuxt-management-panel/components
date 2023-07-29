<template>
  <div   class="tab-pane fade body-fontsize"
        :class="IndexCheckForActiveBody"
        :id="`v-pills-profile_`+targetIndex"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
        tabindex="0"
  >
    <slot></slot>
  </div>
</template>

<script setup>
//props
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  targetIndex:{
    type:String,
  }
})

//ternary conditions
const IndexCheckForActiveBody = props.index === 0 && 'show active';


</script>

<style scoped>
.body-fontsize{
  font-size: 14px !important;
}
</style>