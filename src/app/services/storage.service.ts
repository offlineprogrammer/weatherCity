import { Injectable } from '@angular/core';
import {  Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async save(key: string, value: any): Promise < void > {
    await Storage.set({
      key,
      value: JSON.stringify(value)
    });
  }

  async remove(key: string): Promise < void > {
    await Storage.remove({
      key
    });
  }

  async get(key: string): Promise < any > {
    const item = await Storage.get({ key });
    return JSON.parse(item.value);
  }


}
