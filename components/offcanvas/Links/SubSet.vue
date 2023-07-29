<template>

  <div :id="id" class="accordion-collapse collapse"
       aria-labelledby="headingOne"
       data-bs-parent="#accordionExample">
    <div class="accordion-body p-0 d-flex flex-column">
      <ul class="list-group d-flex flex-column align-items-start p-0">
          <NuxtLink class="nav-link position-relative hyperlinks w-100" :to="item.link" v-for="item in subItems">
            <li class="side-items">
            <span>
              {{ item.name }}
            </span>
            </li>
          </NuxtLink>
      </ul>
    </div>
  </div>


</template>

<script setup>
import {useRoute} from "vue-router";
import {ref , watch} from "vue";
const props = defineProps({
  subItems: {
    type: Object,
    required: true,
  },
  id: {
    type: String,
  }
})


/*const route = useRoute();
const currentPath = ref('');
currentPath.value = route.path;
console.log(currentPath.value)
onMounted(() => {
  console.log('onMounted-subset')
  $('.nav-link').each(function (index, el) {
    if ($(el).attr("href") === currentPath.value){
      $('.accordion-button--chevron').each((index , el)=>{
        $(el).attr("aria-expanded","true")
        $(el).removeClass('collapsed')
      })
      $('.accordion-collapse').addClass('show')
      $(el).children().addClass('sub-item-focus')
    }
  })
})
onUpdated(()=>{
  console.log('onUpdated-subset')
})*/
</script>

<style scoped lang="scss">
@import "public/css/_colors.scss";
/*.accordion-collapse.collapsing{
  transition:height 0.5s ease !important;
}*/
.side-items {
  list-style: none;
  font-size: 12px;
  color: map-get($themeColors, gray01);
  border-radius: 7px;
  transition: all 0.3s;
}
html[dir="rtl"] .side-items{
  padding: 12px 16px 12px 0;
  margin-right: 13px;
}
html[dir="ltr"] .side-items{
  padding: 12px 0 12px 16px;
  margin-left: 13px;
}
.side-items:not(.sub-item-focus):hover{
  background-color: map-get($hoverColors , secondary);
}
.hover-effect-sub {
  width: 156px;
  height: 40px;
  position: absolute;
  top: -12px;
  transform: translateX(11px);
  border-radius: 7px;
  transition: all 0.3s;
  z-index: 0;
}
.nav-link span{
  transition: all 0.3s;
}
/* focus style */
.sub-item-focus{
  background-color: map-get($lightColors , primary);
}
.sub-item-focus span{
  color: map-get($themeColors , primary);
}
/*.side-items{
  background-color: map-get($lightColors , primary);
}
.side-items span{
  color: map-get($themeColors , primary);
}*/
/*.nav-link:focus{
  outline: none !important;
  border: none !important;

}*/
.link > span i {
  color: #bbbbbb;
}

.hyperlinks {
  display: inline !important;
}
</style>