<template>
  <div>
    <label class="form-label m-0 ps-0">{{ title }}</label>
    <input type="text" class="form-control"
           placeholder="جستجو"
           v-on:keyup="search"
           v-model="searchModel"
           data-bs-toggle="dropdown" data-bs-auto-close="outside">
    <ul class="dropdown-menu dropdown-menu-end col-md-8 p-3 overflow-auto scrollbar">
      <div class="row m-0">

        <div v-for="(item,index) in data">
          <span class="small text-secondary mt-3 mb-2">{{ item.title }}</span>
          <div v-for="obj in search()[index]"
               class="form-check ps-3 w-75">
            <div v-if="item.type === 'regular'">

              <Check
                  class="align-self-center"
                  :label="obj[item.key]"
                  :id="obj.id"
                  @check="$emit('select',obj,null)"
                  :checked="isCheck(obj)"
              />
            </div>
            <div v-else-if="item.type === 'nested'">
              <label class="small m-0">{{ obj[item.key] }}</label>
              <div class="border-start ms-4">
                <div v-if="obj[item.nested]" v-for="nested in obj[item.nested]" class="d-flex">
                  <hr class="align-self-center">
                  <Check
                      class="align-self-center"
                      :label="nested[item.nested_key]"
                      :id="nested.id"
                      @check="$emit('select',obj,nested)"
                      :checked="isCheck(obj)"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>
    </ul>
  </div>
</template>

<script>
import Check from "./Check";

export default {
  name: "Search",
  components: {Check},
  props: ['title', 'data', 'checklist'],
  data() {
    return {
      searchModel: "",
    }
  },
  methods: {
    search() {
      let output = []
      let _this = this
      this.data.forEach(function (item) {
        if (item.data) {
          let result = item.data.filter(obj => obj[item.key].includes(_this.searchModel))
          output.push(result)
        } else
          output.push(item.data)
      })

      return output
    },
    isCheck(item) {
      /*let obj = this.checklist.find(obj =>
          obj.user === item.user &&
          obj.part === item.part &&
          obj.group === item.group &&
          obj.type === item.type
      )
      return !!obj;*/
    }
  }
}
</script>

<style scoped>
hr {
  width: 20px;
}

.dropdown-menu {
  height: 350px !important;
}
</style>