<template>
  <div>
    <div class="root bg-warning">
      <Navbar/>
      <SideBar :data="data"/>

      <div class="Content-panel">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
//imports
import data from '/assets/data/menu.json';
import SideBar from "~/components/offcanvas/SideBar";
import 'overlayscrollbars/overlayscrollbars.css';
import 'public/css/scrollbar-body.scss';
import {OverlayScrollbars} from "overlayscrollbars";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

//custom scrollbar options
const scrollOptions = {
  showNativeOverlaidScrollbars: false,
  update: {
    debounce: [20, 55],
    ignoreMutation: null,
  },
  scrollbars: {
    visibility: 'visible',
    autoHide: 'scroll',
    theme: 'os-theme-dark',
  }
}

//remove default scrollbar only for pages that inherited from this layout
//this style gives custom css only for panel pages.
const head = useHead({
  link:[{
    rel:'stylesheet',
    href:'/css/panel-custom.css'
  }]
})

//getting current url for checking focus style for sidebar
const route = useRoute();
const currentPath = ref('');
currentPath.value = route.path;

const htmlTag = ref('');
const isSidebarShow = ref('');
onMounted(() => {
  /*this.$nextTick(() => {
    // Your logic here
  })*/
  const htmlElement = $('html');
  /*console.log($('#offcanvasExample').hasClass('show'))*/
  //when offcanvas is show disable scroll
  $('#offcanvasExample').on("shown.bs.offcanvas",()=>{
    htmlElement.attr('data-overlayscrollbars-overflow-y','hidden')
  })
  //when offcanvas is hide enable scroll
  $('#offcanvasExample').on("hidden.bs.offcanvas",()=>{
    htmlElement.attr('data-overlayscrollbars-overflow-y','scroll')
  })

  //giving custom scrollbar to body
  if(window.innerWidth >=768){
    const osInstance = OverlayScrollbars(document.getElementsByTagName('body')[0], scrollOptions);
  }
  //give scrollbar-body class to our scrollbar in body to make it difference from another scrollbars
  $('.os-scrollbar').addClass('scrollbar-body')
  //check for rtl and ltr scrollbar handle
  htmlTag.value = htmlElement.attr('dir');
  if (htmlTag.value === 'rtl') {
    /*$('.os-scrollbar-vertical').addClass('right-scrollbar');*/
    $('.os-scrollbar-vertical').css({
      'right':'auto',
      'left':'2px',
    });
  }
  if(htmlTag.value === 'ltr'){
    /*$('.os-scrollbar-vertical').addClass('left-scrollbar');*/
    $('.os-scrollbar-vertical').css({
      'right':'2px',
      'left':'auto',
    });
  }

  //custom side padding with scrollbar and without it
  const hasScrollbar = ref('');
  hasScrollbar.value = $('.os-scrollbar-vertical').hasClass('os-scrollbar-unusable');
  if (hasScrollbar.value) {
    $('.Content-panel').addClass('panel-container-not-scroll')
  } else {
    $('.Content-panel').addClass('panel-container-scroll')
  }

  //custom style for body sidebar
  if (!hasScrollbar.value) {
    $('.os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle ').addClass('os-scrollbar-handle-body');
  }

  //sidebar main links focus
  $('.hyperlink-faculty').each((index, el) => {
    if ($(el).attr("href") === currentPath.value) {
      $(el).children().addClass('button-focus')
      $(el).children().css('width','0')
      $( document ).ready(function() {
        $(el).children().delay(60).animate({ width:"188px" }, 20);
      });
    }
  })

  //sidebar sub links focus
  $('.nav-link').each(function (index, el) {
    if ($(el).attr("href") === currentPath.value) {
      /*$(el).parents('.wrapper').find('.accordion-button--chevron').attr("aria-expanded", "true");
      $(el).parents('.wrapper').find('.accordion-button--chevron').removeClass('collapsed');
      $(el).parents('.accordion-collapse').addClass('show')*/
      $(el).parents('.wrapper').find('.accordion-button--chevron').trigger('click');
/*      $(el).parents('.accordion-collapse').addClass('show')
      $(el).parents('.wrapper').find('.accordion-button--chevron').removeClass('collapsed')*/
      $(el).children().addClass('sub-item-focus')
    }
  })
})

