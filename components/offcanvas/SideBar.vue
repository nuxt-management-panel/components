<template>
  <div id="offcanvasExample"
         aria-labelledby="offcanvasRightLabel"
         class="offcanvas-md pb-0 offcanvas.show bg-white sidebar"
         :class="htmlDirCheck === 'rtl' ? 'offcanvas-start':'offcanvas-end'"
         tabindex="-1"
    >
      <!-- Logo of sidebar -->
      <logo/>
      <!-- Accordion Links Section -->
      <Links/>
    </div>
</template>

<script setup>
import Logo from "./Logo";
import Links from "./Links";
import {ref} from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
})

provide('data', props.data);
const htmlDirCheck = ref('');
/*if(process.client){

}*/
onMounted(()=>{
  htmlDirCheck.value = $('html').attr('dir');
})
</script>

<style scoped>
/*@media screen and (min-width: 768px) {
  .sidebar {
    position: sticky;
    top: 8px;
  }
}*/

.sidebar {
  width: 220px;
  position: fixed;
  z-index: 4997;
  height: calc(100vh - 16px);
  border-radius: 10px;
  background-color: white;
  padding: 25px 0;
  margin-top: 8px;
  margin-bottom: 8px;

}
@media screen and (min-width: 768px) {
  html[dir="rtl"] .sidebar{
    margin-right: 8px;
  }
  html[dir="ltr"] .sidebar{
    margin-left: 8px;
  }
}
.sidebar.show {
  margin-top: 8px;
  margin-bottom: 8px;
}
.sidebar.show .navbar-section{
  display: block;
}
html[dir='rtl'] .sidebar.show {
  right: 8px;
}

html[dir='ltr'] .sidebar.show {
  left: 8px;
}

</style>