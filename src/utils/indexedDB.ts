export default class DB {
  private dbName: string

  constructor(name: string) {
    this.dbName = name
  }


  public openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
    const request = window.indexedDB.open(this.dbName, 1)
    request.onsuccess = (event) => {
      console.log("数据库打开成功");
      console.log(event);
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
          store.createIndex(v, v, { unique: true })
        })
      }
      console.log(event);
      store.transaction.oncomplete = (event: any) => {
        console.log("创建对象仓库成功");
      }
    }
  }
}
