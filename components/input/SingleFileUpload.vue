<template>
  <div class="row m-0">
    <div class="w-auto ps-0">
      <Button @click="attach"
              sort="text"
              name="Choose"
              design="btn-primary"
              size="md">
      </Button>
    </div>
    <div class="col p-0  div m-0 bg-secondary rounded ">
      <Input v-if="val" ltr v-model:value="val.file.name"  design="solid-panel" disabled/>
      <Input v-else design="solid-panel" disabled/>
    </div>

    <input type="file" :id="'attach_' + id" class="d-none"/>
  </div>
</template>

<script setup>

import {ref, onMounted, defineEmits} from "vue";

const id = ref(0)
const val = ref(null)
const emit = defineEmits([
  'values'
])
onMounted(() => {
  id.value = Math.floor(Math.random() * 999999999999)
})
const attach = () => {
  $(`#attach_${id.value}`).trigger('click');
  $(`#attach_${id.value}`).change(function () {
        if (this.files[0] != null) {
          let file = {
            file: this.files[0]
          }
          val.value = file
          emit('values', this.files[0])
        }
      }
  )

}

function remove() {
  val.value = null
}
</script>

<style scoped>

.div {
  height: 44px;
  overflow: hidden;
  width: auto !important;
}

p {
  font-size: 14px;
  padding-top: 6px !important;
}

.xmark {
  padding-top: 14px;
}

.text-end {
  overflow: hidden;
}

i {
  cursor: pointer !important;
}


</style>
