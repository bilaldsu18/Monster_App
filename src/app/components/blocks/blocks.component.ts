import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';
import { log } from 'util';
declare let $;

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  title: string;
  subtitle: string;
  page2 = 1;
  blockCycles: any;
  tempArr = [];
  blocksArray = [];
  date;
  arr = [];
  dropDownValue;

  constructor(private http: Http, private router: Router) {
    this.title = "Blank Page title";
    this.subtitle = "This is some text within a card block."

  }


  ngOnInit() {
    this.componentInitData();
  }



  // ============================================================== 
  // BLOCK  COMPONENT INITIAL DATA
  // ==============================================================

  componentInitData() {
    $('#datepicker-autoclose').datepicker({
      autoclose: true,
      todayHighlight: true,
      setDate: "10/12/2013"
    });


    setTimeout(() => {
      $(".footable").footable();
    }, 2000);



    this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/BlockCycle/Get')

      .subscribe(data => {
        this.blockCycles = data.json();
        for (let i = 0; i < this.blockCycles.length; ++i) {

          this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycles[i].blockCycleId)
            .map(res => res.json())
            .subscribe(data => {
              data.map((data) => {
                data['blockCycleId'] = this.blockCycles[i].blockCycleId
              })
              this.blocksArray = [...this.blocksArray, ...data];
            });
        }
      });
  }



  // ============================================================== 
  // BLOCK  COMPONENT NAVIGATION TO PROPERTIES PAGE
  // ==============================================================


  goToPage(data) {
    this.router.navigate(['/properties'], { queryParams: { blockCycleId: data.blockCycleId, blockId: data.blockId } });
  }

  save() {
    let date = $("#datepicker-autoclose").val();
    console.log(date);
    console.log(this.dropDownValue);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions( {method: RequestMethod.Post, headers: headers });

    let _body = {
      "blockCycleId": this.dropDownValue.blockCycleId,
      "blockId": this.dropDownValue.blockId,
      "startDate": date
    }

        
    let body = JSON.stringify(_body);    

    this.http.post("http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/AddBlockToBlockCycle", body, options)
    .map(res => res.json())
    .subscribe(data => { 
        console.log(data);
    })
    
    
    

  }




}
