import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, RequestOptions } from '@angular/http';

declare let $;

@Component({
    moduleId: module.id,
    selector: 'app-add-block-cycle',
    templateUrl: './add-block-cycle.component.html',
    styleUrls: ['./add-block-cycle.component.css']
})
export class AddBlockCycleComponent implements OnInit {

    @Input('blockCycles') blockCycles: any;

    tempArr = [];
    blocksArray = [];
    checkedArray = [];
    tempCheckedArray = [];
    date;
    body;

    @Output()
    change: EventEmitter<any> = new EventEmitter<any>();


    constructor(private http: HttpClient) {

    }

    sendData() {
        for (let i = 0; i < this.checkedArray.length; ++i) {
            this.body = {
                blockCycleId: this.checkedArray[i].blockCycleId,
                blockId: this.checkedArray[i].blockId,
                startDate: this.checkedArray[i].startDate,

            }

            console.log(this.body)

            let headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8")
                .set("Accept", "application/json");
            // headers = headers.append('Accept', 'application/json');
            //  let headers = new Headers({ 'Content-Type': 'application/json' });
            //headers.append('Content-Type', 'application/json');
            // headers.set();
            // const options = new RequestOptions({ headers: headers });
            // console.log(options);
            //this.body = JSON.stringify(this.body);
            this.http.post('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/AddBlockToBlockCycle/', this.body, { headers: headers }).subscribe(val => {
                console.log("post call successful value returned in body",
                    val);
            },
                response => {
                    console.log("post call in error", response);
                },
                () => {
                    console.log("The Pst observable is now completed.");
                })

        }

        this.change.emit(null);
    };



    ngOnInit() {
        console.log(this.blockCycles)



        for (let i = 0; i < this.blockCycles.length; ++i) {

            this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycles[i].blockCycleId).subscribe(data => {
                this.tempArr.push(data);
                this.tempArr.map((data) => {
                    data.map(newData => {
                        let a = Object.assign({ blockCycleId: this.blockCycles[i].blockCycleId }, newData);
                        this.blocksArray.push(a);
                        console.log(this.blocksArray)
                    })
                })
            });

        }

        console.log(this.blocksArray);


        // Date Picker
        $('.mydatepicker, #datepicker').datepicker();
        $('#datepicker-autoclose').datepicker({
            autoclose: true,
            todayHighlight: true
        });

        $('#example2').datepicker()                       //  id with "date-two" will pop up a datepicker
            .on('changeDate', function () {                // when the datechanges
                $('#example2').datepicker('hide');      // hide the datepicker
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
    }

    // prepareHeader(headers: HttpHeaders | null): object {
    //     headers = new HttpHeaders();

    //     headers = headers.set('Content-Type', 'application/json');
    //     headers = headers.set('Accept', 'application/json');

    //     return {
    //         headers: headers
    //     }
    // }

    createSelection(Index) {
        let index = this.tempCheckedArray.indexOf(this.blocksArray[Index].blockId);
        if (index > -1) {
            this.tempCheckedArray.splice(index, 1);
            this.checkedArray.splice(index, 1);
            console.log(this.checkedArray);


        } else {
            let a = Object.assign({ assignDate: "" }, this.blocksArray[Index]);
            console.log(a);
            this.tempCheckedArray.push(this.blocksArray[Index].blockId);
            this.checkedArray.push(a);
            console.log(this.checkedArray);
        }

    }




    abc(date, Indexx) {
        console.log(date);
        console.log(Indexx);
    }


    def() {
        console.log(this.checkedArray);
    }
}
