import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  date = "";
  arr = [];

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
    $(".datepicker123").datepicker("setDate", "10/12/2013");
  
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



}
