<template>
  <div class="navbar-section">
    <nav class="navbar navbar-expand-lg p-0">
      <div class="container-fluid d-flex justify-content-end">
        <button class="navbar-toggler d-md-none p-0" type="button" data-bs-toggle="offcanvas" href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample">
          <i class="fa-solid fa-bars burger-menu"></i>
        </button>
        <!-- icon dropdown for messages -->
        <div id="inbox-section">
          <DropDown dropdown="icon" :style="messageModal ? 'z-index:5001;':''" design="mix-secondary" class="dropdown-navbar1 dropdown-icon position-relative" id="dropdown-message">
            <template #dropBtn>
              <DropDownButton icon="fa-solid fa-bell" data-bs-target="#message-modal" :data-bs-toggle="modalStyle ? 'modal':'dropdown'"
                              name="تست">
              <span v-if="messageObject.length > 0"
                    class="badge-point position-absolute bg-danger rounded-circle">
              </span>
              </DropDownButton>
            </template>
            <template #menu>
              <DropDownMenu v-show="!modalStyle" id="dropdown-message-menu" divider divider_name="Messages" style="width: 250px;" scroll>
                <span class="no-messages" v-if="messageObject.length === 0">هیچ پیامی ندارید</span>
                <DropDownSubItems link="#" v-for="(item,index) in messageObject"
                                  @click="remove(messageObject.length-1 , index)">
                  <div class="inbox d-flex flex-column">
                    <span class="inbox__text text-elipsis"> {{ item.text }}</span>
                    <span class="inbox__date">{{ item.date }}</span>
                  </div>
                </DropDownSubItems>
              </DropDownMenu>
            </template>
          </DropDown>
          <Modal :border="false" :vertical="true" :scroll="true" :center="false" :staticBackdrop="false" :blur="true"
                 title="عنوان" bodyDesign="d-flex flex-column justify-content-start" headerDesign="" id="message-modal">
            <template #header>
            </template>
            <template #body>
              <span class="no-messages" v-if="messageObject.length === 0">هیچ پیامی ندارید</span>
              <nuxt-link to="#" class="mb-2" v-for="(item,index) in messageObject"
                         @click="remove(messageObject.length-1 , index)">
                <div class="inbox d-flex flex-column align-items-end">
                  <span class="inbox__text text-elipsis-sm text-elipsis-md"> {{ item.text }}</span>
                  <span class="inbox__date">{{ item.date }}</span>
                </div>
              </nuxt-link>

            </template>
          </Modal>
        </div>

        <!-- complete dropdown for positions -->
        <DropDown dropdown="complete" design="mix-secondary" style="max-width: 30%;" class="d-none d-sm-block dropdown-navbar2">
          <template #dropBtn>
            <DropDownButton icon="fa-solid fa-suitcase" name="test"></DropDownButton>
          </template>
          <template #menu>
            <DropDownMenu>
              <DropDownSubItems name="test" link="#">
              </DropDownSubItems>
            </DropDownMenu>
          </template>
        </DropDown>
        <!--complete dropdown for user -->
        <DropDown dropdown="complete" design="mix-secondary" style="max-width: 30%;" class="d-none d-sm-block dropdown-navbar3">
          <template #dropBtn>
            <DropDownButton icon="fa-solid fa-user" name="your name"></DropDownButton>
          </template>
          <template #menu>
            <DropDownMenu>
              <DropDownSubItems name="test" link="#">
              </DropDownSubItems>
            </DropDownMenu>
          </template>
        </DropDown>

        <!-- icon dropdown in mobile size for positions -->
        <DropDown dropdown="icon" design="mix-secondary" style="z-index: 5001;" class="d-block d-sm-none dropdown-navbar4 dropdown-icon position-relative" id="dropdown-icon-position">
          <template #dropBtn>
            <DropDownButton icon="fa-solid fa-suitcase" name="test" data-bs-target="#position-modal"
                            data-bs-toggle="modal"></DropDownButton>
          </template>
          <template #menu>
            <DropDownMenu>
              <DropDownSubItems name="test" link="#">
              </DropDownSubItems>
            </DropDownMenu>
          </template>
        </DropDown>
        <Modal :vertical="true" :scroll="true" :center="false" :staticBackdrop="false" :blur="true"
               title="عنوان" bodyDesign="d-flex flex-column justify-content-start" headerDesign="" id="position-modal">
          <template #header>
          </template>
          <template #body>
            <div class="radio-buttons">
              <Radio label="مدیر عامل" dir="rtl" name="position"/>
              <Radio label="سرپرست" dir="rtl" name="position"/>
            </div>
          </template>
        </Modal>
        <!-- icon dropdown in mobile size for users -->
        <DropDown dropdown="icon" design="mix-secondary" class="d-block d-sm-none dropdown-navbar5 dropdown-icon">
          <template #dropBtn>
            <DropDownButton icon="fa-solid fa-user" name="test" data-bs-target="#user-modal"
                            data-bs-toggle="modal"></DropDownButton>
          </template>
          <template #menu>
            <DropDownMenu>
              <DropDownSubItems name="test" link="#">
              </DropDownSubItems>
            </DropDownMenu>
          </template>
        </DropDown>
      </div>
    </nav>
  </div>
