<template>
  <div class="footer-common">
    <ul>
      <li v-for="item in footerMenu" :key="item.name">
        <h4>{{ item.title }}</h4>
        <a
          target="_blank"
          :href="links.link"
          v-for="links in item.menus"
          :key="links.name"
        >
          {{ links.name }}
        </a>
      </li>
    </ul>
    <div class="copy-right">@ 2022 Harry, Inc, All rights reserverd</div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const footerMenu = reactive([
  {
    title: "airbnb",
    menus: [
      {
        name: "careers",
        link: "https://www.airbnb.cn/careers",
      },
      {
        name: "news",
        link: "https://www.airbnb.cn/press/news",
      },
      {
        name: "topic",
        link: "https://www.airbnb.cn/help/topic/1578/法律条款",
      },
      {
        name: "diversity",
        link: "https://www.airbnb.cn/diversity",
      },
      {
        name: "accessibility",
        link: "https://www.airbnb.cn/accessibility",
      },
    ],
  },
  {
    title: "discovery",
    menus: [
      {
        name: "trustAndSafe",
        link: "https://www.airbnb.cn/trust",
      },
      {
        name: "invite",
        link: "https://www.airbnb.cn/invite?r=6",
      },
      {
        name: "evection",
        link: "https://www.airbnb.cn/work?s=footer",
      },
      {
        name: "magzine",
        link: "https://airbnbmag.com",
      },
      {
        name: "airbnborg",
        link: "https://www.airbnb.org/?locale=zh",
      },
    ],
  },
  {
    title: "rent",
    menus: [
      {
        name: "whyRent",
        link: "https://www.airbnb.cn/host/homes?from_footer=1",
      },
      {
        name: "hospitality",
        link: "https://www.airbnb.cn/hospitality",
      },
      {
        name: "responsibleHosting",
        link: "https://www.airbnb.cn/help/responsible-hosting",
      },
      {
        name: "experiences",
        link: "https://www.airbnb.cn/host/experiences?from_footer=1",
      },
      {
        name: "resources",
        link: "https://www.airbnb.cn/resources?traffic_source=footer",
      },
    ],
  },
  {
    title: "service",
    menus: [
      {
        name: "help",
        link: "https://www.airbnb.cn/help?from=footer",
      },
      {
        name: "neighbors",
        link: "https://www.airbnb.cn/neighbors",
      },
    ],
  },
]);
</script>

<style scoped lang="scss">
@import "../assets/scss/layout/footer.scss";
</style>