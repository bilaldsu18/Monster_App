import { RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  results: any;

  constructor(private http: HttpClient) {
    this.title = "Blank Page title";
    this.subtitle = "This is some text within a card block."



  }

  ngOnInit() {
    
    setTimeout(() => {
      $(".footable").footable();
    }, 2000);
    

    this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/BlockCycle/Get').subscribe(data => {
      this.results = data;
      console.log(this.results);
    });

  }

}
