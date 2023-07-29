<template>
  <div class="main-content">
    <h5>Main Page</h5>
    <div>
      <div class="position-fixed bottom-0 mb-3 d-flex justify-content-start w-100">
        <Messages class="" :messages="messages"/>
      </div>
      <Tab design="tab-text-primary" :vertical="false">
        <template #tabButton>
          <TabButton
              design="tab-text-primary"
              name="Upload"
              :index="0"
              targetIndex="0"
              :vertical="false"
          >
          </TabButton>
          <TabButton
              design="tab-text-primary"
              name="Table Example"
              index="1"
              targetIndex="1"
              :vertical="false"
          >
          </TabButton>
          <TabButton
              design="tab-text-primary"
              name="Person"
              index="2"
              targetIndex="2"
              :vertical="false"
          >
          </TabButton>

        </template>
        <template #tabBody>
          <TabBody class="p-0 m-0" :index="0" targetIndex="0">
            <div class="border rounded p-3">
              <UploadImage2
                  :default-values="vals"
                  tag="index"
                  url="/"
                  size="216"
              />
            </div>
          </TabBody>
          <TabBody class="p-0 m-0" index="1" targetIndex="1">
            <div>
              <div class="d-flex w-100">
                <div class="">
                  <NuxtLink to="">
                    <Button
                        design="btn-primary"
                        size="md"
                        sort="text-icon"
                        name="Add"
                    >
                      <template #icon>
                        <i class="fa-solid fa-plus"></i>
                      </template>
                    </Button>
                  </NuxtLink>
                </div>
              </div>
              <div>
                <table class="table base">
                  <thead>
                  <tr>
                    <th class="col ps-3">Number</th>
                    <th class="col-3">Title</th>
                    <th class="col-9">Icon</th>
                    <th style="text-align: left !important" class="col pe-4">
                     Operations
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td class="ps-4">1</td>
                    <td>Test</td>
                    <td><img src="data:image/png;base64,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" alt="icon" class="img"/></td>
                    <td class="pe-4">
                      <DropDown
                          dir="ltr"
                          dropdown="icon"
                          design="table"
                          style="margin-right: 150px"
                          class="dropdown-navbar1 dropdown-icon position-relative"
                      >
                        <template #dropBtn>
                          <DropDownButton
                              icon="fa-solid fa-ellipsis"
                              data-bs-target="#message-modal"
                              data-bs-toggle="dropdown"
                              name="تست"
                          >
                          </DropDownButton>
                        </template>
                        <template #menu>
                          <DropDownMenu scroll>
                            <DropDownSubItems

                            >
                              <span class="text-danger cursor">Remove</span>
                            </DropDownSubItems>
                            <DropDownSubItems>
                              <NuxtLink
                                  class="w-100"
                                  to=""
                              >
                                Edit
                              </NuxtLink>
                            </DropDownSubItems>
                          </DropDownMenu>
                        </template>
                      </DropDown>
                    </td>
                  </tr>
                  <tr>
                    <td class="ps-4">2</td>
                    <td>Test</td>
                    <td><img src="data:image/png;base64,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" alt="icon" class="img"/></td>
                    <td class="pe-4">
                      <DropDown
                          dir="ltr"
                          dropdown="icon"
                          design="table"
                          style="margin-right: 150px"
                          class="dropdown-navbar1 dropdown-icon position-relative"
                      >
                        <template #dropBtn>
                          <DropDownButton
                              icon="fa-solid fa-ellipsis"
                              data-bs-target="#message-modal"
                              data-bs-toggle="dropdown"
                              name="تست"
                          >
                          </DropDownButton>
                        </template>
                        <template #menu>
                          <DropDownMenu scroll>
                            <DropDownSubItems

                            >
                              <span class="text-danger cursor">Remove</span>
                            </DropDownSubItems>
                            <DropDownSubItems>
                              <NuxtLink
                                  class="w-100"
                                  to=""
                              >
                                Edit
                              </NuxtLink>
                            </DropDownSubItems>
                          </DropDownMenu>
                        </template>
                      </DropDown>
                    </td>
                  </tr>
                  <tr>
                    <td class="ps-4">3</td>
                    <td>Test</td>
                    <td><img src="data:image/png;base64,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" alt="icon" class="img"/></td>
                    <td class="pe-4">
                      <DropDown
                          dir="ltr"
                          dropdown="icon"
                          design="table"
                          style="margin-right: 150px"
                          class="dropdown-navbar1 dropdown-icon position-relative"
                      >
                        <template #dropBtn>
                          <DropDownButton
                              icon="fa-solid fa-ellipsis"
                              data-bs-target="#message-modal"
                              data-bs-toggle="dropdown"
                              name="تست"
                          >
                          </DropDownButton>
                        </template>
                        <template #menu>
                          <DropDownMenu scroll>
                            <DropDownSubItems

                            >
                              <span class="text-danger cursor">Remove</span>
                            </DropDownSubItems>
                            <DropDownSubItems>
                              <NuxtLink
                                  class="w-100"
                                  to=""
                              >
                                Edit
                              </NuxtLink>
                            </DropDownSubItems>
                          </DropDownMenu>
                        </template>
                      </DropDown>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <Pagination
                  class="pag"
                  page="1"
                  total-items="10"
                  items-per-page="7"
              />
            </div>
          </TabBody>
          <TabBody class="p-0 m-0" index="2" targetIndex="2">
            <form  class="needs-validation" novalidate>
            <div class="row col-lg-6 col-12 mx-auto">
              <div class="col-lg-6 col-12 p-2">
                <Input
                  design="solid-panel"
                  label="Full Name"
                />
              </div>
              <div class="col-lg-6 col-12 p-2">
                <Input
                  design="solid-panel"
                  label="Academic Rank"
                />
              </div>
              <div class="col-lg-6 col-12 p-2">
                <Input
                  design="solid-panel"
                  label="Educational background"
                />
              </div>
              <div class="col-lg-6 col-12 p-2">
                <Input
                  design="solid-panel"
                  label="organization level"
                />
              </div>
              <div class="col-lg-6 col-12 p-2">
                <Input
                  ltr
                  design="solid-panel"
                  label="Email"
                />
              </div>
              <div class="col-lg-6 col-12 p-2">
                <Input
                  design="solid-panel"
                  label="Phone"
                />
              </div>
              <div class="col-12 ps-2">
                <label class="form-label">Picture</label>
                <UploadImage2
                  :default-values="vals"
                  single
                  no-browse
                  size="122"
                />
              </div>
              <div class="d-flex justify-content-end mt-3">
                <Button
                  submit
                  class="btn-sub"
                  name="submit"
                  design="btn-primary"
                  sort="text"
                  size="md"
                ></Button>
              </div>
            </div>
          </form>
          </TabBody>


        </template>
      </Tab>
    </div>
  </div>
