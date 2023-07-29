<template>

  <div>
    <button class="btn btn-sm btn-outline-main ms-1 mt-2" @click="addModal">افزودن</button>

    <Modal
        :title="modalTitle"
        :id="'modal_add_'+id"
        @object="(obj)=>modal = obj"
        size="md">

      <template v-slot:body>

        <Input
            type="text"
            label="عنوان"
            v-model:value="body.title"
        />

        <div class="row m-0 mt-2">
          <Input
              class="col-md-6 ps-0"
              type="number"
              label="از روز"
              v-model:value="body.from_day"
          />

          <Select
              class="col-md-6 pe-0"
              label="ماه"
              :values='["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"]'
              :default-value="body.from_month"
              @selectedValue="(e)=>body.from_month = e"/>
        </div>

        <div class="row m-0 mt-2">
          <Input
              class="col-md-6 ps-0"
              type="number"
              label="تا روز"
              v-model:value="body.to_day"
          />

          <Select
              class="col-md-6 pe-0"
              label="ماه"
              :values='["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"]'
              :default-value="body.to_month"
              @selectedValue="(e)=>body.to_month = e"/>
        </div>


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
import modal from "../../content/Modal";
import Select from "../../input/Select";
import login from "../../../pages/login";
import Pagination from "../../Pagination";

export default {
  name: "EducationCalender",
  components: {Pagination, Select, Input, Modal, Table, Card},
  props: ['tag'],
  data() {
    return {
      runtimeConfig: useRuntimeConfig(),
      url: '/website/education_calender_component',
      modal: null,
      modalTitle: null,
      editor: null,
      modalType: 'add',
      body: {
        'from_title': null,
        'from_day': null,
        'to_title': null,
        'to_day': null,
        'month': null
      },
      tags: null,
      types: null,
      tableConfig: {
        headers: ['ردیف', 'عنوان', 'از روز', 'ماه', 'تا روز', 'ماه', 'عملیات'],
        cols: ['col-2 col-md-2', 'col-7 col-md-2', 'col-7 col-md-1', 'col-7 col-md-2', 'col-7 col-md-1', 'col-7 col-md-2', 'col-3 col-md-2'],
        body: {
          keys: ['counter', 'title', 'from_day', 'from_month', 'to_day', 'to_month', 'action'],
          actions: ['edit', 'delete']
        },
        data: null
      },
      data: null,
      id: Math.floor(Math.random() * 999999999999)
    }
  },
  beforeMount() {
    this.getData()
  },
  mounted() {

  },
  methods: {
    addModal() {
      this.modalTitle = "افزودن آیتم جدید جدید"
      this.modalType = 'add'
      Object.keys(this.body).forEach(key => this.body[key] = null);
      this.modal.show()
    },
    editModal(item) {
      this.modalTitle = "ویرایش آیتم"
      this.modalType = 'edit'
      this.body = {...item}
      this.modal.show()
    },
    submit() {
      if (this.modalType === 'add')
        this.add()
      else
        this.edit()
    },
    async getData() {
      let {data} = await useFetch(this.runtimeConfig.apiBase + this.url, {
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
    async remove(item) {
      let this_ = this;
      await useFetch(this.runtimeConfig.apiBase + this.url + item.id, {
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
    async add() {
      let this_ = this;
      let formData = new FormData()
      if (this.body.title)
        formData.append('title', this.body.title)

      if (this.body.from_day)
        formData.append('from_day', this.body.from_day)
      if (this.body.from_month)
        formData.append('from_month', this.body.from_month)

      if (this.body.to_day)
        formData.append('to_day', this.body.to_day)
      if (this.body.to_month)
        formData.append('to_month', this.body.to_month)

      formData.append('tag', this.tag)

      await useFetch(this.runtimeConfig.apiBase + this.url, {
            method: "POST",
            credentials: 'include',
            body: formData,

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
      let formData = new FormData()
      if (this.body.title)
        formData.append('title', this.body.title)

      if (this.body.from_day)
        formData.append('from_day', this.body.from_day)
      if (this.body.from_month)
        formData.append('from_month', this.body.from_month)

      if (this.body.to_day)
        formData.append('to_day', this.body.to_day)
      if (this.body.to_month)
        formData.append('to_month', this.body.to_month)

      formData.append('tag', this.tag)

      await useFetch(this.runtimeConfig.apiBase + this.url + this.body.id, {
            method: "PUT",
            credentials: 'include',
            body: formData,

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
  }
}
</script>

<style scoped>

</style>