import { createStore } from 'vuex'
import { SET_LANGUAGE } from './types'
import { saveLanguageApi, fetchLanguageApi } from "../api/layout/index";


export const store = createStore({
  state: {
    locale: null
  },

  mutations: {
    SET_LANGUAGE(state, language) {
      state.locale = language
    }
  },

  actions: {
    /**
     * 切换语言
     * @param language 切换的语言
     */
    saveLanguageAction({ commit }, language: any) {
      saveLanguageApi(language).then(res => {
        const { success } = res
        if (success) {
          commit(SET_LANGUAGE, language)
        }
      })
    }
  }
})