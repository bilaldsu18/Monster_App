import { RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

declare let $;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  propertyInfo: any;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) { }
  searchQuery;
  sub: any;
  blockCycleId: any;
  blockId: any;
  myDate;



  ngOnInit() {
    this.componentInitData()
  }



  // ============================================================== 
  // PROPERTIES COMPONENT INITIAL DATA
  // ==============================================================

  componentInitData() {

    this.sub = this.route
      .queryParams
      .subscribe(params => {

        this.blockCycleId = +params['blockCycleId'] || 0;
        this.blockId = +params['blockId'] || 0;


        this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Properties/GetByBlockId/' + this.blockId + '&' + this.blockCycleId).subscribe(data => {
          this.propertyInfo = data.json();
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
    this.myDate = event;

  }

}
