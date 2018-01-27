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
  checked: boolean = true;
  selectedIndex: any;
  selectedDateIndex: string;

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
  dates = [];

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

          setTimeout(() => {
            for (let i = 0; i < this.propertyInfo.length; ++i) {
              let id = "#example" + i;
              $(id).datepicker({
                autoclose: true,
                todayHighlight: true,
                format: 'dd/mm/yyyy'
              }).on('show', (e) => {
                
              }).on('hide', (e) => {
                if (this.checked) {
                  $(`#example${this.selectedIndex}`).val(this.dates[this.selectedIndex].id)
                }
                this.checked = true;


              }).on('changeDate', (e) => {
                this.checked = false;
                this.dates[this.selectedIndex].id = $(`#example${this.selectedIndex}`).val()

              })


              let abc: any = this.propertyInfo[i].nextInspectionDate;

              let yy = abc.slice(0, 4);
              let mm = abc.slice(5, 7);
              let dd = abc.slice(8, 10);
              let newDate = "" + dd + "/" + mm + "/" + yy;
              this.dates.push({ id: newDate })
              $(id).val(newDate);

            }
          })

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
    if (this.abc < this.propertyInfo.length) {
      this.abc += this.abc;
      this.propertyInfo.splice(this.abc, 5);
    }
  }

  dateInputSelection(index) {
    
    let id = "#example" + index;
    this.selectedDateIndex = id;
    this.selectedIndex = index;
    

  }

}
