<template>

  <div class="has-validation">
    <label
        v-if="label"
        for="exampleFormControlTextarea1"
        class="form-label">{{ label }}</label>
    <textarea :class="[design ? styles[design] : styles['base'],ltr ? 'ltr':null,]"
              class="form-control w-100 h-100"
              id="exampleFormControlTextarea1"
              :placeholder="placeholder"
              :required="required"
              :disabled="disabled"
              :value="value"
    ></textarea>
  </div>

</template>

<script setup>

import {onMounted} from "vue";

const props = defineProps({
  ltr: Boolean,
  label: String,
  value: String,
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  design: String,
})

const styles = {
  'base': '',
  'solid-panel': 'form-solid-panel',
  'solid-site': 'form-solid-site'
}


onMounted(() => {
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

.form-label {
  color: map-get($themeColors, gray02);
  font-size: 14px;
  margin-bottom: 6px !important;
}


.form-control:focus, .form-select:focus, input:focus {
  border-color: map-get($themeColors, primary) !important;
  box-shadow: 0 0 4px rgba(178, 178, 178, 0.5);
}

.form-control:focus.form-solid-panel, .form-select:focus, input:focus {
  border: 1px solid map-get($themeColors, primary) !important;
  box-shadow: 0 0 4px rgba(178, 178, 178, 0.5);
  background-color: white !important;
}

.form-control:focus.form-solid-site, .form-select:focus, input:focus {
  border: 1px solid map-get($themeColors, primary) !important;
  box-shadow: 0 0 4px rgba(178, 178, 178, 0.5);
  background-color: white !important;
}

textarea::placeholder {
  font-size: 14px !important;
}

.form-control:hover, .form-select:hover, input:hover {
  border-color: map-get($themeColors, primary) !important;
}

.form-control.form-solid-panel:hover, .form-select:hover, input:hover {
  border-color: map-get($themeColors, primary) !important;
}

.form-control.form-solid-site:hover, .form-select:hover, input:hover {
  border-color: map-get($themeColors, primary) !important;
}

.form-solid-site {
  background-color: map-get($themeColors, gray05) !important;
  border: 1px solid map-get($themeColors, gray05)
}

.form-control.form-solid-site::placeholder {
  color: map-get($themeColors, gray03) !important;
}

.form-solid-panel {
  background: map-get($themeColors, secondary) !important;
  border: 1px solid #F3F6F9;
}

.form-control.form-solid-panel::placeholder {
  color: map-get($themeColors, gray03) !important;
}

.form-control.form-solid-panel:disabled::placeholder {
  color: map-get($themeColors, gray03) !important;
}

.form-control.form-solid-site:disabled::placeholder {
  color: map-get($themeColors, gray03) !important;
}

.form-control.is-invalid, .was-validated .form-control:invalid {
  background-image: none !important;
  padding-left: 0 !important;
}

.form-control.is-invalid, .was-validated .form-control:invalid:focus {
  border-color: map-get($themeColors, primary) !important;
  box-shadow: 0 0 4px rgba(178, 178, 178, 0.5);
}

.form-control.is-valid, .was-validated .form-control:valid {
  background-image: none !important;
  padding-left: 16px;
}

.form-control.is-invalid.form-solid-panel, .was-validated .form-control:invalid {
  border: 1px solid map-get($themeColors, danger) !important;
  padding-left: 16px !important;
}

.form-control.is-invalid, .was-validated .form-control:invalid:not(.form-solid-panel):not(.form-solid-site) {
  background-color: inherit !important;
}

.form-control.is-invalid.form-solid-site, .was-validated .form-control:invalid {
  border: 1px solid map-get($themeColors, danger) !important;
  padding-left: 16px !important;
}

.form-control.is-valid, .was-validated .form-control:valid {
  border-color: map-get($themeColors, gray04) !important;

}

.form-control.is-valid, .was-validated .form-control:valid:hover {
  border: 1px solid map-get($themeColors, primary) !important;
}

.form-control.is-valid, .was-validated .form-control:valid:focus {
  border: 1px solid map-get($themeColors, primary) !important;
  box-shadow: 0 0 4px rgba(178, 178, 178, 0.5);
}


.ltr {
  direction: ltr;
}

</style>
