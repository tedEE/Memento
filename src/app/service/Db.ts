import {Storage} from '@ionic/storage';

export abstract class Db {

  constructor(protected storage : Storage) {}

  //Create
  addElem(item: any, dbKey : string): Promise<any> {
    console.log('код в addElem()')
    return this.storage.get(dbKey).then((items: any[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(dbKey, items);
      } else {
        return this.storage.set(dbKey, [item]);
      }
    })
  }

  // Read
  getElem(dbKey): Promise<any[]> {
    return this.storage.get(dbKey);
  }

  //Delete
  deleteElem(id: number, dbKey): Promise<any> {
    return this.storage.get(dbKey).then((items: any[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let toKeep: any[] = [];
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(dbKey, toKeep);
    });
  }

}
