<template>
  <div class="form-check pb-2">
    <input :disabled="disabled" @click="$emit('check')" class="form-check-input cursor" :checked="checked"
           type="radio" :name="name" :id="'radio_'+ id" :required="required">
    <label class="form-check-label cursor" :for="'radio_'+ id">
      {{ label }}
    </label>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";


const id = ref(Math.floor(Math.random() * 999999999999))

const props = defineProps({
  label: String,
  name: String,
  disabled: String,
  checked: Boolean,
  required: Boolean
})

onMounted(() => {
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

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

</script>

<style lang="scss" scoped>
@import 'public/css/_colors.scss';

.form-check-input:checked[type=radio] {
  border-color: map-get($themeColors, primary) !important;
  background-size: 55%;
  box-shadow: none !important;
  background-image: url("public/icons/Ellipse12.svg") !important;
}

.form-check-input:hover[type=radio] {
  outline: 8px solid map-get($lightColors, primary);
}

.form-check-label {
  padding-right: 4px;
  padding-top: 3px !important;
  font-size: 14px;
  color: map-get($themeColors, gray02) #818181;
}

.form-check-input:not(:checked):disabled {
  background-color: map-get($themeColors, gray04);
  border-color: map-get($themeColors, gray04);
  background-size: 55%;
  background-image: url("public/icons/Ellipse10.svg") !important;
}

.form-check-input:disabled:checked {
  border-color: map-get($themeColors, gray04) !important;
  background-size: 55%;
  background-image: url("public/icons/Ellipse10.svg") !important;
}


.form-check-input:disabled:hover {
  outline: none;
}


.form-check-input.is-invalid ~ .form-check-label, .was-validated .form-check-input:invalid ~ .form-check-label {
  color: map-get($themeColors, gray02) !important;
}

.was-validated .form-check-input:valid:checked {
  background-color: map-get($themeColors, white);
  border-color: map-get($themeColors, primary);
}

.was-validated .form-check-input:valid {
  background-color: map-get($themeColors, white);
  border-color: map-get($themeColors, gray04);
}

.form-check-input.is-valid ~ .form-check-label, .was-validated .form-check-input:valid ~ .form-check-label {
  color: map-get($themeColors, gray02);
}

.form-check-input {
  width: 20px;
  height: 20px;
  border: 2px solid map-get($themeColors, gray04) !important;
  background-color: map-get($themeColors, white);
}


.form-check-input:focus {
  border-color: map-get($themeColors, primary);
  outline: 8px solid map-get($lightColors, primary);
}

.form-check-input.is-invalid, .was-validated .form-check-input:invalid {
  border-color: map-get($themeColors, danger) !important;
}
</style>
