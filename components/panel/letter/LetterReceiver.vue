<template>
  <div class="d-flex justify-content-between m-0 mt-3">
    <Box :title="title" color="grey" class="mt-3 col-xl-11 col-lg-10 col-md-11 col-sm-10 col-9">
      <Tag v-for="item in receivers.filter(obj=> obj.type === type)"
           :title="item.name"
           :span="item.part_name"
           @remove="$emit('unselectReceivers',item)"/>
    </Box>
    <ButtonPlus data-bs-toggle="modal" :data-bs-target="'#receiverModal_'+id"/>
  </div>
  <Modal :title="title" :id="'receiverModal_'+id" size="lg">
    <template v-slot:body>
      <div class="d-flex flex-column justify-content-between">

        <ul v-if="letter_type === 'خارجی'" class="nav nav-pills mb-3" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="small nav-link active"
                    data-bs-toggle="pill" :data-bs-target="'#tab0_'+type" type="button"
                    role="tab" :aria-controls="'tab0_'+type" aria-selected="true">گیرنده
              داخلی
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="small nav-link" data-bs-toggle="pill"
                    :data-bs-target="'#tab1_'+type" type="button" role="tab"
                    :aria-controls="'tab1_'+type" aria-selected="false">گیرنده خارجی
            </button>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane fade show active" :id="'tab0_'+type" role="tabpanel">
            <Search title="انتخاب گیرنده"
                    :data="[
                              {
                                'title': 'پرسنل',
                                'type': 'nested',
                                'key':'name',
                                'nested': 'parts',
                                'nested_key': 'name',
                                'data': users
                              },
                              {
                                'title': 'گروه',
                                'type': 'regular',
                                'key':'name',
                                'data': groups
                              }
                            ]"
                    class="col-12"
                    @select="(item,nested_item) => $emit('selectReceivers',item,nested_item,null,null,type)"
                    :checklist="receivers.filter(obj=> obj.type === type)"/>
          </div>
          <div class="tab-pane fade" :id="'tab1_'+type" role="tabpanel">
            <div class="d-flex mt-2 mb-2">
              <div class="col-md-9 p-0 ps-2">
                <label class="form-label m-0 ps-0">وارد کردن گیرنده</label>
                <div class="row w-100">
                  <div class="col-md p-1">
                    <input v-model="external_receiver_full_name" type="text"
                           class="form-control"
                           placeholder="نام گیرنده">
                  </div>
                  <div class="col-md p-1">
                    <input v-model="external_receiver_part_name" type="text"
                           class="form-control"
                           placeholder="سمت گیرنده">
                  </div>

                </div>
              </div>
              <button class="btn-main btn-sm btn col-md-3 btn-size" type="button"
                      @click="$emit('selectReceivers',null,null,external_receiver_full_name,external_receiver_part_name,type),external_receiver_full_name = '',external_receiver_part_name=''">
                افزودن گیرنده
              </button>
            </div>
          </div>
        </div>


      </div>

      <table v-if="type === 'receiver'" class="table table-borderless table-responsive mt-3">
        <thead class="d-block rounded">
        <tr class="w-100 d-flex" style="font-size: 14px">
          <th class="main-bg-color rounded-start col-1 col-md-1 text-center">
            ردیف
          </th>
          <th class="main-bg-color col-10 text-center">گیرنده</th>
          <th class="main-bg-color rounded-end col-1 col-md-1 text-center"></th>
        </tr>
        </thead>
        <tbody style="font-size: 14px">

        <tr v-for="(item,index) in receivers.filter(obj=> obj.type === type)" class="rounded d-flex mt-2">

          <th class="table-row-color rounded-start col-1 col-md-1 text-center">
            {{ index + 1 }}
          </th>
          <td class="table-row-color col-10 text-center">
            <span>
                {{ item.name }}
                <span v-if="item.part_name" class="small text-secondary">({{ item.part_name }})</span>
            </span>
          </td>
          <td class="table-row-color rounded-end col-1 col-md-1 text-center">
            <i @click="$emit('unselectReceivers',item)"
               class="fa-solid fa-xmark text-secondary mt-2 cursor"></i>
          </td>
        </tr>

        </tbody>
      </table>

      <table v-else class="table table-borderless table-responsive mt-3">
        <thead class="d-block rounded">
        <tr class="w-100 d-flex" style="font-size: 14px">
          <th class="main-bg-color rounded-start col-1 col-md-1 text-center">
            ردیف
          </th>
          <th class="main-bg-color col-3 col-md-3 text-center">گیرنده</th>
          <th class="main-bg-color col-2 col-md-2 text-center">مهلت اقدام</th>
          <th class="main-bg-color col-5 col-md-5 text-center">جهت</th>
          <th class="main-bg-color rounded-end col-1 col-md-1 text-center"></th>
        </tr>
        </thead>
        <tbody style="font-size: 14px">

        <tr v-for="(item,index) in receivers.filter(obj=> obj.type === type)" class="rounded d-flex mt-2">

          <th class="table-row-color rounded-start col-1 col-md-1 text-center">
            {{ index + 1 }}
          </th>
          <td class="table-row-color col-3 col-md-3 text-center">
             <span>
                  {{ item.name }}
                  <span v-if="item.part_name" class="small text-secondary">({{ item.part_name }})</span>
              </span>
          </td>
          <td class="table-row-color col-2 col-md-2 text-center">
            <input :data-name="'datepicker_'+type+'_'+index"
                   :id="'datepicker_'+type+'_'+index"
                   @change="$emit('setItemReceiversDeadLine',item,$event)"
                   class="w-100 my-table text-center small">
          </td>
          <td class="table-row-color rounded-end col-5 col-md-5 text-center comment">
            <input class="w-100 my-table small dropdown"
                   data-bs-toggle="dropdown"
                   @change="$emit('setItemReceiversComment',item,$event,0)">
            <ul class="dropdown-menu dropdown-menu-end">
              <li class="small ms-1 cursor"
                  @click="$emit('setItemReceiversComment',item,$event,1)">
                جهت استحضار
              </li>
              <li class="small ms-1 cursor"
                  @click="$emit('setItemReceiversComment',item,$event,1)">
                جهت اقدام
              </li>

            </ul>
          </td>
          <td class="table-row-color rounded-end col-1 col-md-1 text-center">
            <i @click="$emit('unselectReceivers',item)"
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
  name: "LetterReceiver",
  components: {ButtonPlus, Tag, Box, Search, Modal},
  props: ['title', 'receivers', 'users', 'groups', 'type', 'letter_type'],
  emits: ['selectReceivers', 'unselectReceivers', 'setItemReceiversDeadLine', 'setItemReceiversComment'],
  data() {
    return {
      id: Math.floor(Math.random() * 999999999999),
      external_receiver_full_name: "",
      external_receiver_part_name: "",
    }
  },

}
</script>

<style scoped>
.btn-size {
  height: 41px !important;
  margin-top: 27px;
}
</style>