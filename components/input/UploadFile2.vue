<template>
  <div>
    <div>
      <div :disaled="single && files2.length > 0" id="drag-drop-area"
           :class="design === 'box-solid-panel' ? 'upload-box-solid-panel': null"
           class="container-upload text-center">
        <img src="~public/icons/file_upload.svg" alt="mkm">
        <p class="drop">Drop your files here</p>
        <p class="allowed">Allowed file formats are pdf,txt, png, jpeg and jpg</p>
        <p class="or">or</p>
        <Button @click="attach" class="d-flex justify-content-center" design="btn-primary" name="Browse"
                size="btn-md"></Button>
        <input type="file" class="d-none" :id="'attach_' + id">
        <input type="file" class="d-none" :id="'attach2_' + id">
      </div>
      <div v-for="item in files2" class="items d-flex p-0 ms-0 mb-0 me-0 container-upload"
           :class="design === 'box-solid-panel' ?'upload-box-solid-panel':null">
        <div class="icon">
          <!--              <img src="~public/icons/file.svg">-->
          <i class="fa-regular fa-file"></i>
        </div>
        <div class="col">
          <label v-if="failed" class="text-danger">{{ error }}</label>
          <label v-else :class="{'pt-2' : parseInt(item.uploadPercent) === 100}">{{ item.file.name }}</label>
          <div v-if="parseInt(item.uploadPercent) !== 100" class="progress ">
            <div
                class="progress-bar"
                :class="{'progress-bar-animated bg-primary':parseInt(item.uploadPercent) !== 100}, {'bg-danger' : failed}"
                role="progressbar"
                :style="'width: '+ item.uploadPercent + '%'">
            </div>
          </div>
          <p class="text-primary view float-end pt-2" v-else>دیدن</p>
        </div>
        <div @click="remove(item)" class="icon">
          <img v-if="failed" src="~public/icons/x-red.svg" alt="">
          <img v-else src="~public/icons/x.svg" alt="">
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {useFetch} from "nuxt/app";
import {onMounted, ref} from "vue";

const props = defineProps({
  url: String,
  design: String,
  rounded: Boolean,
  tag: String,
  single: Boolean
})

const emit = defineEmits([
  'values'
])

const runTimeConfig = useRuntimeConfig()

const styels = {
  'box-base': '',
  'box-solid-panel': 'upload-box-solid-panel',
  'box-solid-site': 'upload-box-solid-site',
  'row': 'upload-row'
}


const id = ref(null)

const files2 = ref([])

const failed = ref(false)

const error = ref('بارگزاری ناموق بود')


onMounted(() => {

  id.value = Math.floor(Math.random() * 999999999999)

  setTimeout(() => {
    const dragDropArea = document.querySelector('#drag-drop-area');

// Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dragDropArea.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

// Highlight drop area when dragging over it
    ['dragenter', 'dragover'].forEach(eventName => {
      dragDropArea.addEventListener(eventName, () => {
        dragDropArea.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dragDropArea.addEventListener(eventName, () => {
        dragDropArea.classList.remove('dragover');
      });
    });

// Handle dropped files
    dragDropArea.addEventListener('drop', e => {
      const files = e.dataTransfer.files;
      handleFiles(files);
    });

// Handle selected files
    const fileInput = document.querySelector(`#attach2_${id.value}`);
    console.log(fileInput)
    fileInput.addEventListener('change', () => {
      let files = fileInput.files;
      handleFiles(files);
    });

// Handle uploaded files

    function handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file != null) {
          const fileItem = reactive({
            file: file,
            uploadPercent: 0
          })
          files2.value.push(fileItem)
          uploadFile(fileItem)
        }
        // Do something with the file, e.g. upload to server
        console.log(file.name);
      }
    }
  }, 500)


})

const attach = () => {
  console.log(id.value)
  $(`#attach_${id.value}`).trigger('click');
  $(`#attach_${id.value}`).change(function () {
    if (this.files[0] != null) {
      let fileItem = reactive(
          {
            file: this.files[0],
            uploadPercent: 0,
          }
      )
      files2.value.push(fileItem)
      uploadFile(fileItem)
    }
    $(`#attach_${id}`).val(null)
  });
}

let td = new Date()
let tdDay = td.getDate()
let tdMonth = td.getMonth() + 1
let tdYear = td.getFullYear()
let currentDate = tdYear + '-' + tdMonth + '-' + tdDay;


const uploadFile = (fileItem) => {
  let uploadFormDate = new FormData();
  let request = new XMLHttpRequest();
  uploadFormDate.append('file', fileItem.file)
  uploadFormDate.append('title', fileItem.name)
  uploadFormDate.append('tag', props.tag)

  request.withCredentials = true
  request.open('POST', runTimeConfig.public.apiBase + '/website/file_component');

  request.upload.addEventListener('progress', event => {
    fileItem.uploadPercent = ((event.loaded / event.total) * 100).toFixed(0)
    console.log(fileItem.uploadPercent)
  });

  request.onreadystatechange = () => {
    console.log(request.readyState)
    if (request.readyState === 4) {
      const response = request.response
      fileItem.response = response
      console.log(response)
      emit('values', fileItem)
      /* this.$emit('response', this.response)*/
    }

  };

  fileItem.request = request

  request.send(uploadFormDate);
}


async function remove(item) {
  item.request.abort()
  console.log(item.response.id)
  if (item.response) {
    const {data, error} = await useFetch(runTimeConfig.public.apiBase + '/website/file_component/' + item.response.id, {
          method: "DELETE",
          credentials: 'include'
        },
        item.response = data
    )
  }
  console.log(item.response)
  /*this.$emit('remove', this.response)*/
}


</script>

<style lang="scss" scoped>
@import 'public/css/_colors.scss';


.drop {
  font-size: 20px;
}

.allowed {
  font-size: 12px;
}

.or {
  font-size: 14px;
}

.container-upload {
  padding-top: 32px;
  padding-bottom: 40px;
  border: 1px solid map-get($themeColors, gray04);
  border-radius: 7px !important;
  margin-top: 16px;
}

.upload-box-solid-panel {
  margin-top: 16px;
  border-color: transparent !important;
  background-color: map-get($themeColors, secondary);

}

.progress {
  background-color: white;
  height: 4px !important;
}

.item-row > .col > .progress {
  height: 100% !important;
}

.item-row > .col > .progress > .progress-bar > label {
  padding-right: 16px;
}

.item-row > .col {
  padding: 0px;
}

.item-row > .icon {
  padding-left: 8px !important;
}


.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;

}

.icon > i {
  font-size: 26px !important;
  color: map-get($themeColors, gray03);
}

.col {
  padding-top: 6px;
}

.view {
  padding-top: 2px;
  font-size: 14px;
}

.item-row > .col > .view {
  padding-top: 2px !important;
}

.col > label {
  font-size: 12px;
  color: map-get($themeColors, gray03);
}

.items {
  border-radius: 7px;
  height: 50px !important;
}

.circle {
  border-radius: 500px !important;
}

.item-row {
  height: 28px;
}

.item-row.failed {
  border-color: map-get($themeColors, danger) !important;
}

.text-gray01 {
  padding-right: 16px;
  font-size: 14px;
}

.done {
  border-color: map-get($themeColors, primary) !important;
}

#drag-drop-area.dragover {
  background-color: map-get($themeColors, gray03);
}

</style>
