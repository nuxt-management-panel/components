<template>
<!--  <div>
    <label class="text-center w-100 text-truncate ltr">{{ file.name }}</label>
    <div class="progress">
      <div class="progress-bar progress-bar-striped"
           :class="{'progress-bar-animated bg-info':parseInt(percent) !== 100},
           {'bg-success':parseInt(percent) === 100}"
           role="progressbar"
           :style="'width: '+percent+'%'">{{ percent }}%
      </div>
    </div>
    <small @click="remove" class="text-center mt-2 text-danger cursor">حذف</small>
  </div>-->

  <div>
            <div
                    class="item-row d-flex p-0 ms-0 mb-0 me-0 container-upload"
                    :class="rounded ? 'circle' : null, failed ? 'failed' : null, {'done': parseInt(percent) === 100}">
                <div class="col">
                    <div
                            v-if="parseInt(percent) !== 100 && failed === false"
                            class="progress">
                        <div
                                class="progress-bar text-start"
                                :class="{'progress-bar-animated bg-success':parseInt(percent) !== 100}, {'circle' : rounded}"
                                role="progressbar"
                                :style="'width: '+percent+'%'">
                            <label>{{ file.name }}</label>
                        </div>
                    </div>
                    <div v-else-if="failed">
                        <p class="text-danger view float-end">دوباره</p>
                        <p class="text-gray01 pt-1">{{ file.name }}</p>
                    </div>
                    <div v-else>
                        <p class="text-primary view float-end ">دیدن</p>
                        <p class="text-gray01 pt-1">{{ file.name }}</p>
                    </div>

                </div>
                <div class="icon">
                    <img v-if="failed" src="~public/icons/x-red.svg" alt="">
                    <img v-else src="~public/icons/x.svg" alt="">
                </div>
            </div>
        </div>

</template>

<script setup>
import {useFetch} from "nuxt/app";
import {ref} from "vue";

/*
export default {
  name: "UploadFile",
  props: ['file', 'url'],
  data() {
    return {
      runTimeConfig: useRuntimeConfig(),
      percent: 0,
      request: new XMLHttpRequest(),
      response: null
    }
  },
  mounted() {
    this.uploadFile()
  },
  methods: {
    uploadFile() {
      let uploadFormDate = new FormData();
      uploadFormDate.append('file', this.file)

      this.request.withCredentials = true
      this.request.open('POST', this.runTimeConfig.public.apiBase + this.url);

      this.request.upload.addEventListener('progress', event => {
        this.percent = ((event.loaded / event.total) * 100).toFixed(0)
      });

      this.request.onreadystatechange = () => {
        if (this.request.readyState === 4 && this.request.status === 201) {
          this.response = JSON.parse(this.request.response)
          this.$emit('response', this.response)
        }

      };

      this.request.send(uploadFormDate);
    },
    async remove() {
      this.request.abort()
      if (this.response)
        await useFetch(this.runTimeConfig.public.apiBase + this.url + '/' + this.response.id, {
          method: "DELETE",
          credentials: 'include'
        })

      this.$emit('remove', this.response)

    },


  }
}
*/

defineProps({
  rounded:Boolean
})

const file = {
  name: 'somefile.pdf',
  url: '/dsdsds'
}

const failed = ref(false)


const percent = 50
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

</style>
