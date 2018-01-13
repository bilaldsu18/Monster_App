import { RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  constructor(private http: HttpClient, private router: Router) {
    this.title = "Blank Page title";
    this.subtitle = "This is some text within a card block."

  }

  ngOnInit() {

    $('#datepicker-autoclose').datepicker({
      autoclose: true,
      todayHighlight: true,
      setDate: "10/12/2013"
    });
    $(".datepicker123").datepicker("setDate", "10/12/2013");

    setTimeout(() => {
      $(".footable").footable();
    }, 2000);


    this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/BlockCycle/Get').subscribe(data => {
      this.blockCycles = data;
     
      for (let i = 0; i < this.blockCycles.length; ++i) {

        this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycles[i].blockCycleId).subscribe(data => {
          this.tempArr.push(data);
          this.tempArr.map((data) => {
            data.map(newData => {
              let a = Object.assign({ blockCycleId: this.blockCycles[i].blockCycleId }, newData);
              this.blocksArray.push(a);
            })
          })
        });

      }
    });

  }

  

  goToPage(data) {
    this.router.navigate(['/properties'], { queryParams: { blockCycleId: data.blockCycleId,  blockId: data.blockId} });
  }

  filterItem(value){
    //if(!value) this.assignCopy(); //when nothing has typed

    return this.blocksArray.filter(function (el: any) {
     return el.name.toLowerCase().indexOf(value) > -1;
   })
   
 }


}
