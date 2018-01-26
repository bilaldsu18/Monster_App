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
  blocksArray;
  dropDownValue;
  makeHeighSmall = false;
  temp = 4;
  abc = 5;
  pop;

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
          
        });

        this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycleId)
          .map(res => res.json())
          .subscribe(data => {
          
            this.blocksArray = data;
          });
      });


      setTimeout(() => {
        $(".footable").footable();
    }, 1000);


      setTimeout(() => {
        $('.footable-even').footable();
      }, 100);
    

      setTimeout(() => {
        $('.footable-page').footable();
      }, 100);
      
    // setTimeout(() => {
    //   $(".footable").footable();
    // }, 1000);

    // $('input').filter('.datepicker').datepicker({
    //   changeMonth: true,
    //   changeYear: true,
    //   showOn: 'button',
    //   buttonImage: 'jquery/images/calendar.gif',
    //   buttonImageOnly: true
    // });
  }

  // mySelect(event) {
  //   this.myDate = event;
  // }


  // ============================================================== 
  // PROPERTIES COMPONENT DATA CHANGE ON DROP DOWN
  // ==============================================================

  dataChanged(event) {
    

    this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Properties/GetByBlockId/' + event.blockId + '&' + this.blockCycleId)
    .map(data => data.json())
    .subscribe(data => {
      this.propertyInfo = data;    
      this.makeHeighSmall = true;  
      setTimeout(() => {
        $('.footable-even').footable();
      }, 1000);

      });

  }


  dropDownSize(event) {
    let value = "" + event;
    this.abc = event;
    
    //$('#demo-foo-addrow').pageSize(10);
  }


  listChange(event) {
    if(this.abc < this.propertyInfo.length) {
      this.abc += this.abc;
      this.propertyInfo.splice(this.abc, 5);
    }
  }

}
