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

        <Input
            class="mt-2"
            type="number"
            label="شمارنده"
            v-model:value="body.count"
        />


        <Input
            class="mt-2"
            type="file"
            label="آیکون"
            v-model:value="body.icon"
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
  name: "CounterBox",
  components: {Pagination, Select, Input, Modal, Table, Card},
  props: ['tag'],
  data() {
    return {
      runtimeConfig: useRuntimeConfig(),
      url: '/website/counter_box_component',
      modal: null,
      modalTitle: null,
      modalType: 'add',
      body: {
        'title': null,
        'count': null,
        'icon': null,

      },
      tags: null,
      types: null,
      tableConfig: {
        headers: ['ردیف', 'عنوان', 'شمارنده', 'آیکون', 'عملیات'],
        cols: ['col-2 col-md-1', 'col-7 col-md-3', 'col-7 col-md-3', 'col-7 col-md-3', 'col-3 col-md-2'],
        body: {
          keys: ['counter', 'title', 'count', 'icon', 'action'],
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
      this.modalTitle = "افزودن شمارنده جدید"
      this.modalType = 'add'
      Object.keys(this.body).forEach(key => this.body[key] = null);
      this.modal.show()
    },
    editModal(item) {
      this.modalTitle = "ویرایش شمارنده"
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
      if (this.body.count)
        formData.append('count', this.body.count)
      if (this.body.icon instanceof File)
        formData.append('icon', this.body.icon)
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
      if (this.body.count)
        formData.append('count', this.body.count)
      if (this.body.icon instanceof File)
        formData.append('icon', this.body.icon)
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