import { RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

declare let $;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  blockCycles: any;

  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) { }



  ngOnInit() {


    $('#datepicker-autoclose').datepicker({
      autoclose: true,
      todayHighlight: true
    });


    setTimeout(() => {
      $(".footable").footable();
    }, 2000);


    this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/BlockCycle/Get').subscribe(data => {
      this.blockCycles = data;
      console.log(this.blockCycles);
    });



  }

}
