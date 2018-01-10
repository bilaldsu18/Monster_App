import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
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

    // Date Picker
    
    // jQuery('.mydatepicker, #datepicker').datepicker();
    // jQuery('#datepicker-autoclose').datepicker({
    //     autoclose: true,
    //     todayHighlight: true
    // });

    




    $(".tab-wizard").steps({
      headerTag: "h6"
      , bodyTag: "section"
      , transitionEffect: "fade"
      , titleTemplate: '<span class="step">#index#</span> #title#'
      , labels: {
        finish: "Submit"
      }
      , onFinished: function (event, currentIndex) {
        //  swal("Form Submitted!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.");
      }
    });


    var form = $(".validation-wizard").show();

    $(".validation-wizard").steps({
      headerTag: "h6"
      , bodyTag: "section"
      , transitionEffect: "fade"
      , titleTemplate: '<span class="step">#index#</span> #title#'
      , labels: {
        finish: "Submit"
      }
      , onStepChanging: function (event, currentIndex, newIndex) {
        return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), form.validate().settings.ignore = ":disabled,:hidden", form.valid())
      }
      , onFinishing: function (event, currentIndex) {
        return form.validate().settings.ignore = ":disabled", form.valid()
      }
      , onFinished: function (event, currentIndex) {
        //  swal("Form Submitted!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.");
      }
    }), $(".validation-wizard").validate({
      ignore: "input[type=hidden]"
      , errorClass: "text-danger"
      , successClass: "text-success"
      , highlight: function (element, errorClass) {
        $(element).removeClass(errorClass)
      }
      , unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass)
      }
      , errorPlacement: function (error, element) {
        error.insertAfter(element)
      }
      , rules: {
        email: {
          email: !0
        }
      }
    })

  }

}
