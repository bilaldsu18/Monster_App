import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FUNCTION_TYPE } from '@angular/compiler/src/output/output_ast';

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
    date;
    constructor(private http: HttpClient) {

    }
    
    sendData() {

        for (let i = 0; i < this.checkedArray.length; ++i) {
            let tempValue = this.blocksArray.filter(
                data => data.blockId === this.checkedArray[i].blockId);

            console.log(tempValue);

        }
    };



    ngOnInit() {
        console.log(this.blockCycles)


        
        for (let i = 0; i < this.blockCycles.length; ++i) {

            this.http.get('http://kybodev01.northeurope.cloudapp.azure.com/PestInspections/api/Blocks/Get/' + this.blockCycles[i].blockCycleId).subscribe(data => {
                this.tempArr.push(data);
                this.tempArr.map((data) => {
                    data.map(newData => {
                        this.blocksArray.push(newData);
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


        $(".tab-wizard").steps({
            headerTag: "h6"
            , bodyTag: "section"
            , transitionEffect: "fade"
            , titleTemplate: '<span class="step">#index#</span> #title#'
            , labels: {
                finish: "Submit"
            }
            , onFinished: () => {
                this.sendData()
            }
        });
    }


    createSelection(Index) {
        let index = this.checkedArray.indexOf(this.blocksArray[Index]);
        if (index < 0) {
            let a = Object.assign({ assignDate: "" }, this.blocksArray[Index]);
            console.log(a);
            this.checkedArray.push(a);
            console.log(this.checkedArray);
        } else {
            this.checkedArray.splice(index, 1);
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
