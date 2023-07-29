<template>

  <div>
    <label v-if="label" class="form-label mb-0">{{ label }}</label>
    <div class="dropdown">
      <div class="dropdown-toggle w-100 h-100 text-truncate pe-4 option-container" :class="styles[styleCode]" href="#"
           role="button"
           data-bs-toggle="dropdown"
           data-bs-auto-close="outside">
        <div class="icon" v-if="$slots.icon">
          <slot name="icon"></slot>
        </div>
        <span v-if="output.length === 0" class="text-secondary">{{ placeholder }}</span>
        <div class="w-75 h-100 pt-2 eee">
        <span v-for="(item, index) in output" class="options">
          <span @click="remove(item)" class="remove"><i class="fa-solid fa-xmark"></i></span>
          <span class="option-text">{{ !objectKey ? item : item[objectKey] }}</span>
          <span v-if="item['sub'].length !== 0">
            (
            <span v-for="(sub_item, sub_index) in item['sub']">
              {{ !objectKey ? sub_item : sub_item[objectKey] }}
              <span v-if="sub_index !== item['sub'].length -1">,</span>
            </span>

            )
          </span>
        </span>
        </div>
      </div>
      <span v-if="output.length > 0" @click="removeAll()" class="remove-all"><i class=" fa-solid fa-xmark"></i></span>
      <span v-if="output.length > 3" class="more">+ {{ output.length - 3 }} بیشتر</span>
      <span class="angle"><i class="fa-solid fa-angle-down"></i></span>
      <ul class="dropdown-menu pt-0 w-100">
        <div class="icon-container" style="display: flex">
        <span
            class="input-group-text input-icon-span search search-icon">
                  <svg width="24" height="24"
                       viewBox="0 0 24 24" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M14.76 13.27L20.49 19L19 20.49L13.27 14.76C12.2 15.53 10.91 16 9.5 16C5.91 16 3 13.09 3 9.5C3 5.91 5.91 3 9.5 3C13.09 3 16 5.91 16 9.5C16 10.91 15.53 12.2 14.76 13.27ZM9.5 5C7.01 5 5 7.01 5 9.5C5 11.99 7.01 14 9.5 14C11.99 14 14 11.99 14 9.5C14 7.01 11.99 5 9.5 5Z"
                              fill="#B2B2B2"/>
                        </svg>
                </span>
          <input
              v-model="searchValue" type="text" class="form-control input-icon search " placeholder="جستجو">
        </div>

        <div class="options-container">
          <div id="select-all" class="form-check ms-4 options-drop select-all">
            <input class="form-check-input" type="checkbox" value=""
                   id="check_all">
            <label class="form-check-label cursor" @click="selectAll($event)" for="check_all">
              انتخاب همه
            </label>
          </div>


          <div class="parent" v-for="(key,group_index) in values">
            <p class="ms-2 p-2">{{ key.group }}</p>
            <div class="results" v-for="(item, index) in key.results">
              <div class="som">
                <!--
                <Check
                    class="ps-2 options-drop main-item"
                    :id="'check_'+index"
                    :label="!objectKey ? value : value[objectKey]"
                    :checked="checkInCheckList(value)"
                    @mouseup="select(value,$event,'main')"
                />
                -->
                <div class="form-check ms-4 options-drop main-item">
                  <input class="form-check-input"
                         type="checkbox" :value="index"
                         :id="'check_main_'+group_index+'_'+index">
                  <label @click="select(item,$event)" class="form-check-label cursor"
                         :for="'check_main_'+group_index+'_'+index">
                    {{ !objectKey ? item : item[objectKey] }}
                  </label>
                </div>
                <button v-if="item.sub.length > 0" class="btn btn-primary" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#coll_'+index"
                        aria-expanded="false">
                  <i class="fa-solid fa-angle-down"></i>
                </button>
              </div>
              <div class="collapse" :id="'coll_'+index">
                <div v-for="(subItem,index2) in item.sub">
                  <!--                  <Check
                                        class="ms-2 ps-2 options-drop sub-item"
                                        :id="'check_sub_'+index2"
                                        :label="!objectKey ? sub : sub[objectKey]"
                                        :checked="checkInCheckList(sub)"
                                        @click.stop="select(sub,$event,'sub')"
                                    />-->
                  <div class="form-check ms-4 sub-item">
                    <input class="form-check-input"
                           type="checkbox" value=""
                           @click="selectSub(item,subItem,$event,'sub')"
                           :id="'check_sub_'+index2+index">
                    <label class="form-check-label cursor"
                           :for="'check_sub_'+index2+index">
                      {{ !objectKey ? subItem : subItem[objectKey] }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>

    <!--    <component :is="Check" :="{label:'...'}"/>-->
    <button @click="search">search</button>

  </div>

</template>

<script setup>

import {computed, onMounted, ref} from "vue";
import Check from "./Check";
import input from "./Input";

const output = ref([])
const styles = [
  'form-control',
  'form-style1',
]

const props = defineProps({
  values: Array,
  checkList: Array,
  label: String,
  placeholder: String,
  objectKey: String,
  styleCode: Int8Array,
})


const emit = defineEmits(['selectedValues'])

/** add items in check list in output emit */
watch(() => props.values, (first, second) => {
  checkList()
});
watch(output, () => {
  if (output.value.length === $('.results').find('.main-item').length)
    $('#select-all input[type=checkbox]').prop('checked', true);
  else
    $('#select-all input[type=checkbox]').prop('checked', false);
}, {deep: true})

onMounted(() => {
  checkList()
})

function select(item, event) {

  setTimeout(function () {

    if (item['sub'].length === 0) {
      let tmp = {...item}
      tmp['sub'] = []

      function f(el) {
        let e = {...el}
        e['sub'] = []
        return JSON.stringify(e) === JSON.stringify(tmp)
      }

      if (output.value.filter(f).length === 0) {
        output.value.push(tmp)
      } else {
        let index = output.value.findIndex(f)
        output.value.splice(index, 1)
      }
    }

    $(event.target).closest('.results').find('.collapse input[type=checkbox]').each(function () {
      let parent = $(event.target).closest('div').children('input').is(':checked')
      if (!this.checked && parent)
        $(this).click()
      else if (!parent)
        $(this).click()
    });
  }, 5);
}


const selectSub = (item, sub_item, event, type) => {

  let tmp = {...item}
  tmp['sub'] = []

  function f(el) {
    let e = {...el}
    e['sub'] = []
    return JSON.stringify(e) === JSON.stringify(tmp)
  }

  if (output.value.filter(f).length === 0) {
    output.value.push(tmp)
    output.value.find(f)['sub'].push(sub_item)
  } else {

    let e = output.value.find(f)
    if (!e['sub'].includes(sub_item))
      e['sub'].push(sub_item)
    else
      e['sub'].splice(e['sub'].indexOf(sub_item), 1)
    if (e['sub'].length === 0)
      output.value.splice(output.value.indexOf(e), 1)
  }


  if (type === 'sub') {
    let all = $(event.target).closest('.collapse').find('.sub-item').length
    let checked = $(event.target).closest('.collapse').find('input:checked').length
    let mainCheckBox = $(event.target).closest('.results').find('.main-item.form-check input')
    let mainLabel = $(event.target).closest('.results').find('.main-item.form-check label')
    let allCheck = mainCheckBox.is(':checked')

    if (all === checked && !mainCheckBox.is(':checked'))
      mainCheckBox.prop('checked', true)
    else if (all !== checked && mainCheckBox.is(':checked'))
      mainCheckBox.prop('checked', false)
    /* else if (mainCheckBox.is(':checked'))
       mainCheckBox.prop('checked', true)*/

    // if (!allCheck && all === checked)
    //   mainCheckBox.prop('checked', true)
    // else if (allCheck && all !== checked)
    //   mainCheckBox.prop('checked', false)
    // else if (allCheck && all !== checked)
    //   mainCheckBox.prop('checked', false)


  }


  emit('selectedValues', output.value)
}

const checkInCheckList = (item) => {
  if (props.checkList) {
    const r = props.checkList.find((e) => JSON.stringify(e) === JSON.stringify(item))
    return !!r
  }
  return false
}

const checkList = () => {
  if (props.checkList) {
    const r = props.values.filter((e) =>
        props.checkList.map((e) => JSON.stringify(e)).includes(JSON.stringify(e))
    )
    output.value = [].concat(r)
    emit('selectedValues', output.value)
  }
}

function remove(item) {

  $('.dropdown').on('click', function (event) {
    event.stopPropagation()
  })

  let tmp = {...item}
  tmp['sub'] = []

  function f(el) {
    let e = {...el}
    e['sub'] = []
    return JSON.stringify(e) === JSON.stringify(tmp)
  }

  props.values.forEach((el) => {
    const index = el.results.findIndex(f)
    $(`#check_main_${index}`).closest('div').children('label').click()
  })

}

function removeAll() {
  $('.main-item').each(function () {
    if ($(this).children('input').is(':checked'))
      $(this).children('label').click()
  });
}

function selectAll(event) {

  const all = !$(event.target).closest('div').children('input').is(':checked')

  $('.main-item').each(function () {

    if (!$(this).children('input').is(':checked') && all)
      $(this).children('label').click()
    else if (!$(this).children('input').is(':checked') && !all)
      $(this).children('label').click()
    else if ($(this).children('input').is(':checked') && !all)
      $(this).children('label').click()

  });
}

const searchValue = ref('')

const search = () => {
  // if (props.values)
  let map = props.values.map((el)=>el.results)
  let r = props.values.filter((v) => v.results.filter((val) => val.name === 'عماد'))
  console.log(map)
}


</script>


<style scoped>

.icon {
  display: flex;
  align-items: center;
  padding-right: 16px;
  color: #818181;;
}


.dropdown {
  height: 44px;
  border: 1px solid #E1E1E1;
  border-radius: 7px;
}

.dropdown-toggle::after {
  display: none;
  background-image: url("./public/icons/uni/t.svg");
}

span > i.fa-angle-down {
  color: #818181;
  position: absolute;
  left: 14px;
  top: 13px
}

.options {
  font-size: 14px;
  height: 34px !important;
  background-color: #F3F6F9;
  border-radius: 7px;
  padding-left: 16px;
  padding-top: 5px;
  margin-right: 12px;
  width: calc(100% - 100px) !important;
}

.option-container {
  display: flex;
  align-items: center;
  overflow-y: scroll;
}

.options-container {
  max-height: 286px;
  overflow-y: scroll;
}

.remove {
  font-size: 14px;
  padding-right: 8px;
}

.option-text {
  margin-right: 8px;
}

.remove-all {
  width: 18px;
  height: 18px;
  color: #818181;
  position: absolute;
  left: 35px;
  top: 11px
}

.angle {
  width: 18px;
  height: 18px;
}


.search {
  border-bottom: 1px solid #E1E1E1;
  border-right: none;
  border-left: none;
  border-top: none;
  border-radius: 0px;
  height: 44px !important;
}

.input-icon-span {
  border-right: 0px !important;
  background-color: white !important;
}

.input-icon {
  height: 44px !important;
  border-left: 0px !important;
}

.search-icon {
  padding-right: 16px;
  padding-left: 8px;
}

.form-control:focus, .form-select:focus, input:focus {
  border-color: #B2B2B2 !important;
  box-shadow: none !important;
}

ul {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border: none;
  padding-bottom: 16px;
}

.options-drop {
  width: 100%;
  display: flex;
  align-items: center;
  padding-right: 16px;
  height: 48px;
  font-size: 18px;
  transition: all 0.3s ease-in-out;
}

.options-drop:hover,
.options-drop.selected {
  background-color: #F3F6F9;
  color: #1BC5BD;
}

.options-container::-webkit-scrollbar {
  width: 8px;
  background-color: #eee;
}

.options-container::-webkit-scrollbar-thumb {
  background-color: #E1E1E1;
}

.text-secondary {
  color: #B2B2B2 !important;
  font-size: 16px;
  padding-right: 12px;
}

.more {
  font-size: 12px;
  color: #1BC5BD;
  position: absolute;
  left: 50px;
  top: 12px;
  padding-left: 16px;
}

.select-all {
  display: flex;
  align-items: center;
  padding-right: 16px;
  height: 48px;
}

.sub-menu {
  background-image: url("public/icons/en.svg");
  background-repeat: no-repeat;
}

.som {
  display: flex;
}

.som > button {
  background-color: transparent !important;
  border: none;
}

.som:hover {
  background-color: #F3F6F9;
}

.som > button:focus {
  box-shadow: none !important;
}

.som > button > i {
  color: black;
}

.collapse {
  background-color: #F8FAFB;
}

.eee {
  overflow-x: scroll;
}

</style>
