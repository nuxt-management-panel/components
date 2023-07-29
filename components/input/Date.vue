<template>
  <div>
    <label class="form-label p-0" v-if="label">{{ label }}</label>
    <div v-if="noYear" class="d-flex">
      <div class="col-6 day ">
        <Select no-search v-model:default-value="day2" @selected-value="emitDay" :values="day" :design="design"
                placeholder="روز"/>
      </div>
      <div class="col-6 month pe-0">
        <Select no-search v-model:default-value="month2" @selected-value="emitMonth" :values="monthUpdate"
                :design="design" placeholder="ماه"/>
      </div>
    </div>

    <div v-else class="d-flex">
      <div class="col-4 day">
        <Select no-search v-model:default-value="dayPicked" @selected-value="dayPick" :values="day" :design="design"
                placeholder="روز"/>
      </div>
      <div class="col-4 month">
        <Select no-search v-model:default-value="monthPicked" @selected-value="monthPick" :values="monthUpdate"
                :design="design" placeholder="ماه"/>
      </div>
      <div class="col-4">
        <Select no-search v-model:default-value="yearPicked" @selected-value="yearPick" :values="year" :design="design"
                placeholder="سال"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Select from "~/components/input/Select.vue";
import {ref, onMounted} from "vue";
import jdf from "~/public/js/jdf.js"

const props = defineProps({
  design: String,
  required: Boolean,
  label: String,
  defaultValue: String,
  noYear: Boolean,
  noYearDay: String,
  noYearMonth: String
})

const day2 = ref('')
const month2 = ref('')


day2.value = props.noYearDay
month2.value = props.noYearMonth
const day = ref([])
const year = ref([])

const month = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
]


for (let i = 1; i < 32; i++) {
  day.value.push(i)
}

for (let i = 1382; i < 1403; i++) {
  year.value.push(i)
}

const dayPicked = ref('')
const monthPicked = ref('')
const yearPicked = ref('')

if (props.defaultValue) {
  dayPicked.value = jdf.gregorian_to_jalali(props.defaultValue)[2]
  monthPicked.value = jdf.gregorian_to_jalali(props.defaultValue)[3]
  yearPicked.value = jdf.gregorian_to_jalali(props.defaultValue)[0]
}

function dayPick(item) {
  dayPicked.value = item
}

function monthPick(item) {
  monthPicked.value = month.indexOf(item)
}

function yearPick(item) {
  yearPicked.value = item
}


const date = computed(() => {
  let x = 0
  if (typeof (monthPicked.value) == 'string')
    x = month.indexOf(monthPicked.value)
  else
    x = monthPicked.value
    return jdf.jalali_to_gregorian(parseInt(yearPicked.value), x + 1, parseInt(dayPicked.value))
})


const monthUpdate = computed(() => {
  return dayPicked.value == 31 ? month.splice(0, 6) : month
})

const emit = defineEmits(['date'])


watch(() => date.value, (first, second) => {
  let st = date.value[0] + '-' + date.value[1] + '-' + date.value[2]
  emit('date', st)
  console.log(st)
});


function emitDay(v) {
  emit('day', v)
}

function emitMonth(v) {
  emit('month', v)
}
</script>

<style lang="scss" scoped>
@import 'public/css/_colors.scss';

.form-label {
  color: map-get($themeColors, gray02);
  font-size: 14px;
  margin-bottom: 6px !important;
}

.day {
  padding-left: 14px;
}

.month {
  padding-left: 14px;
}

label {
  font-size: 14px;
}

</style>
