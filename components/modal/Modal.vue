<template>
  <!-- Modal -->
  <div  class="modal modal-with-backdrop fade"
       :class="BackDropBlurCheck , backdropColor"
        :id="id"
        ref="staticBack"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
  >
    <div  class="modal-dialog"
         :class="ModalBodyScrollCheck , ModalBodyVerticalCheck , ModalBodyPositionCheck"
    >
      <div class="modal-content">
        <div class="modal-header border-0" :class="headerDesign">
          <slot name="header">
            <h1 class="modal-title" >{{ title }}</h1>
          </slot>
          <button type="button" class="fa-solid fa-close btn-icon-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body"  :class="ModalBodyBorderCheck , bodyDesign">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer border-0"
             :class="FooterVerticalCheck">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//imports
import {ref} from "vue";

//props
const props = defineProps({
  border: {
    type: Boolean,
    required: true,
  },
  scroll: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
  },
  center: {
    type: Boolean,
  },
  vertical: {
    type: Boolean,
    required: true,
  },
  staticBackdrop: {
    type: Boolean,
  },
  blur:{
    type:Boolean,
    required:true,
  },
  bodyDesign:{
    type:String,
  },
  headerDesign:{
    type:String,
  },
  id:{
    type:String,
    required:true,
  }
})

//ternary conditions
const FooterVerticalCheck = props.vertical===true ? 'width-horizontal-button flex-column-reverse':'flex-row';
const ModalBodyBorderCheck = props.border === true && 'border-bottom border-top';
const ModalBodyScrollCheck = props.scroll === true && 'modal-dialog-scrollable';
const ModalBodyVerticalCheck = props.vertical === false && 'horizontal-width';
const ModalBodyPositionCheck = props.center === true && 'modal-dialog-centered';
const BackDropBlurCheck = props.blur === true && 'modal-backdrop-blur';
const backdropColor = props.blur ===true ? 'modal-backgroundcolor-blur':'modal-backgroundcolor-notblur';

//set static backdrop with ref
const staticBack = ref(null)
onMounted(() => {
  if (props.staticBackdrop === true) {
    staticBack.value.setAttribute('data-bs-backdrop', 'static');
  }
})

//custom backdrop
if (process.client) {
  let modal = document.querySelector('.modal');
  modal.classList.add('modal-with-backdrop');
  modal.addEventListener('show.bs.modal', function () {
    let backdrop = document.querySelector('.modal-backdrop');
    modal.appendChild(backdrop);
  });
}
</script>

<style lang="scss" scoped>
@import "public/css/_colors.scss";

$gray03: map-get($themeColors, gray03);



html[dir="rtl"] .modal-body{
  direction: ltr;
  padding: 16px 10px 16px 16px;
}
html[dir="rtl"] .modal-body{
  justify-content: end;
}
html[dir="ltr"] .modal-body{
  direction: rtl;
  padding: 16px 16px 16px 10px;
}
html[dir="ltr"] .modal-body{
  justify-content: end;
}
.modal-title {
  font-size: 16px;
}
.modal-body {
  height: 250px;
  font-size: 14px;

}

.modal-body :slotted(p) {
  line-height: 25px;
  text-align: justify;
}
::-webkit-scrollbar {
  width: 12px;
  height: 0;
}

::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 1em;
  background-color: $gray03;
  -webkit-box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.025);
}

::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

.horizontal-width {
  max-width: 700px !important;
}

.width-horizontal-button :slotted(.mainButton),
.width-horizontal-button :slotted(.mainButton) button {
  width: 95%;
}

.width-horizontal-button :slotted(.mainButton) button {
  margin: 0 auto 0 auto;
}

.modal-header .btn-icon-close {
  margin: 0;
}

.btn-icon-close {
  width: 16px;
  height: 16px;
  border: 0;
  background-color: transparent;
}

.btn-icon-close::before {
  font-size: 15px;
}
.modal-with-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.modal-backgroundcolor-notblur{
  background-color:rgb(0 , 0 , 0 , 0.5) !important;
}
.modal-backgroundcolor-blur{
  background-color: rgb(146 146 146 / 50%) !important;
}
.modal-backdrop-blur{
  backdrop-filter: blur(10px);
}
</style>
