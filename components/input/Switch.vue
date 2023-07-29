<template>
  <div class="form-check form-switch has-validation">
    <input class="form-check-input" type="checkbox" role="switch" :id="'switch_'+ id" :required="required"
           :disabled="disabled" :checked="is_checked" @click="is_checked = !is_checked ,$emit('check', is_checked)">
    <label class="form-check-label" :for="'switch_'+ id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "Switch",
  props: {
    required: Boolean,
    checked: Boolean,
    label: String,
    disabled: Boolean
  },
  data() {
    return {
      id: Math.floor(Math.random() * 999999999999),
      is_checked: this.checked
    }
  },
  mounted() {
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
  }
}
</script>

<style lang="scss" scoped>
@import "public/css/_colors.scss";

.form-check-input {
  height: 20px;
  width: 38px;
  background-color: map-get($themeColors, gray04);
  border-color: transparent;
}

.form-check-input:disabled {
  pointer-events: none;
  filter: none;
  opacity: 1;
}

.form-check-input:checked {
  color: black;
  background-color: map-get($themeColors, primary);
  border-color: map-get($themeColors, primary);
}

.form-check-input:not(:checked) {
  background-color: map-get($themeColors, gray05);
  background-image: url('public/icons/circle-grey03.svg') !important;
  background-size: 35%;
  background-position: 90% 50%;
}

.form-check-input:not(:checked):disabled {
  background-color: map-get($themeColors, gray04);
  background-image: url('public/icons/circle-grey02.svg') !important;
  background-size: 35%;
  background-position: 90% 50%;
}


.form-check-input:focus {
  border-color: map-get($themeColors, primary);
  box-shadow: none;
}

.form-switch .form-check-input:focus:not(:checked) {
  border-color: transparent;
  background-image: url('public/icons/circle.svg');
}

.form-check-label {
  color: map-get($themeColors, gray02);
  padding-top: 4px;
  padding-right: 4px;
  font-size: 14px;
}

.form-check-input:disabled ~ .form-check-label, .form-check-input[disabled] ~ .form-check-label {
  cursor: default;
  opacity: 1;
  color: map-get($themeColors, gray02) !important;
}


.form-check-input.is-invalid, .was-validated .form-check-input:invalid {
  border: 1px solid map-get($themeColors, danger) !important;
}

.form-check-input.is-invalid, .was-validated .form-check-input:focus {
  box-shadow: none !important;
}

.form-check-input.is-valid ~ .form-check-label, .was-validated .form-check-input:valid ~ .form-check-label {
  color: map-get($themeColors, gray02);
}

.form-check-input.is-valid, .was-validated .form-check-input:valid:checked {
  background-color: map-get($themeColors, primary);
}

.form-check-input.is-invalid ~ .form-check-label, .was-validated .form-check-input:invalid ~ .form-check-label {
  color: map-get($themeColors, gray02) !important;
}


.form-check-input:disabled:checked {
  border-color: map-get($themeColors, gray04) !important;
  background-color: map-get($themeColors, gray04);
}


</style>
