<template>
  <div class=" sss">
    <div class="toast-container position-static">
      <div v-for="(item,index) in messages" :id="'liveToast_'+ index" class="toast border-0" role="alert" aria-live="assertive"
           aria-atomic="true">
        <Alert class="m-0" :design="item.design" dismiss>
          <template v-slot:icon>
            <i :class="item.icon" class="alert-icon"></i>
          </template>
          <template v-slot:content>
            {{item.text}}
          </template>
        </Alert>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const id = ref(null)

onMounted(() => {
  activate()
})


const props = defineProps({
  messages: Array,
})

watch(props.messages, (first, second) => {
  activate()
});

const activate = () => {
  setTimeout(function () {
    for (let i = 0; i < props.messages.length; i++) {
      const el = $(`#liveToast_${i}`)
      console.log(el)
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(el)
      toastBootstrap.show()
    }
  }, 10)

}


</script>


<style scoped lang="scss">

.sss {
  right: 20px !important;
  bottom: 20px !important;
}

.toast{
  margin-bottom: 20px;
}

.toast-container > .toast:last-child{
  margin-bottom: 0px !important;
}

</style>
