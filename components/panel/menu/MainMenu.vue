<template>
  <div class="d-flex flex-row menu-container">
    <div class="d-flex flex-column flex-shrink-0 bg-white align-items-center
         menu-items nav nav-flush flex-row mb-auto text-center p-0">
      <ItemMenu class="cursor" v-for="item in data" @click="currentMenu = item" :item="item"
                :currentItem="currentMenu"/>
    </div>

    <div v-if="currentMenu.name" class="sticky-top p-0 overflow-auto bg-white scrollbar px-4" id="wrapper">
      <h5 class="my-4">{{ currentMenu.name }}</h5>
      <ItemSubMenu v-for="(item,index) in currentMenu.submenu" :item="item" :index="index" :currentPath="currentPath"/>

    </div>

  </div>
</template>

<script>
import ItemMenu from "./ItemMenu";
import ItemSubMenu from "./ItemSubMenu";
import data from 'assets/data/old-menu.json'

export default {
  components: {ItemMenu, ItemSubMenu},
  data() {
    return {
      data: data,
      currentMenu: data,
      currentPath: this.$route.path
    }
  },
  mounted() {
    let menu = data.find((d0) =>
        d0.submenu.find((d1) =>
            d1.link !== "" ? d1.link === this.currentPath : d1.submenu.find((d2) => d2.link === this.currentPath)
        )
    )

    if (menu != null) {
      this.currentMenu = menu;
    }


  }
}


</script>

<style scoped>


#wrapper {
  width: 280px;
  height: 100vh;
  border-right: 1px dashed #c7c6c6;
  white-space: nowrap
}

.menu-items {
  z-index: 1000;
  height: 100vh;
  width: 100px;
}

#wrapper {
  transition: transform 0.5s;
}

#wrapper.collapse.show {
  transform: translate(0, 0);
}

#wrapper.collapsing {
  transform: translate(106%, 0);
}

#wrapper .item .bi-chevron-down {
  transform: rotate(0deg);
}

#wrapper .item.collapsed .bi-chevron-down {
  transform: rotate(-90deg);
}

#wrapper .bi-chevron-down {
  transition: all 0.3s;
}

#wrapper .item .bi-chevron-left {
  transform: rotate(-90deg);
}

#wrapper .item.collapsed .bi-chevron-left {
  transform: rotate(0deg);
}

#wrapper .bi-chevron-left {
  transition: all 0.3s;
}


.menu-container {
  height: 100vh !important;
}

.menu-items {
  height: 100% !important;
  overflow-y: hidden;
  overflow-x: hidden;
}


@media only screen and (max-width: 992px) {
  #wrapper {
    width: 275px !important;
  }
}

@media only screen and (max-width: 576px) {
  #wrapper {
    width: 220px !important;
  }
}

</style>