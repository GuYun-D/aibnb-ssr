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
import { reactive, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { IResultOr } from "../../api/interface";
import { userSignApi, userLoginApi } from "../../api/login/index";

interface IRuleForm {
  mobile: string;
  password: string;
}

const activeName = ref<string>("login");
const { t } = useI18n();
const router = useRouter();
// @ts-ignore
const { proxy } = getCurrentInstance();
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

/**
 * @description 切换tab
 */
const handleChooseClick = (tab: any) => {
  const { name, label } = tab.props;
  if (name === "login") {
    loginText.value = t("login.loginBtn");
  } else if (name === "sgin") {
    loginText.value = t("login.signBtn");
  }
};

/**
 * @description 提交表单
 */
const submitForm = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (activeName.value === "sgin") {
        userSign({ ...loginModel });
      } else if (activeName.value === "login") {
        userLogin({ ...loginModel });
      }
    } else {
      return false;
    }
  });
};

/**
 * @description 注册
 */
const userSign = (params: IRuleForm) => {
  userSignApi(params).then((res: IResultOr) => {
    console.log(res);
    const { success, message } = res;
    if (success) {
      proxy.$message.success(message);
    } else {
      proxy.$message.error(message);
    }
  });
};

const userLogin = (params: IRuleForm) => {
  userLoginApi(params).then((res: IResultOr) => {
    const { message, success, result } = res;

    if (success) {
      localStorage.setItem("userStatus", result.status);
      router.push("/home");
      proxy.$message.success(message);
    } else {
      proxy.$message.error(message);
    }
  });
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/loign/index.scss";
</style>