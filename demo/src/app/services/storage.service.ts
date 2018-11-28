
import { Injectable } from "@angular/core";


@Injectable()

//angualr中的服务使用的是单例设计模式

export class StorageService {


  constructor() {

  }

  set(key,value){
    localStorage.setItem(key,JSON.stringify(value))

  }
  get(key){
    return JSON.parse(localStorage.getItem(key))
  }
  remove(key){
    localStorage.removeItem(key);
  } 


}
