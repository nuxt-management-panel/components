<template>
  <div>
    <div class="form-check">
      <!-- i create emit for implement click instead of native @click, because @click execute twice -->
      <input :disabled="disabled" class="form-check-input cursor" type="checkbox" @click="$emit('check')" :checked="checked"
             :id="'check_'+id" :required="required">
      <label class="form-check-label cursor" :for="'check_'+id">
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script>
import Input from "./Input";

export default {
  name: "Check",
  components: {Input},
  props: ['checked', 'label', 'required', 'disabled'],
  data() {
    return {
      id: Math.floor(Math.random() * 999999999999)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'public/css/_colors.scss';

.form-check-label {
  color: map-get($themeColors, gray02);
}

label {
  font-size: 14px;
  padding-right: 4px;
}

input {
  border-radius: 2px !important;
  font-size: 18px;
}

input:checked {
  background-color: map-get($themeColors, primary);
}

input:hover {
  outline: 8px solid map-get($lightColors, primary);
  -moz-outline-radius: 100px !important;
}

.form-check-input:checked[type=checkbox] {
  border-color: map-get($themeColors, primary);
  box-shadow: none !important;
}

.form-check-input:not(:checked)[type=checkbox] {
  border-color: map-get($themeColors, gray04);
  box-shadow: none !important;
}

.form-check-input.is-invalid, .was-validated .form-check-input:invalid {
  border-color: map-get($themeColors, danger) !important;
}

.form-check-input.is-valid ~ .form-check-label, .was-validated .form-check-input:valid ~ .form-check-label {
  color: map-get($themeColors, gray02);
}

.form-check-input.is-valid, .was-validated .form-check-input:valid:checked {
    background-color: map-get($themeColors, primary);
}

.form-check-input.is-invalid ~ .form-check-label, .was-validated .form-check-input:invalid ~ .form-check-label {
  color: map-get($themeColors, gray02)!important;
}


.form-check-input:not(:checked):disabled {
  background-color: map-get($themeColors, gray04);
  border-color: map-get($themeColors, gray04);
}

.form-check-input:disabled:checked {
  border-color: map-get($themeColors, gray04) !important;
  background-color: map-get($themeColors, gray04);
}




</style>
