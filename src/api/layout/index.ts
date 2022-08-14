import IndexedDB from '../../utils/indexedDB'
const aribnb = new IndexedDB('aribnb')

interface IResultOr {
  code: string
  success: boolean
  message: string
  result: any
}

/**
 * 保存当前选择的语言包
 * @param lang 
 * @returns 
 */
export async function saveLanguageApi(lang: any) {
  await aribnb.openStore('langiage', 'id', ['name'])
  const resultOr: IResultOr = await aribnb.getItem('language', 1).then(res => {
    return { code: '000000', message: '操作成功', result: res || null, success: true }
  })

  const { success } = resultOr
  let obj = {}
  if (success) {
    obj = { name: lang, id: 1 }
  } else {
    obj = { name: lang }
  }

  const result: IResultOr = await aribnb.updateItem('language', obj).then(res => {
    return {
      code: '000000',
      message: '操做成功',
      result: null,
      success: true
    }
  })

  return result
}

/**
 * 获取到当前的语言包
 * @returns 
 */
export async function fetchLanguageApi() {
  await aribnb.openStore('language', 'id', ['name'])
  const result: IResultOr = await aribnb.getItem('language', 1).then(res => {
    return {
      code: '000000',
      message: '操作成功',
      result: res || null,
      success: true
    }
  })

  return result
}