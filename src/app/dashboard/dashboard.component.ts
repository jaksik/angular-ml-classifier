import { Component, ViewChild, OnInit } from '@angular/core';

import * as tf from '@tensorflow/tfjs'
import colo from '../../assets/colorData.json'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    data: any;
    xs: any;
    ys: any;
    model: tf.Sequential;
    labelList: [
        'red-ish',
        'green-ish',
        'blue-ish',
        'orange-ish',
        'yellow-ish',
        'pink-ish',
        'purple-ish',
        'brown-ish',
        'grey-ish'
    ];
    label: any;

    constructor(
      ) {}

    ngOnInit() {

        console.log("data: ", colo)
        let colors = [];
        let labels = [];
        for (let record of this.data.entries) {
            let col = [record.r / 255, record.g / 255, record.b / 255];
            //pushing color's RGB value to colors array
            colors.push(col);
            //pushing the corresponding labeshing colors arrayl index from the labelList to the labels array
            labels.push(this.labelList.indexOf(record.label));
            console.log(this.model)
            this.trainModel();
        }
    }

    trainModel() {

    }
}