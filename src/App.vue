<template>
  <el-config-provider :locale="locale">
    <HeaderCommon
      v-show="route.fullPath.indexOf('login') === -1"
      @change-lang="changeLanguage"
    ></HeaderCommon>
    <!-- <div class="page">
      <router-view></router-view>
      <button @click="() => router.push('/home')">首页</button>
      <button @click="() => router.push('/mine')">个人中心</button>

      <router-link to="/home">home</router-link>
      <router-link to="/mine">mine</router-link>

      <button @click="changeLanguage(zhCn)">中文</button>
      <button @click="changeLanguage(en)">英文</button>
    </div> -->
    <div class="container">
      <router-view></router-view>
    </div>
    <FooterCommon v-show="route.fullPath.indexOf('login') === -1"></FooterCommon>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { useI18n } from "vue-i18n";
import { ref } from "@vue/reactivity";
import HeaderCommon from "./layout/header-common.vue";
import FooterCommon from "./layout/footer-common.vue";

const { locale: localeLanguage } = useI18n();
const router = useRouter();
const route = useRoute();
const locale = ref(zhCn);

const changeLanguage = (language: any) => {
  locale.value = language;
  console.log(language.name);

  localeLanguage.value = language.name;
};
</script>

<style lang="scss">
.page {
  button {
    background-color: aqua;
  }
}
</style>