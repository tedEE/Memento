import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

// const TASK_KEY = ''

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private storage : Storage) {}

  //Create
  addElem(item: any, dbKey : string): Promise<any> {
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
