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

  propertyInfo: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  searchQuery
  sub: any;
  blockCycleId: any;
  blockId: any;
  myDate;

  model2 = "1994-12-14"
  ngOnInit() {
console.log('----',this.myDate)

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.blockCycleId = +params['blockCycleId'] || 0;
        this.blockId = +params['blockId'] || 0;

        console.log(this.blockCycleId);
        console.log(this.blockId);

        this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Properties/GetByBlockId/' + this.blockId + '&' + this.blockCycleId).subscribe(data => {
          this.propertyInfo = data;
          console.log(this.propertyInfo);
        });

      });





    setTimeout(() => {
      $(".footable").footable();
    }, 1000);

    $('input').filter('.datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
      showOn: 'button',
      buttonImage: 'jquery/images/calendar.gif',
      buttonImageOnly: true
    });


  }

  mySelect(event) {
    console.log('--------------', event)
    console.log('')
    this.myDate = event;
    console.log(this.myDate)
  }
  abc(){
    console.log('sss')
  }
}
