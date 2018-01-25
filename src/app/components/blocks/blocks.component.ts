import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
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
  blockCycleId;
  sub;
  blocksList;
  searchQuery;
  constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
    this.title = "Blank Page title";
    this.subtitle = "This is some text within a card block."

  }


  ngOnInit() {
    this.componentInitData();
  }



  // ============================================================== 
  //                BLOCK  COMPONENT INITIAL DATA
  // ==============================================================

  componentInitData() {
    $('#example2').datepicker({
      autoclose: true,
      todayHighlight: true,
      format: 'mm/dd/yyyy'
    });


    setTimeout(() => {
      $(".footable").footable();
    }, 2000);

    this.sub = this.route
      .queryParams
      .subscribe(params => {

        this.blockCycleId = +params['blockCycleId'] || -1;


        this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycleId)
          .map(res => res.json())
          .subscribe(data => {
            this.blocksArray = data;
          });


        this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/GetUnassigned/' + this.blockCycleId)
          .map(res => res.json())
          .subscribe(data => {
            this.blocksList = data;
          })


      });



    // data.map((data) => {
    //   data['blockCycleId'] = this.blockCycles[i].blockCycleId
    // })
    // this.blocksArray = [...this.blocksArray, ...data];


    //====================================================
    //    CLIENT ASK US TO CHANGE BUT THIS IS STABLE CODE
    //====================================================
    // this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/BlockCycle/Get')

    //   .subscribe(data => {
    //     this.blockCycles = data.json();
    //     for (let i = 0; i < this.blockCycles.length; ++i) {

    //       this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycles[i].blockCycleId)
    //         .map(res => res.json())
    //         .subscribe(data => {
    //           data.map((data) => {
    //             data['blockCycleId'] = this.blockCycles[i].blockCycleId
    //           })
    //           this.blocksArray = [...this.blocksArray, ...data];
    //         });
    //     }
    //   });

    //=====================================================
  }



  // ============================================================== 
  //          BLOCK  COMPONENT NAVIGATION TO PROPERTIES PAGE
  // ==============================================================


  goToPage(data) {
    this.router.navigate(['/properties'], { queryParams: { blockCycleId: this.blockCycleId, blockId: data.blockId } });
  }



  // ============================================================== 
  //            THIS FUCNTION WILL SEND DATA TO API
  // ==============================================================



  save() {
    let date = $("#example2").val();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    // const headerDict = {
    //   'Content-Type': ',application/x-www-form-urlencoded,application/json',
    //   'Accept': 'application/json,application/x-www-form-urlencoded',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }

    // const requestOptions = {
    //   headers: new Headers(headerDict),
    // };
    let _body = {
      "blockCycleId": this.blockCycleId,
      "blockId": this.dropDownValue.blockId,
      "startDate": date
    }

    let body = JSON.stringify(_body);
    console.log(body)

    this.http.post("http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/AddBlockToBlockCycle", body, options)
      .map(res => res.json())
      .subscribe(data => {

      })

  }




}
