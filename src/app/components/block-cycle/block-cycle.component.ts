import { RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

declare let $;

@Component({
  selector: 'app-block-cycle',
  templateUrl: './block-cycle.component.html',
  styleUrls: ['./block-cycle.component.css']
})
export class BlockCycleComponent implements OnInit {
  title: string;
  subtitle: string;
  page2 = 1;
  blockCycles: any;

  constructor(private http: Http) {
    this.title = "Blank Page title";
    this.subtitle = "This is some text within a card block.";
  }

  ngOnInit() {

    this.componentInitData()
  }

  // ============================================================== 
  // BLOCK CYCLE COMPONENT INITIAL DATA
  // ==============================================================

  componentInitData() {

    $('#datepicker-autoclose').datepicker({
      autoclose: true,
      todayHighlight: true
    });


    setTimeout(() => {
      $(".footable").footable();
    }, 1000);


    this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/BlockCycle/Get').map(res => res.json()).subscribe(data => {
      this.blockCycles = data;

    });
  }


}
