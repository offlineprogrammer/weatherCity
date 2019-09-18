import { Injectable } from '@angular/core';
import {  Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async save(key: string, value: string): Promise < void > {
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

  async get(key: string): Promise < void > {
    await Storage.get({
      key
    });
  }


}
