

import { Injectable } from "@angular/core";

import { Http,Headers } from "@angular/http";

@Injectable()
export class HttpClientService {
  public api = "http://a.itying.com/";   /*api接口的地址   后端*/

  public return_url = "http://a.apiying.com/";  /*angualr项目的地址 前端*/




  public headers=new Headers({"Content-Type":"application/json"});

  constructor(public http: Http) {}

  //请求数据的封装
  get(url) {

    var api=this.api+url;

    return new Promise((resolve, reject) => {
         this.http.get(api).subscribe(response => {
             var data = JSON.parse(response["_body"]);
             resolve(data);
           }, err => {
             console.log(err);

             reject(err);
           });
    })

   
  }

  doPost(url,json){

     var api=this.api+url;

     return new Promise((resolve,reject)=>{

        this.http.post(api,JSON.stringify(json),{headers:this.headers}).subscribe((response)=>{

          console.log(response)
          var data = JSON.parse(response["_body"]);
          resolve(data);

        },(err)=>{
          console.log(err);

          reject(err);
        })

     })


  }


}
