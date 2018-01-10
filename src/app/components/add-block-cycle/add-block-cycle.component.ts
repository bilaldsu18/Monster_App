import { Component, OnInit } from '@angular/core';
declare let $;

@Component({
  selector: 'app-add-block-cycle',
  templateUrl: './add-block-cycle.component.html',
  styleUrls: ['./add-block-cycle.component.css']
})
export class AddBlockCycleComponent implements OnInit {
  stepOne = true;
  stepTwo = true;
  stepThree = true;
  stepFour = true;


  constructor() { }

  ngOnInit() {

    // setTimeout(() => {
    //   $(".tab-wizard").steps({
    //     headerTag: "h6"
    //     , bodyTag: "section"
    //     , transitionEffect: "fade"
    //     , titleTemplate: '<span class="step">#index#</span> #title#'
    //     , labels: {
    //       finish: "Submit"
    //     }
    //     , onFinished: function (event, currentIndex) {
    //       //  swal("Form Submitted!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.");

    //     }
    //   });
    // }, 2000);



  }

}