watch(() => route.path, (newvalue, oldvalue) => {
  const isHeadLink = ref(false);
  const isSubsetLink = ref(false);
  //Head Links Active
  $('.hyperlink-faculty').each((index, el) => {
    if ($(el).attr("href") === newvalue) {
      $(el).children().addClass('button-focus')
      /*$('.hyperlink-faculty').each((index , el)=>{
        $(el).children().hasClass('collapsed') ? console.log('has') : console.log('dont have')
      })*/
      const chevronElements = ref('');
      chevronElements.value = $('.hyperlink-faculty').children('.accordion-button--chevron')
      chevronElements.value.each((index , el)=>{
        !$(el).hasClass('collapsed') && $(el).trigger('click')
      })
      isHeadLink.value = true;
    }
    if ($(el).attr("href") === oldvalue) {
      $(el).children().removeClass('button-focus');
    }
  })

  //sub links active
  $('.nav-link').each(function (index, el) {
    if ($(el).attr("href") === newvalue) {
      /*$(el).parents('.wrapper').find('.accordion-button--chevron').attr("aria-expanded", "true");
      $(el).parents('.wrapper').find('.accordion-button--chevron').removeClass('collapsed');
      $(el).parents('.accordion-collapse').addClass('show')*/
      $(el).children().addClass('sub-item-focus')
    }
    if ($(el).attr("href") === oldvalue) {
      $(el).children().removeClass('sub-item-focus');
      isSubsetLink.value = true;
    }
  })

  if(isHeadLink.value && isSubsetLink.value){
/*    $('.accordion-button--chevron').attr("aria-expanded", "false");
    $('.accordion-button--chevron').addClass('collapsed');
    $('.accordion-collapse').removeClass('show');*/
    /*const accordionChevron = ref('');
    accordionChevron.value = $('.wrapper').find('.accordion-button--chevron').attr('href') == oldvalue;*/
    $('.accordion-button--chevron:not(.collapsed)').trigger('click')
  }
})
</script>

<style scoped lang="scss">
@import "public/css/_colors.scss";
.root {
  background-color: map-get($themeColors, secondary);
  height: 100%;
}
.Content-panel{
  width: 100%;
  height: 100%;
  background-color: map-get($themeColors, secondary);
  padding-top:92px;
  padding-bottom: 8px;
}
/*html[dir="rtl"] .Content-panel{
  padding-right: 244px;
  padding-left: 16px;
}
html[dir="ltr"] .Content-panel{
  padding-right: 16px;
  padding-left: 244px;
}
@media only screen and (max-width: 768px) {
  .Content-panel{
    padding: 92px 16px 8px 16px !important;
  }
}*/
.navbar-toggler {
  box-shadow: none;
  border: none;
}

.panel-container-not-scroll {
  padding: 92px 244px 8px 16px;
}

html[dir="rtl"] {
  .panel-container-scroll {
    padding: 92px 244px 8px 16px;
  }
  @media screen and (max-width: 768px) {
    .panel-container-scroll {
      padding: 92px 8px 8px 8px !important;
    }
    
  }
}

html[dir="ltr"] {
  .panel-container-scroll {
    padding: 92px 16px 8px 244px;
  }
  @media screen and (max-width: 768px) {
    .panel-container-scroll {
      padding: 92px 8px 8px 8px !important;
    }
    
  }
}

html[dir="rtl"] {
  .wrapper {
    padding-left: 0;
    padding-right: 16px;
  }
}

html[dir="ltr"] {
  .wrapper {
    padding-right: 0;
    padding-left: 16px;
  }
}

@media screen and (max-width: 768px) {
  .wrapper {
    padding: 0 !important;
  }
  
}
</style>
