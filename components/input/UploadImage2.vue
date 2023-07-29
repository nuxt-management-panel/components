<template>
  <div :class="disabled ? 'dis' : null"
       :id="id" class="row m-0">
    <div v-if="!single" v-for="(item, index) in images" :key="item.id"
         :style="{width: size+'px', height: size + 'px'}"
         class="col-lg-4 col-xl-3 col-md-6 p-0 m-1"
    >
      <div class="position-relative background0 rounded h-100 w-100"
           :class="{'rounded-circle' : rounded}"
      >
        <div v-if="item.image !== null" :class="size < 200 ? 'sm':null"
             class="d-flex img-hover h-100 w-100">
          <img :disabled="disabled" :src="item.image" alt="something" class="w-100 h-100 object-fit-cover rounded"
               :class="{'rounded-circle' : rounded}">
          <div class="w-100 h-100 object-fit-cover bg-black d-none rounded position-absolute opacity-50"
               :class="{'rounded-circle' : rounded}"></div>
          <div
              class="position-absolute buttons d-none">
            <span class="text-white p-2 m-1 d-flex justify-content-center" @click="remove(item.id, index)">Delete</span>
            <a target="_blank" class="p-2 border text-white pe-3 ps-3 m-1 rounded" :href="item.image">view</a>
          </div>
        </div>
        <div v-else class="position-absolute top-50 start-50 translate-middle">
          <div class="spinner-border text-primary">
          </div>
        </div>
        <Modal
            style="z-index: 100"
            :id="'modal_' + index"
            title="delete"
        >
          <template v-slot:body>
            {{ index }}
          </template>
          <template v-slot:footer>
            <Button
                sort="text"
                size="sm"
                design="btn-outline-line"
                name="خروج"
            ></Button>
            <Button
                sort="text"
                size="sm"
                design="btn-danger"
                name="حذف"
                data-bs-dismiss="modal"
                @click="remove(item.id, index)"
            ></Button>
          </template>
        </Modal>
      </div>
    </div>
    <div
        :style="{width: size+'px', height: size + 'px'}"
        :class="{'cursor' : !disabled}"
        class="col-lg-4 col-xl-3 col-md-6 p-0 m-1 "
        @click="attach">
      <div v-if="!disabled" @click="attach" class="w-100 d-inline h-100"></div>
      <div
          class="bg-secondary rounded h-100 w-100 text-center img d-flex flex-column m-0 justify-content-center position-relative align-items-center "
          :class="{'rounded-circle' : rounded}"
      >
        <div v-if="single && images.length > 0" :class="size < 200 ? 'sm' : null"
             class="d-flex img-hover h-100 w-100">
          <img alt="something" :src="images[0].image ? images[0].image : images[0]"
               class="w-100 h-100 object-fit-cover rounded"
               :class="{'rounded-circle' : rounded}">
          <div class="w-100 h-100 object-fit-cover bg-black d-none rounded position-absolute opacity-50"
               :class="{'rounded-circle' : rounded}">
          </div>
          <div class="position-absolute buttons d-none">
            <span class="p-2 border text-white pe-3 ps-3 rounded">Change</span>
          </div>
        </div>
        <div v-else class="position-absolute">
          <div class="spinner-border text-primary">
          </div>
        </div>
        <i v-else :style="'font-size:' + size * 25/100 +'px'" class="fa-regular pt-3 fa-image"></i>
        <Button v-if="!noBrowse" class="d-flex justify-content-center" design="btn-primary" name="Choose"
                sort="text" size="sm"></Button>

      </div>
    </div>
    <input :disabled="disabled" :id="'attach_' + id" class="d-none" type="file" accept="image/*">
  </div>
</template>

<script setup>
import Modal from "~/components/content/Modal.vue";
import {useFetch,} from "nuxt/app";
import {onMounted, ref, defineEmits} from "vue";


const props = defineProps({
  noBrowse: Boolean,
  size: Number,
  rounded: Boolean,
  single: Boolean,
  disabled: Boolean,
  defaultValues: {
    type: Array,
    required: false
  },
  url: String,
  tag: String
})

const emit = defineEmits([
  'values'
])

const runTimeConfig = useRuntimeConfig()

const id = ref(null)

const images = ref([])


onMounted(() => {
  id.value = Math.floor(Math.random() * 999999999999)
  setTimeout(() => {
    if (props.defaultValues != null) {
      for (let i = 0; i < props.defaultValues.length; i++) {
        images.value.push(props.defaultValues[i])
      }
    }
    console.log(images.value)
  }, 1000)
})

const attach = () => {
  $(`#attach_${id.value}`).trigger('click');
  $(`#attach_${id.value}`).change(function () {
        if (this.files[0] != null && props.url && !props.single) {
          console.log('url not single')
          const fileItem = reactive(
              {
                id: null,
                image: null,
                file: this.files[0],
                uploadPercent: 0,
              }
          )
          images.value.push(fileItem)
          uploadFile(fileItem)

        } else if (this.files[0] != null && props.url && props.single) {
          console.log('url single')
          const fileItem = reactive(
              {
                id: null,
                image: null,
                file: this.files[0],
                uploadPercent: 0,
                is_active: true
              }
          )
          images.value[0] = fileItem
          uploadFile(fileItem)
        } else {
          console.log('else')
          emit('values', this.files[0])
          let reader = new FileReader();
          reader.onload = function (e) {
            console.log(22)
            images.value[0] = reader.result
          }
          reader.readAsDataURL(this.files[0]);
        }

        $(`#attach_${id.value}`).val(null)
      }
  )
  ;
}

watch(images.value, () => {
  console.log(images.value)
})

const uploadFile = (fileItem) => {
  let uploadFormDate = new FormData();
  let request = new XMLHttpRequest()
  uploadFormDate.append('tag', props.tag)
  uploadFormDate.append('image', fileItem.file)
  request.withCredentials = true
  request.open('POST', runTimeConfig.public.apiBase + props.url);

  request.upload.addEventListener('progress', event => {
    fileItem.uploadPercent = ((event.loaded / event.total) * 100).toFixed(0)
    console.log(fileItem.uploadPercent)
  });

  request.onreadystatechange = () => {

    if (request.readyState === 4) {

      let response = JSON.parse(request.response)
      fileItem['id'] = response['id']
      fileItem['image'] = response['image']
      emit('values', response)
    }

  };

  request.send(uploadFormDate);
}


const remove = async (id, index) => {
  await useFetch(runTimeConfig.public.apiBase + props.url + '/' + id, {
        method: "DELETE",
        credentials: 'include',

        onResponse(context) {
          emit('remove', context.response._data.id)
          console.log(context)
        },
        onResponseError(context) {
          alert(context)
        }
      },
  )
  images.value.splice(index, 1)
  /*
    emit('remove', this.response)
  */

}


</script>

<style lang="scss" scoped>
@import 'public/css/_colors.scss';


.img > i {
  font-size: 40px;
  color: map-get($themeColors, gray03);
  padding-bottom: 16px;
}

.box {
  width: 216px;
  height: 216px;
}

.som {
  margin-top: -125px;
}

.buttons {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.img-hover:hover div {
  display: flex !important;
}

.btn-sm > button {
  color: white !important;
}

.sm:hover div {
  flex-direction: column !important;
}

.sm > .buttons {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

}

.single:hover {
  display: flex !important;
}

.view {

}

a:hover {
  color: white !important;
}

.dis {
  cursor: not-allowed !important;
  opacity: 0.5;
}

</style>
