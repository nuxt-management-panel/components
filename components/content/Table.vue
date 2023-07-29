<template>

  <div class="overflow-auto scrollbar">
    <table class="table table-borderless table-responsive">
      <thead class="d-block rounded m-1">
      <tr class="w-100 d-flex rounded">

        <th v-for="(header,index) in config.headers"
            :class="[{'rounded-start':index === 0} , {'rounded-end':index === config.headers.length -1}],
            config.cols[index]"
            class="main-bg-color col-2 col-md-1 text-center d-flex justify-content-center align-items-center">
          {{ header }}
        </th>

      </tr>
      </thead>
      <tbody>

      <NuxtLink :to="url+item.id" v-for="(item,counter) in config.data"
                class="rounded d-flex m-1 cursor table-row-color">
        <td v-for="(key,index) in config.body.keys"
            class="text-center d-flex justify-content-center align-items-center"
            :class="[{'rounded-start':index === 0} , {'rounded-end':index === config.headers.length -1}],
            config.cols[index]">

          <span v-if="key === 'counter'">
            {{ counter + 1 }}
          </span>
          <span v-else-if="key ==='action'" v-for="action in config.body.actions" class="mx-1">
            <div v-if="action === 'delete'">
              <div data-bs-toggle="dropdown">
                  <i data-bs-toggle="tooltip"
                     data-bs-placement="top"
                     title="حذف"
                     class="fa-solid text-danger cursor fa-trash-can align-self-center"></i>
              </div>
              <div class="dropdown-menu dropdown-menu-start ps-2 pe-2">
                  <p class="small p-0">رکورد اطلاعاتی حذف شود؟</p>
                  <div class="d-flex justify-content-center">
                      <button type="button" class="btn btn-sm btn-outline-main mx-1"
                              data-bs-dismiss="dropdown">انصراف
                      </button>
                      <button @click="$emit('remove',item)" type="button"
                              class="btn btn-sm btn-danger mx-1">حذف
                      </button>
                  </div>
              </div>
            </div>
            <div v-if="action === 'edit'">
              <i class="fa-solid fa-pen text-success cursor" @click="$emit('edit',item)"></i>
            </div>
          </span>
          <span v-else-if="key === 'icon' || key === 'image'">
            <img v-if="item[key]" :src="item[key]" alt="" width="40" height="40" class="rounded-circle">
          </span>
          <span class="w-100" v-else>
            {{ getData(item, key) }}
          </span>
        </td>
      </NuxtLink>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ['config', 'url'],
  mounted() {

  },
  methods: {
    getData(item, key) {
      let out = item
      key.split('.').forEach((e) => out = out[e])
      if (out !== 'null')
        return out
      else
        return ''
    }
  }
}


</script>

<style scoped>
tbody, tr {
  font-size: 14px !important;
}

.table-row-color:hover {
  background-color: rgb(27 197 189 / 10%) !important;
}
</style>