<template>
  <div class="login-page">
    <div class="left-part"></div>
    <div class="right-part">
      <div class="login-pane">
        <el-tabs @tab-click="handleChooseClick" v-model="activeName">
          <el-tab-pane
            :label="`${t('login.loginTab')}`"
            name="login"
          ></el-tab-pane>
          <el-tab-pane
            :label="`${t('login.signTab')}`"
            name="sgin"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <!-- 表单 -->
      <el-form
        ref="formRef"
        :rules="rules"
        label-width="0"
        :model="loginModel"
        style="max-width: 460px"
      >
        <el-form-item prop="mobile">
          <el-input
            :placeholder="`${t('login.placeMobile')}`"
            v-model="loginModel.mobile"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :placeholder="`${t('login.placePass')}`"
            v-model="loginModel.password"
          />
        </el-form-item>
        <el-form-item>
          <el-button round type="warning" @click="submitForm">{{
            loginText
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ta } from "element-plus/es/locale";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

interface IRuleForm {
  mobile: string;
  password: string;
}

const activeName = ref<string>("login");
const { t } = useI18n();
const formRef = ref();
const loginText = ref<string>("Log in Airbnb");
const loginModel: IRuleForm = reactive({
  mobile: "",
  password: "",
});

const rules = reactive({
  mobile: [
    {
      required: true,
      min: 11,
      max: 11,
      message: t("login.placeMobile"),
      trigger: "blur",
    },
  ],

  password: [
    {
      required: true,
      min: 6,
      max: 12,
      message: t("login.placePass"),
      trigger: "blur",
    },
  ],
});

const handleChooseClick = (tab: any) => {
  const { name, label } = tab.props;
  if (name === "login") {
    loginText.value = t("login.loginBtn");
  } else if (name === "sgin") {
    loginText.value = t("login.signBtn");
  }
};

const submitForm = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert("成功");
    } else {
    }
  });
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/loign/index.scss";
</style>