</template>

<script setup>
import Tab from "~/components/tab/Tab.vue";
import TabBody from "~/components/tab/TabBody.vue";
import TabButton from "~/components/tab/TabButton.vue";
import {onBeforeMount, ref} from "vue";
import UploadImage2 from "~/components/input/UploadImage2.vue";
import Select from "~/components/input/Select.vue";
import Check from "~/components/input/Check.vue";
import Badge from "~/components/badge/Badge.vue";
import {useFetch, useAsyncData, refreshNuxtData} from "nuxt/app";
import Pagination from "~/components/Pagination.vue";
import DropDown from "~/components/dropdown/DropDown.vue";
import DropDownSubItems from "~/components/dropdown/DropDownSubItems.vue";
import DropDownMenu from "~/components/dropdown/DropDownMenu.vue";
import DropDownButton from "~/components/dropdown/DropDownButton.vue";
import jdf from "~/public/js/jdf.js";
import Messages from "~/components/message/Messages.vue";
import Button from "~/components/button/Button.vue";
import Input from "~/components/input/Input.vue";

const runtimeConfig = useRuntimeConfig();
definePageMeta({
  layout: "panel",
});


const vals = [
  {
    id: "1",
    image: "data:image/jpeg;base64,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"
  }
]

</script>

<style scoped lang="scss">
@import "../../public/css/colors";


.contain {
  margin: 32px;
}

.search {
  width: 230px;
}

.order {
  width: 145px;
  margin-right: 15px;
}

.filter {
  width: 145px;
  margin-right: 15px;
}

.add {
  margin-right: 50px;
}

.table {
  margin-top: 24px;
}

.pag {
  margin-top: 24px;
}

.tab-content {
  margin: 0px !important;
  padding: 0px !important;
}

.img {
  height: 60px !important;
  width: 60px !important;
}
</style>
