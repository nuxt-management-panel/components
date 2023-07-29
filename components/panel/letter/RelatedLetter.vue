<template>
  <div class="d-flex justify-content-between m-0 mt-3">
    <Box :title="title" color="grey" class="mt-3 col-xl-11 col-lg-10 col-md-11 col-sm-10 col-9">
      <Tag v-for="item in selectedRelatedLetters"
           :title="item.title"

           @remove="$emit('unselectRelatedLetter',item)"/>
    </Box>
    <ButtonPlus data-bs-toggle="modal" :data-bs-target="'#receiverModal_'+id"/>
  </div>
  <Modal :title="title" :id="'receiverModal_'+id" size="lg">
    <template v-slot:body>

      <Search title="انتخاب نامه مرتبط"
              class="col-12"
              :data="[{
                        'title': 'نامه های مرتبط',
                        'type': 'regular',
                        'key':'title',
                        'data': relatedLetters
                     }]"
              @select="(item,nested_item) => $emit('selectRelatedLetter',item,nested_item)"
              :checklist="null"/>


      <table class="table table-borderless table-responsive mt-3">
        <thead class="d-block rounded">
        <tr class="w-100 d-flex" style="font-size: 14px">
          <th class="main-bg-color rounded-start col-1 col-md-1 text-center">
            ردیف
          </th>
          <th class="main-bg-color col-3 col-md-6 text-center">عنوان نامه</th>
          <th class="main-bg-color col-2 col-md-4 text-center">تاریخ</th>
          <th class="main-bg-color rounded-end col-1 col-md-1 text-center"></th>
        </tr>
        </thead>
        <tbody style="font-size: 14px">

        <tr v-for="(item,index) in selectedRelatedLetters" class="rounded d-flex mt-2">

          <th class="table-row-color rounded-start col-1 col-md-1 text-center">
            {{ index + 1 }}
          </th>
          <td class="table-row-color col-3 col-md-6 text-center">
            {{ item.title }}
          </td>
          <td class="table-row-color col-2 col-md-4 text-center">
            {{ item.created }}
          </td>
          <td class="table-row-color rounded-end col-1 col-md-1 text-center">
            <i @click="$emit('unselectRelatedLetter',item)"
               class="fa-solid fa-xmark text-secondary mt-2 cursor"></i>
          </td>
        </tr>

        </tbody>
      </table>


    </template>
    <template v-slot:footer>
      <button class="btn btn-outline-main" data-bs-dismiss="modal"
              aria-label="Close">ثبت
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "../../content/Modal";
import Search from "../../input/Search";
import Box from "../../content/Box";
import Tag from "../../content/Tag";
import ButtonPlus from "../../Button/ButtonPlus";

export default {
  name: "RelatedLetter",
  components: {ButtonPlus, Tag, Box, Search, Modal},
  props: ['title', 'relatedLetters','selectedRelatedLetters'],
  emits: ['selectRelatedLetter', 'unselectRelatedLetter'],
  data() {
    return {
      id: Math.floor(Math.random() * 999999999999),
    }
  }
}
</script>

<style scoped>
.btn-size {
  height: 41px !important;
  margin-top: 27px;
}
</style>