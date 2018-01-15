import { log } from 'util';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { logWarnings } from 'protractor/built/driverProviders';
import { Http, RequestOptions, Headers, RequestMethod, Jsonp } from '@angular/http';


declare let $;


@Component({

    selector: 'app-add-block-cycle',
    templateUrl: './add-block-cycle.component.html',
    styleUrls: ['./add-block-cycle.component.css']
})
export class AddBlockCycleComponent implements OnInit {

    @Input('blockCycles') blockCycles: any;

    tempArr = [];
    blocksArray: any = [];
    sendDataArr = []
    checkedArray = [];
    tempCheckedArray = [];
    addBlockCycleSendArr = [];
    date;
    body;
    arr = [];


    @Output()
    change: EventEmitter<any> = new EventEmitter<any>();


    constructor(private http: Http) {

    }
   
    ngOnInit() {
        this.componentInitData()
    }

    //============================================================== 
    // SEND DATA TO SERVER ON FORM SUBMISSION
    // ==============================================================


    sendData() {

        for (let i = 0; i < this.checkedArray.length; ++i) {

            let tempDataHolder = {
                blockCycleId: this.checkedArray[i].blockCycleId,
                blockId: this.checkedArray[i].blockId,
                startDate: this.checkedArray[i].startDate,

            }
            this.addBlockCycleSendArr.push(tempDataHolder)
            console.log(this.addBlockCycleSendArr)
        }
        let _body = {
            "startDate": "2018-01-14T07:12:08.589Z",
            "blocks": this.addBlockCycleSendArr
        }
        console.log(_body)


        $(() => {
            $('#add-contact').modal('toggle');
        });




        let headers = new Headers();
        headers.append('Content-Type', 'application/json') // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        this.http.post('https://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/BlockCycle/Add', {
            "startDate": "2018-01-13T07:12:08.589Z",
            "blocks": this.addBlockCycleSendArr
        }, options)

            .subscribe(val => {
                console.warn("post call successful value returned in body", val);
            },
            response => {
                console.warn("post call in error", response);
            },
            () => {
                console.warn("The Pst observable is now completed.");
            })
            
        }
        
        
        
    //============================================================== 
    // ADD BLOCK COMPONENT INITIAL DATA
    // ==============================================================

    componentInitData() {
        for (let i = 0; i < this.blockCycles.length; ++i) {
            this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycles[i].blockCycleId)
                .map(res => res.json())
                .subscribe(data => {
                    this.blocksArray = [...this.blocksArray, ...data];
                });
        }




        // Date Picker
        $('.mydatepicker, #datepicker').datepicker();
        $('#datepicker-autoclose').datepicker({
            autoclose: true,
            todayHighlight: true
        });

        $('#example2').datepicker()
            .on('changeDate', function () {
                $('#example2').datepicker('hide');
            });

        $(".tab-wizard").steps({
            headerTag: "h6"
            , bodyTag: "section"
            , transitionEffect: "fade"
            , titleTemplate: '<span class="step">#index#</span> #title#'
            , labels: {
                finish: "Submit"
            }
            , onFinished: () => {
                this.sendData();

            }
        });

        setTimeout(() => {
            $(".footable").footable();
        }, 1000);
    }








    //============================================================== 
    // STEPER SECTION1 CHECKBOX  SELECTION
    // ==============================================================

    createSelection(Index) {

        let index = this.tempCheckedArray.indexOf(this.blocksArray[Index].blockId);
        if (index > -1) {
            this.tempCheckedArray.splice(index, 1);
            this.checkedArray.splice(index, 1);
        } else {
            let a = Object.assign({ assignDate: "" }, this.blocksArray[Index]);
            this.tempCheckedArray.push(this.blocksArray[Index].blockId);
            this.checkedArray.push(a);
        }
    }

}
