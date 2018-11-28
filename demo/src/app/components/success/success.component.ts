import { Component, OnInit } from '@angular/core';

//引入ActivatedRoute
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor( public route: ActivatedRoute) { }

  ngOnInit() {

    console.log(this.route.queryParams)
  }

}
