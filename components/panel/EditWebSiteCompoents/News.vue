<template>

  <div>
    <button class="btn btn-sm btn-outline-main ms-1 mt-2" @click="addModal">افزودن</button>

    <Modal
        :title="modalTitle"
        :id="'modal_add_'+id"
        @object="(obj)=>modal = obj"
        size="lg">

      <template v-slot:body>

        <Input
            type="text"
            label="عنوان"
            v-model:value="body.title"
        />

        <Input
            class="mt-2"
            type="text"
            label="روتیتر"
            v-model:value="body.subtitle"
        />

        <Input
            class="mt-2"
            type="date"
            label="تاریخ"
            v-model:value="body.date"
        />

        <div class="mt-2">
          <label class="form-label">متن خبر</label>
          <div id="newsEditor"></div>
        </div>

        <!-- attach -->

        <UploadImage
            :images="body.images"
            url="/website/news_component_images/"
            uploadKey="image"
            @response="(res)=>uploadIds.push(res.id)"
            @remove="(res)=>deAttach(file,res)"
            class="mt-4"/>

        <!-- end attach -->

      </template>


      <template v-slot:footer>
        <button class="btn btn-outline-main" @click="submit">
          ثبت
        </button>
      </template>

    </Modal>

    <Table
        :config="tableConfig"
        @remove="remove"
        @edit="editModal"
    />

    <Pagination
        v-if="data"
        class="text-center"
        :next-url="data['next']"
        :previous-url="data['previous']"
        @onData="(d)=> {data = d,tableConfig.data = d.results}"
    />

  </div>
</template>

<script>
import Card from "../../content/Card";
import Table from "../../content/Table";
import {useFetch, useRuntimeConfig} from "nuxt/app";
import Modal from "../../content/Modal";
import Input from "../../input/Input";
import Select from "../../input/Select";
import UploadImage from "../../input/UploadImage";
import ButtonPlus from "../../Button/ButtonPlus";
import Pagination from "../../Pagination";


export default {
  name: "News",
  components: {Pagination, ButtonPlus, UploadImage, Select, Input, Modal, Table, Card},
  props: ['tag'],
  data() {
    return {
      runtimeConfig: useRuntimeConfig(),
      url: '/website/news_component',
      modal: null,
      modalTitle: null,
      editor: null,
      modalType: 'add',
      attaches: [],
      uploadIds: [],
      body: {
        'title': null,
        'subtitle': null,
        'text': null,
        'date': null,
        'images': [],
      },
      tableConfig: {
        headers: ['ردیف', 'عنوان', 'تاریخ', 'عملیات'],
        cols: ['col-2 col-md-2', 'col-7 col-md-5', 'col-7 col-md-3', 'col-3 col-md-2'],
        body: {
          keys: ['counter', 'title', 'date', 'action'],
          actions: ['edit', 'delete']
        },
        data: null
      },
      data: null,
      id: Math.floor(Math.random() * 999999999999),
      fixDate: false
    }
  },
  beforeMount() {
    this.getData()
  },
  mounted() {
    // this.modal = new bootstrap.Modal('#modal_add_' + this.id)
    ClassicEditor
        .create(document.querySelector('#newsEditor'), {
          language: {
            content: 'ar'
          },
          toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'alignment', 'undo', 'redo', 'link']
        })
        .then(newEditor => {
          window.editorNews = newEditor;
        })
  },
  methods: {
    gregorian_to_jalali(date) {
      date = date.split('-')
      const gy = parseInt(date[0])
      const gm = parseInt(date[1])
      const gd = parseInt(date[2])

      let g_d_m, jy, jm, jd, gy2, days;
      g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      gy2 = (gm > 2) ? (gy + 1) : gy;
      days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
      jy = -1595 + (33 * ~~(days / 12053));
      days %= 12053;
      jy += 4 * ~~(days / 1461);
      days %= 1461;
      if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
      }
      if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
      } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
      }

      let month = ''
      switch (jm) {
        case 1:
          month = 'فروردین'
          break
        case 2:
          month = 'فروردین'
          break
        case 3:
          month = 'فروردین'
          break
        case 4:
          month = 'فروردین'
          break
        case 5:
          month = 'فروردین'
          break
        case 6:
          month = 'فروردین'
          break
        case 7:
          month = 'فروردین'
          break
        case 8:
          month = 'فروردین'
          break
        case 9:
          month = 'فروردین'
          break
        case 10:
          month = 'فروردین'
          break
        case 11:
          month = 'فروردین'
          break
        case 12:
          month = 'فروردین'
          break
      }

      return `${jy}-${jm}-${jd}`;
    },

    addModal() {
      this.modalTitle = "افزودن رویداد جدید"
      this.modalType = 'add'
      Object.keys(this.body).forEach(key => this.body[key] = null);
      window.editorNews.setData("")
      this.body.images = []
      this.modal.show()
    },
    editModal(item) {
      this.modalTitle = "ویرایش رویداد"
      this.modalType = 'edit'
      this.body = {...item}
      this.body.date = this.gregorian_to_jalali(this.body.date)
      window.editorNews.setData(this.body.text)
      this.modal.show()
    },
    submit() {
      if (this.modalType === 'add')
        this.add()
      else
        this.edit()
    },
    async getData() {
      let {data} = await useFetch(this.runtimeConfig.apiBase + this.url + `?tag=${this.tag}`, {
            method: "GET",
            credentials: 'include',
            params: {page_size: 20},
            onResponseError(context) {
              alert("error")
              console.log(context.response._data)
            }
          }
      )
      this.data = data.value
      this.tableConfig.data = data.value.results
    },
    async add() {
      let this_ = this;

      await useFetch(this.runtimeConfig.apiBase + this.url, {
            method: "POST",
            credentials: 'include',
            body: {
              title: this_.body.title,
              subtitle: this_.body.subtitle,
              text: window.editorNews.getData(),
              date: this_.body.date,
              tag: this_.tag,
              uploadIds: this_.body.images.map(item => item.id),
            },

            onResponse(context) {
              this_.modal.hide()
              Object.keys(this_.body).forEach(key => this_.body[key] = null);
              this_.tableConfig.data.push(context.response._data)
            },

            onResponseError(context) {
              //alert("error")
              console.log(context.response._data)
            }
          }
      )

    },
    async edit() {
      let this_ = this;

      await useFetch(this.runtimeConfig.apiBase + this.url + this.body.id, {
            method: "PUT",
            credentials: 'include',
            body: {
              title: this_.body.title,
              subtitle: this_.body.subtitle,
              text: window.editorNews.getData(),
              date: this_.body.date,
              tag: this_.tag,
              uploadIds: this_.body.images.map(item => item.id),
            },

            onResponse(context) {
              this_.modal.hide()
              let index = this_.tableConfig.data.findIndex((e) => e.id === this_.body.id)
              this_.tableConfig.data[index] = context.response._data
              Object.keys(this_.body).forEach(key => this_.body[key] = null);
            },

            onResponseError(context) {
              //alert("error")
              console.log(context.response._data)
            }
          }
      )

    },
    async remove(item) {
      let this_ = this;
      await useFetch(this.runtimeConfig.apiBase + this.url + +item.id, {
            method: "DELETE",
            credentials: 'include',

            onResponse(context) {
              this_.tableConfig.data.splice(this_.tableConfig.data.indexOf(item), 1)
            },

            onResponseError(context) {
              alert("error")
              console.log(context.response._data)
            }
          }
      )

    },
  }
}
</script>

<style scoped>

</style>