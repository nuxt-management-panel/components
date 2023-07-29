<template>
  <div class="has-validation">
    <label v-if="label" class="form-label p-0">{{ label }}</label>
    <div class="row m-0">
      <div :class="design ? styles[design] : styles['base']" v-if="$slots.iconRight" class="icon-right">
        <slot name="iconRight"></slot>
      </div>
      <div
          :class="[design ? styles[design] : styles['base'], design === 'solid-panel' || design === 'solid-site' ? 'text-right-border' : null, separateRight ? 'separate-right' : null]"
          v-if="$slots.textRight" class="text-right">
        <slot name="textRight"></slot>
      </div>
      <!--Object.keys($slots).length !== 0-->
      <div
          class="p-0"
          :class="[$slots.iconRight || $slots.iconLeft ? 'col p-0' : null, $slots.textRight || $slots.textLeft ? 'slot-text col': null]">
        <input
            v-if="type === 'date'"
            :id="'datepicker_'+id"
            :data-name="'datepicker_'+id"
            :value="dateValue(value)"
            :placeholder="placeholder"
            class="form-control"
            :class="[design ? styles[design] : styles['base'], $slots.iconRight ? 'input-icon-right' : null, $slots.iconLeft ? 'input-icon-left': null, $slots.textRight ? 'input-text-right' : null, $slots.textLeft ? 'input-text-left' : null, ltr ? 'ltr' : null, nav ? 'input-nav' : null, table ? 'input-table' : null, separateRight ? 'separate-right' : null, separateLeft ? 'separate-left' : null]"
            :disabled="true ? disabled : null"
            :required="required"
        >
        <input
            v-else-if="type === 'clock'"
            :type="type"
            :value="value"
            @input="getValue($event)"
            :placeholder="placeholder"
            class="clockpicker form-control"
            :class="[design ? styles[design] : styles['base'], $slots.iconRight ? 'input-icon-right' : null, $slots.iconLeft ? 'input-icon-left': null, $slots.textRight ? 'input-text-right' : null , $slots.textLeft ? 'input-text-left' : null, ltr ? 'ltr' : null, nav ? 'input-nav' : null, table ? 'input-table' : null, separateRight ? 'separate-right' : null, separateLeft ? 'separate-left' : null]"
            :disabled="true ? disabled : null"
            :required="required"
            :maxlength="maxlength"
            onkeydown="return false"
            @keypress.prevent

        >
        <input
            v-else
            @keyup="charCount($event)"
            :type="type"
            :value="value"
            @input="getValue($event)"
            :placeholder="placeholder"
            class="form-control"
            :class="[design ? styles[design] : styles['base'], $slots.iconRight ? 'input-icon-right' : null, $slots.iconLeft ? 'input-icon-left': null, $slots.textRight ? 'input-text-right' : null , $slots.textLeft ? 'input-text-left' : null, ltr ? 'ltr' : null, nav ? 'input-nav' : null, table ? 'input-table' : null, separateRight ? 'separate-right' : null, separateLeft ? 'separate-left' : null]"
            :disabled="true ? disabled : null"
            :required="required"
            :readonly="readonly"
            :maxlength="maxlength"
        >
      </div>

      <div :class="design ? styles[design] : styles['base']" v-if="$slots.iconLeft" class="icon-left">
        <slot name="iconLeft"></slot>
      </div>
      <div
          :class="design ? styles[design] : styles['base'], design === 'solid-panel' || design === 'solid-site' ? 'text-left-border' : null, separateLeft ? 'separate-left' : null"
          v-if="$slots.textLeft" class="text-left">
        <slot name="textLeft"></slot>
      </div>
      <div>
        <span v-if="maxlength" class="counter">{{ counter }}/{{ maxlength }}</span>
        <span class="help-text">{{ help }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Input",
  props: {
    value: String,
    label: String,
    type: String,
    placeholder: String,
    design: String,
    disabled: Boolean,
    maxlength: Number,
    help: String,
    ltr: Boolean,
    nav: Boolean,
    table: Boolean,
    separateRight: Boolean,
    separateLeft: Boolean,
    required: Boolean,
    readonly:Boolean
  },
  /*props: ['value', 'label', 'type', 'placeholder', 'design', 'disabled', 'maxlength', 'help', 'ltr', 'nav', 'table', 'separateRight', 'separateLeft', 'required'],*/
  emits: ['update:value'],
  data() {
    return {
      id: null,
      convertDate: false,
      styles: {
        'base': '',
        'solid-panel': 'form-solid-panel',
        'solid-site': 'form-solid-site'
      },
      counter: 0
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
    if (this.type === 'date') {
      this.id = Math.floor(Math.random() * 999999999999)
      let this_ = this;
      setTimeout(function () {
        const date = new mds.MdsPersianDateTimePicker(document.getElementById('datepicker_' + this_.id), {
          targetTextSelector: '#datepicker_' + this_.id,
          dateFormat: 'yyyy-MM-dd',
          textFormat: 'yyyy-MM-dd',
          persianNumber: false,
        })
        console.log(date)
      }, 500);
    } else if (this.type === 'clock') {

      $('.clockpicker').clockpicker()
          .find('input').change(function () {
        // TODO: time changed
        console.log(this.value);
      });
      $('#demo-input').clockpicker({
        autoclose: true
      });

      /* if (something) {
         // Manual operations (after clockpicker is initialized).
         $('#demo-input').clockpicker('show') // Or hide, remove ...
             .clockpicker('toggleView', 'minutes');
       }*/
    }
  },
  methods: {
    dateValue(value) {
      /*if (this.value && this.value !== '') {
        this.convertDate = true
        const date = jdf.gregorian_to_jalali(this.value)
        return date[0] + '-' + date[1] + '-' + date[2]
      }*/
      return value
    },
    getValue(event) {
      if (this.type === 'file')
        this.$emit('update:value', event.target.files[0])
      else
        this.$emit('update:value', event.target.value)
    },
    charCount(event) {
      this.counter = event.target.value.length
    }
  }
}

</script>


<style lang="scss" scoped>
@import 'public/css/_colors.scss';


.ltr {
  direction: ltr;
}

input[type=text].form-control.input-icon-right.ltr {
  padding-left: 16px !important;
}

input[type=text].form-control.input-icon-left.ltr {
  padding-left: 0 !important;
}


.text-left-border {
  border-right: 1px solid map-get($themeColors, gray04) !important;
}

.text-right-border {
  border-left: 1px solid map-get($themeColors, gray04) !important;
}

.text-left {
  color: map-get($themeColors, gray02);
  display: flex;
  width: auto;
  height: 44px;
  align-items: center;
  border: 1px solid map-get($themeColors, gray04);
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
  padding-right: 16px;
  padding-left: 16px;
}

.text-right {
  color: map-get($themeColors, gray02);
  display: flex;
  width: auto;
  height: 44px;
  align-items: center;
  border: 1px solid map-get($themeColors, gray04);
  border-left: none;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  padding-right: 16px;
  padding-left: 16px;
}

.slot-text {
  display: flex;
  padding: 0;
}

.input-text-right {
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-right: 1px solid;

}

.input-text-left {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
  border-left: 0;
}


.input-icon-left {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-left: 1px solid transparent !important;
}

input.input-icon-right {
  padding: 0px;
}

.input-icon-right {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-right: 1px solid transparent !important;
}

.form-control {
  border-color: map-get($themeColors, gray04);
  height: 44px !important;
  padding-right: 16px;
  padding-left: 16px;
}

.icon-right {
  color: #818181;
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
  border: 1px solid map-get($themeColors, gray04);
  border-left: none;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  padding-right: 16px;
  padding-left: 16px;
  height: auto;

}

.icon-right :slotted(i) {
  font-size: 18px !important;
}

.icon-left :slotted(i) {
  font-size: 18px !important;
}

.icon-left {
  color: map-get($themeColors, gray02);
  display: flex;
  align-items: center;
  width: auto;
  justify-content: center;
  border: 1px solid map-get($themeColors, gray04);
  border-right: none;
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
  padding-right: 16px;
  padding-left: 16px;
  height: auto;
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

input.form-control::placeholder {
  color: #B2B2B2 !important;
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

.dropdown:has(> .form-style1) {
  height: 50px !important;
}

.counter {
  float: left;
  padding-right: 16px !important;
  font-size: 15px;
  color: #B2B2B2;
  padding-top: 4px;
}

.help-text {
  font-size: 12px;
  float: right !important;
  color: map-get($themeColors, gray03);
  padding-top: 4px;
}

.form-label {
  color: map-get($themeColors, gray02);
  font-size: 14px;
  margin-bottom: 6px !important;
}

input::placeholder {
  font-size: 14px !important;
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

.form-control:hover, .form-select:hover, input:hover {
  border-color: map-get($themeColors, primary) !important;
}

.form-control.form-solid-panel:hover, .form-select:hover, input:hover {
  border-color: map-get($themeColors, primary) !important;
}

.form-control.form-solid-site:hover, .form-select:hover, input:hover {
  border-color: map-get($themeColors, primary) !important;
}


.input-nav {
  height: 50px !important;
}

.input-table {
  height: 32px !important;
}

input.input-icon-right {
  padding: 4px !important;
}

.separate-left.input-text-left {
  border-radius: 5px !important;
  margin-left: 6px;
}

.separate-left.text-left {
  border: 0 !important;
  border-radius: 5px;
}

.separate-right.input-text-right {
  border-radius: 5px !important;
  margin-right: 6px;
}

.separate-right.text-right {
  border: 0 !important;
  border-radius: 5px;
}

.separate-left.form-control:not(.form-solid-panel):not(.form-solid-site) {
  border-left: 1px solid map-get($themeColors, gray04);
}

.separate-right.text-right:not(.form-solid-panel):not(.form-solid-site) {
  border: 1px solid map-get($themeColors, gray04) !important;
  border-radius: 5px;
}

.separate-left.text-left:not(.form-solid-panel):not(.form-solid-site) {
  border: 1px solid map-get($themeColors, gray04) !important;
  border-radius: 5px;
}

input[type=clock] {
  caret-color: transparent;
}

input[type=date] {
  caret-color: red !important;
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


</style>
