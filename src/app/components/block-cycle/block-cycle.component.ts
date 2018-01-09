import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-cycle',
  templateUrl: './block-cycle.component.html',
  styleUrls: ['./block-cycle.component.css']
})
export class BlockCycleComponent implements OnInit {
  title:string;
  subtitle:string;	
  page2 = 1;
  
	constructor() {
		this.title = "Blank Page title";  
		this.subtitle = "This is some text within a card block."
	}
  
  ngOnInit() {
  }

}
