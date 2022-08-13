import { http } from '../utils/https-class'
import IndexedDB from '../utils/indexedDB'

const aribnbDB = new IndexedDB('aribnb')

// mock 接口
export const fetchRoom = async () => {
  await aribnbDB.openStore('aribnb', 'id', ["name", "age", "gender"])
  const result = await aribnbDB.getList('room').then(res => {
    return {
      code: '000000',
      message: '操作成功',
      result: res,
      success: true
    }
  })
  return result
}

