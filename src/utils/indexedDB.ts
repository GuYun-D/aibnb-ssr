export default class DB {
  private dbName: string // 数据库名称
  private db: any // 数据库对象

  constructor(name: string) {
    this.dbName = name
  }

  /**
   * 打开数据库
   * @param storeName 数据库名称
   * @param keyPath 主键名称
   * @param indexs 对象仓库字段名称
   */
  public openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
    const request = window.indexedDB.open(this.dbName, 1)

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("数据库打开成功");
        // console.log(event);
        this.db = event.target.result
        resolve(true)
      }
      request.onerror = (event) => {
        console.log("数据库打开失败");
        console.log(event);
      }
      request.onupgradeneeded = (event) => {
        console.log("数据库升级成功");
        const { result }: any = event.target
        const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
        if (indexs && indexs.length > 0) {
          indexs.map((v: string) => {
            store.createIndex(v, v, { unique: false })
          })
        }
        console.log(event);
        store.transaction.oncomplete = (event: any) => {
          console.log("创建对象仓库成功");
        }
      }
    })
  }

  /**
   * 新增 / 修改 数据
   * @description 修改传入 id ， 新增不需要
   * @param storeName 对象仓库名称
   * @param data 新增数据
   */
  updateItem(storeName: string, data: any) {
    // transition 事务，数据库的增删改查都需要通过事务来操作
    console.log(this.db.transaction);
    
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.put({ ...data, updateTime: new Date().getTime() })
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("数据写入成功");
        resolve(event)
      }
      request.onerror = (error: any) => {
        console.log("写入失败");
        reject(error)
      }
    })
  }

  /**
   * 数据删除
   * @param storeName 对象仓库名臣
   * @param key id值
   */
  deleteItem(storeName: string, key: number | string) {
    // transition 事务，数据库的增删改查都需要通过事务来操作
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.delete(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("删除成功");
        resolve(event)
      }
      request.onerror = (error: any) => {
        console.log("删除失败");
        reject(event)
      }
    })

  }

  /**
   * 查询所有数据
   * @param storeName 对象仓库名称
   */
  getList(storeName: string) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.getAll()

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        // console.log("查询成功", event.target.result);
        resolve(event.target.result)
      }
      request.onerror = (error: any) => {
        console.log("查询失败");
        reject(error)
      }
    })
  }

  /**
   * 查询某一条数据
   * @param storeName 
   * @param key 
   */
  getItem(storeName: string, key: string | number) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    const request = store.get(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log("查询某条数据成功", event.target.result);
        resolve(event.target.result)
      }
      request.onerror = (error: any) => {
        console.log("查询某条数据成功失败");
        reject(error)
      }
    })
  }
}
