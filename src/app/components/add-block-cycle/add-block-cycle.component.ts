import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let $;

@Component({
    moduleId: module.id,
    selector: 'app-add-block-cycle',
    templateUrl: './add-block-cycle.component.html',
    styleUrls: ['./add-block-cycle.component.css']
})
export class AddBlockCycleComponent implements OnInit {
    stepOne = true;
    stepTwo = true;
    stepThree = true;
    stepFour = true;
    @Input('blockCycles') blockCycles: any;

    abc: 'asdhaskdhkjashsdkahskdhaskjd'

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        console.log(this.blockCycles)
        // Date Picker
        $('.mydatepicker, #datepicker').datepicker();
        $('#datepicker-autoclose').datepicker({
            autoclose: true,
            todayHighlight: true
        });
        // jQuery('.mydatepicker, #datepicker').datepicker();


        // $(".tab-wizard").steps({
        //   headerTag: "h6"
        //   , bodyTag: "section"
        //   , transitionEffect: "fade"
        //   , titleTemplate: '<span class="step">#index#</span> #title#'
        //   , labels: {
        //     finish: "Submit"
        //   }
        //   , onFinished: (event, currentIndex) => {
        //     //  swal("Form Submitted!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.");
        //   }
        // });


        // var form = $(".validation-wizard").show();

        // $(".validation-wizard").steps({
        //   headerTag: "h6"
        //   , bodyTag: "section"
        //   , transitionEffect: "fade"
        //   , titleTemplate: '<span class="step">#index#</span> #title#'
        //   , labels: {
        //     finish: "Submit"
        //   }
        //   , onStepChanging: (event, currentIndex, newIndex) => {
        //     return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), form.validate().settings.ignore = ":disabled,:hidden", form.valid())
        //   }
        //   , onFinishing: (event, currentIndex) => {
        //     return form.validate().settings.ignore = ":disabled", form.valid()
        //   }
        //   , onFinished: (event, currentIndex) => {
        //     //  swal("Form Submitted!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.");
        //   }
        // }), $(".validation-wizard").validate({
        //   ignore: "input[type=hidden]"
        //   , errorClass: "text-danger"
        //   , successClass: "text-success"
        //   , highlight: (element, errorClass) => {
        //     $(element).removeClass(errorClass)
        //   }
        //   , unhighlight: (element, errorClass) => {
        //     $(element).removeClass(errorClass)
        //   }
        //   , errorPlacement: (error, element) => {
        //     error.insertAfter(element)
        //   }
        //   , rules: {
        //     email: {
        //       email: !0
        //     }
        //   }
        // })


        $(".tab-wizard").steps({
            headerTag: "h6"
            , bodyTag: "section"
            , transitionEffect: "fade"
            , titleTemplate: '<span class="step">#index#</span> #title#'
            , labels: {
                finish: "Submit"
            }
            , onFinished: function (event, currentIndex) {
                this.swal("Form Submitted!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.");

            }
        });


        //   var form = $(".validation-wizard").show();

        //   $(".validation-wizard").steps({
        //       headerTag: "h6"
        //       , bodyTag: "section"
        //       , transitionEffect: "fade"
        //       , titleTemplate: '<span class="step">#index#</span> #title#'
        //       , labels: {
        //           finish: "Submit"
        //       }
        //       , onStepChanging: function (event, currentIndex, newIndex) {
        //           return currentIndex > newIndex || !(3 === newIndex && Number($("#age-2").val()) < 18) && (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), form.validate().settings.ignore = ":disabled,:hidden", form.valid())
        //       }
        //       , onFinishing: function (event, currentIndex) {
        //           return form.validate().settings.ignore = ":disabled", form.valid()
        //       }
        //       , onFinished: function (event, currentIndex) {
        //            this.swal("Form Submitted!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.");
        //       }
        //   }), $(".validation-wizard").validate({
        //       ignore: "input[type=hidden]"
        //       , errorClass: "text-danger"
        //       , successClass: "text-success"
        //       , highlight: function (element, errorClass) {
        //           $(element).removeClass(errorClass)
        //       }
        //       , unhighlight: function (element, errorClass) {
        //           $(element).removeClass(errorClass)
        //       }
        //       , errorPlacement: function (error, element) {
        //           error.insertAfter(element)
        //       }
        //       , rules: {
        //           email: {
        //               email: !0
        //           }
        //       }
        //   })

    }

}