</template>

<script setup>

import DropDown from "../dropdown/DropDown";
import DropDownButton from "../dropdown/DropDownButton";
import DropDownMenu from "../dropdown/DropDownMenu";
import DropDownSubItems from "../dropdown/DropDownSubItems";
import {ref, watch , computed} from "vue";
import Radio from "../input/Radio";

const messageObject = ref([
  {
    text: 'Test Message',
    date: '2023/01/01',
    link: '#'
  },
  {
    text: 'Test Message',
    date: '2023/01/01',
    link: '#'
  },
  {
    text: 'Test Message',
    date: '2023/01/01',
    link: '#'
  },


])

const remove = (length, index) => {
  if (length >= 0) {
    messageObject.value.splice(index, 1)
  }
}

const messageModal = ref(false)
const modalStyle = ref(false)

onMounted(() => {
  //direction of dropdowns icon
  const direction = ref('');
  direction.value = $('html').attr('dir');
  if (direction.value === 'rtl') {
    $('#dropdown-message').attr('dir', 'ltr')
  } else {
    $('#dropdown-message').attr('dir', 'rtl')
  }

  const modalMessage = $('#message-modal')
  //give some top position to modals because have collision with dropdown button


  modalMessage.on('show.bs.modal', () => {
    messageModal.value = true
    $('#dropdown-icon-position').removeAttr('style')
    $('#offcanvasExample').css('z-index','1')
  })
  modalMessage.on('hide.bs.modal',()=>{
    $('#offcanvasExample').css('z-index','4997')
  })
  modalMessage.on('hidden.bs.modal', () => {
    messageModal.value = false
    $('#dropdown-icon-position').css('z-index','5001')
  })

    $('.modal-dialog').each((index, el) => {
      $(el).css({
        'top': '66px',
        'max-width':'calc(100% - 136px)',
        'height': 'calc(100vh - 140px)',
        'margin-left':'auto',
        'margin-right':'auto',
      })
    })

  /*widthOfPage.value = window.innerWidth*/
  window.innerWidth >= 992 ? modalStyle.value = false : modalStyle.value = true
  window.addEventListener('resize',()=>{
    window.innerWidth >= 992 ? modalStyle.value = false : modalStyle.value = true
  })

})

</script>

<style scoped lang="scss">
@import "public/css/_colors.scss";


.navbar-section {
  position: fixed;
  top: 0;
  width: 100%;
  height: 92px;
  z-index: 4995;
  background-color: map-get($themeColors, secondary);
  padding: 0;
}


html[dir="rtl"] {
  .navbar {
    margin-right: 244px;
    margin-left: 16px;
  }
}

html[dir="ltr"] {
  .navbar {
    margin-right: 16px;
    margin-left: 244px;
  }
}

@media only screen and (max-width: 768px) {
  .navbar {
    margin: 0 8px !important;
  }
}

.navbar-toggler {
  box-shadow: none;
  border: none;
}

html[dir="rtl"] .navbar-toggler {
  margin-left: auto;
}

html[dir="ltr"] .navbar-toggler {
  margin-right: auto;
}

.navbar {
  background-color: map-get($themeColors, white);
  border-radius: 10px;
  height: 72px;
  top: 8px;
}

.burger-menu {
  color: map-get($themeColors, gray03);
  font-size: 27px;
}

html[dir="rtl"] {
  .dropdown-navbar1, .dropdown-navbar2, .dropdown-navbar4 {
    margin-left: 20px;
  }
}

html[dir="ltr"] {
  .dropdown-navbar1, .dropdown-navbar2, .dropdown-navbar4 {
    margin-right: 20px;
  }
}

.navbar .container-fluid {
  padding: 0 32px;
}

.inbox {
  font-size: 14px;
}

.inbox__text {
  white-space: break-spaces;
}

html[dir="rtl"] .inbox__text {
  direction: rtl;
}

html[dir="ltr"] .inbox__text {
  direction: ltr;
}

.inbox__date {
  margin-top: 6px;
  color: map-get($themeColors, gray03);
}

html[dir="rtl"] .inbox__date {
  direction: rtl;
}

html[dir="ltr"] .inbox__date {
  direction: ltr;
}

//badge styles for icon dropdown that has inbox message
.badge-point {
  width: 6px;
  height: 6px;
  top: 10px;
}

html[dir="rtl"] .badge-point {
  right: 14px;
}

html[dir="ltr"] .badge-point {
  left: 14px;
}

.no-messages {
  display: block;
  padding: 16px;
  font-size: 14px;
  color: map-get($themeColors , gray03);
}
html[dir="rtl"] {
  .no-messages{
    direction: rtl;
  }
}
html[dir="ltr"] {
  .no-messages{
    direction: rtl;
  }
}
.text-elipsis{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media screen and (max-width: 576px) {
  .text-elipsis-sm{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
@media screen and (min-width:576px) and (max-width:992px){
  .text-elipsis-md{
    max-width: 620px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.dropdown-navbar1 :deep(.dropdown-scroll){
  height: calc(100% - 75px) !important;
}
.dropdown-navbar1 :deep(.menu--width){
  height: 50vh;
}
</style>
