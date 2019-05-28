import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  public get(key) {
    const cacheData = sessionStorage[key];
    if (cacheData) {
      return JSON.parse(cacheData);
    } else {
      return null;
    }
  }
  public set(key, value) {
    const cacheData = JSON.stringify(value);
    sessionStorage[key] = cacheData;
  }
}
