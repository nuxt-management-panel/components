<template>
  <div class="dropdown has-validation">
    <label v-if="label" class="form-label mb-0">{{ label }}</label>
    <div class="form-select form-control select-menu" :class="design ? styles[design] : styles['base']">
      <svg v-if="selectedValue" @click="remove(selectedValue)" class="delete-selected" width="24" height="24"
           viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <line x1="15.8995" y1="7.41421" x2="7.41422" y2="15.8995" stroke="#818181" stroke-width="2"
              stroke-linecap="round"/>
        <line x1="7.41424" y1="7.41406" x2="15.8995" y2="15.8993" stroke="#818181" stroke-width="2"
              stroke-linecap="round"/>
      </svg>
      <div class="select h-100 dropdown-toggle" data-bs-toggle="dropdown">
        <div class="d-flex align-items-center">
          <div class="icon" v-if="$slots.icon">
            <slot name="icon"></slot>
          </div>
          <span v-if="selectedValue" class="place-selected">
              {{ selectedValue }}
            </span>
          <span v-else class="place">
              {{ placeholder }}
            </span>
        </div>
      </div>
      <div class="dropdown-menu pt-0">
        <div v-if="!noSearch" class="input-group">
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
              v-model="searchvalue" type="text" class="form-control input-icon search" placeholder="جستجو">
        </div>
        <div class="option-container">
          <div
              v-for="item in search" @click="selectItem($event, item)"
              :class="{'selected':defaultValue === item}"
              class="option" required>
            <span v-if="objectKey">{{ item[objectKey] }}</span>
            <span v-else>{{ item}}</span>
          </div>
          <div class="invalid-feedback">
            لطفا مقدار معتبر وارد نمایید.
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script setup>
import {onMounted, ref, computed} from "vue";
import Input from "./Input";

const selectedValue = ref(null)

onMounted(() => {
  if (props.defaultValue) {
    if(props.objectKey)
      selectedValue.value = props.defaultValue[props.objectKey]
    else
      selectedValue.value = props.defaultValue
  }

  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    console.log(forms)

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
            form.classList.add('was-validated')
          }, false)
        })
  })()
})

const emit = defineEmits(['selectedValue',])

const selectItem = (event, item) => {
  /*$('.option').each((index, el) => {
    $(el).removeClass('selected')
  });*/
  $('.option').removeClass('selected')
  selectedValue.value = props.objectKey ? item[props.objectKey] : item
  event.target.classList.add("selected");
  emit('selectedValue', item)
}

const props = defineProps({
  values: Array,
  label: String,
  objectKey: String,
  defaultValue: Object,
  design: String,
  placeholder: String,
  disabled: Boolean,
  noSearch:Boolean
})


const searchvalue = ref('')

const search = computed(() => {
  if (props.values)
    return props.objectKey ? props.values.filter((v) => v[props.objectKey].includes(searchvalue.value)) : props.values.filter((v) => v.toString().includes(searchvalue.value))
})

function remove(v) {
  selectedValue.value = null
  $(".option").removeClass("selected");
}


const styles = {
  'base': '',
  'solid-panel': 'select-solid-panel',
  'solid-site': 'select-solid-site'
}

</script>

<style scoped>
.dropdown-toggle::after {
  display: none;
  background-image: url("./public/icons/en.svg");
}

.icon {
  padding-top: 11px;
  padding-right: 16px;
  padding-left: 0px;
}

.icon :slotted(i) {
  color: #818181 !important;
  font-size: 16px;
}

.disabled {
  background-color: #F3F6F9 !important;
  border: 1px solid #E1E1E1;
}

.disabled-site {
  background-color: #F6F6F6 !important;
}

.disabled-panel {
  background-color: #F3F6F9 !important;
}

.disabled-panel > .select > .place {
  color: #B2B2B2 !important;
}

.delete-selected {
  margin-top: 9px;
  float: left;
  margin-left: 35px;
  padding: 1px;
}

.form-label {
  color: #818181;
  font-size: 14px !important;
  margin-bottom: 6px !important;
}

.input-solid {
  border: 1px solid #B2B2B2 !important;
  margin: 16px !important;
  border-radius: 6px !important;
}

.select-solid-panel {
  background-color: #F3F6F9;
  border: none;
}

.select-solid-site {
  background-color: #F6F6F6 !important;
  border: none;
}

.select-menu {
  height: 44px !important;
  position: relative;
  padding: 0px;

}

.select {
  color: #B2B2B2;
  border-radius: 6px;
}

.dropdown-menu {
  background-color: white;
  position: absolute;
  width: 100%;
  right: 0;
  border: 0;
  border-radius: 6px;
  max-height: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  min-width: 1rem !important;
}


.option {
  display: flex;
  align-items: center;
  padding-right: 16px;
  height: 48px;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}


.option-container {
  overflow-y: scroll;
  max-height: 250px;
}

.dropdown-menu.active {
  height: auto;
}


.option:hover,
.option.selected {
  background-color: #F3F6F9;
  color: #1BC5BD;
}

.option-container::-webkit-scrollbar {
  width: 8px;
  background-color: #eee;
}

.option-container::-webkit-scrollbar-thumb {
  background-color: #E1E1E1;
}


.search {
  border-bottom: 1px solid #E1E1E1;
  border-right: none;
  border-left: none;
  border-top: none;
  border-radius: 0px;
  height: 50px !important;
}

::placeholder {
  color: #B2B2B2 !important;
}

.place {
  padding-top: 10px;
  padding-right: 12px;
  font-size: 14px;
}

.place-selected {
  color: #242424;
  padding-top: 10px;
  padding-right: 12px;
  font-size: 14px;
}

.search-icon {
  padding-right: 16px;
  padding-left: 8px;
}

input {
  padding-right: 0px !important;
}

.form-control:focus, .form-select:focus, input:focus {
  box-shadow: none !important;
}

.input-icon-span {
  border-right: 0px !important;
  background-color: white !important;
}

.input-icon {
  border-left: 0px !important;
}

input.form-control::placeholder {
  font-size: 14px;
}

</style>
