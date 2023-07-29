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
            label="نام"
            v-model:value="body.name"
        />

        <Input
            class="mt-2"
            type="text"
            label="مرتبه علمی"
            v-model:value="body.degree"
        />

        <Input
            class="mt-2"
            type="text"
            label="رشته تحصیلی"
            v-model:value="body.field"
        />

        <Input
            class="mt-2"
            type="text"
            label="سمت سازمانی"
            v-model:value="body.position"
        />

        <Input
            class="mt-2"
            type="text"
            label="پست الکترونیک"
            v-model:value="body.email"
        />

        <Input
            class="mt-2"
            type="text"
            label="تلفن"
            v-model:value="body.tel"
        />

        <Input
            class="mt-2"
            type="file"
            label="تصویر"
            v-model:value="body.image"
        />


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
  name: "Person",
  components: {Pagination, Select, Input, Modal, Table, Card},
  props: ['tag'],
  data() {
    return {
      runtimeConfig: useRuntimeConfig(),
      url: '/website/person_component',
      modal: null,
      modalTitle: null,
      modalType: 'add',
      body: {
        'name': null,
        'degree': null,
        'field': null,
        'position': null,
        'email': null,
        'tel': null,
        'image': null,
      },
      tableConfig: {
        headers: ['ردیف', 'نام', 'سمت سازمانی', 'مرتبه علمی', 'رشته تحصیلی', 'تصویر', 'عملیات'],
        cols: ['col-2 col-md-1', 'col-7 col-md-2', 'col-7 col-md-2', 'col-7 col-md-2', 'col-7 col-md-2', 'col-3 col-md-2'],
        body: {
          keys: ['counter', 'name', 'position', 'degree', 'field', 'image', 'action'],
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
      this.modalTitle = "افزودن اسلاید جدید"
      this.modalType = 'add'
      Object.keys(this.body).forEach(key => this.body[key] = null);
      this.modal.show()
    },
    editModal(item) {
      this.modalTitle = "ویرایش اسلاید"
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

      let {data} = await useFetch(this.runtimeConfig.apiBase + this.url + `?tag=${this.tag}`, {
            method: "GET",
            credentials: 'include',
            server: false,
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
      let formData = new FormData()
      if (this.body.name)
        formData.append('name', this.body.name)
      if (this.body.degree)
        formData.append('degree', this.body.degree)
      if (this.body.field)
        formData.append('field', this.body.field)
      if (this.body.position)
        formData.append('position', this.body.position)
      if (this.body.email)
        formData.append('email', this.body.email)
      if (this.body.tel)
        formData.append('tel', this.body.tel)
      if (this.body.image instanceof File)
        formData.append('image', this.body.image)
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
      if (this.body.name)
        formData.append('name', this.body.name)
      if (this.body.degree)
        formData.append('degree', this.body.degree)
      if (this.body.field)
        formData.append('field', this.body.field)
      if (this.body.position)
        formData.append('position', this.body.position)
      if (this.body.email)
        formData.append('email', this.body.email)
      if (this.body.tel)
        formData.append('tel', this.body.tel)
      if (this.body.image instanceof File)
        formData.append('image', this.body.image)
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
  }
}
</script>

<style scoped>

</style>