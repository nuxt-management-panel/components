<template>
  <div class="main-content">
    <div class="d-flex">
      <p>Add new form</p>
      <Switch @check="getCheck" :checked="check" label="Don't Show in Site" class="ms-auto"/>
    </div>
    <div class="position-fixed bottom-0 mb-3 d-flex justify-content-start w-100">
      <Messages class="" :messages="messages"/>
    </div>
    <form @submit.prevent="checkAdd" class="needs-validation col-lg-4 col-12 mx-auto" novalidate>
      <div class="">
        <Input v-model:value="title" required class="mb " label="Title" design="solid-panel"/>
        <SingleFileUpload  @values="getVal"/>
      </div>
      <div class="d-flex d-flex justify-content-end mt">
        <Button name="انصراف"
                @click="this.$router.go(-1)"
                design="btn-outline-primary"
                sort="text"
                size="md"></Button>
        <Button submit
                sort="text"
                class="btn-sub"
                name="ذخیره"
                design="btn-primary"
                :loading="pending"
                size="md"></Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import Switch from "~/components/input/Switch.vue";
import {useFetch, useRoute, useRuntimeConfig} from "#app";
import {ref} from "vue";
import SingleFileUpload from "~/components/input/SingleFileUpload.vue";
import Messages from "~/components/message/Messages.vue";

let runTimeConfig = useRuntimeConfig()
let route = useRoute()
definePageMeta({
  layout: "panel",
});




const title = ref('')
const file = ref(null)


const tag = ref('')

const url = '/website/file_component'
const pending = ref(false)

function getVal(f) {
  file.value = f
}

tag.value = route.query.tag

const messages = ref([])

const check = ref(false)

function getCheck(v) {
  check.value = v
}


function checkAdd() {
  (() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      console.log('submit')
      if (form.checkValidity()) {
        add()
      }

    })
  })()
}

async function add() {
  let formData = new FormData()
  if (title.value)
    formData.append('title', title.value)
  if (file.value)
    formData.append('file', file.value)
  if (check.value === true)
    formData.append('is_active', false)
  else
    formData.append('is_active', true)
  formData.append('tag', tag.value)

  pending.value = true

  await useFetch(runTimeConfig.public.apiBase + url, {
        method: "POST",
        credentials: 'include',
        body: formData,

        onResponse(context) {
          pending.value = false
          console.log(context.response._data)
          messages.value.push({
            text: 'فرم با موفقیت ایجاد شد.',
            icon: 'fa-solid fa-circle-check',
            design: 'alert-success'
          })
        },
        onResponseError(context) {
          pending.value = false
          messages.value.push({
            text: 'عملیات با خطا مواجه شد، لطفا دوباره امتحان کنید.',
            icon: 'fa-solid fa-circle-xmark',
            design: 'alert-danger'
          })
          console.log(context.response._data)
        },
        onRequestError(context) {
          pending.value = false
          messages.value.push({
            text: 'عملیات با خطا مواجه شد، لطفا دوباره امتحان کنید.',
            icon: 'fa-solid fa-circle-xmark',
            design: 'alert-danger'
          })
        },
      }
  )
}
</script>

<style lang="scss" scoped>
@import "public/css/_colors.scss";

.mb {
  margin-bottom: 20px !important;
}

.mt {
  margin-top: 52px;
}

.btn-sub {
  margin-right: 16px !important;
}

label {
  font-size: 14px;
  color: map-get($themeColors, gray02);
}

p {
  margin-bottom: 40px;
  font-size: 16px;
  font-weight: bold;
}

.cont {
  margin: 32px;
}

.text-area {
  height: 132px !important;
}

</style>
