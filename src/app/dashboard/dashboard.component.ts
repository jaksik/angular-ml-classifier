import { Component, ViewChild, OnInit } from '@angular/core';

import * as tf from '@tensorflow/tfjs'
import data from '../../assets/colorData.json'
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    label: any;
    labelList = [
        'red-ish',
        'green-ish',
        'blue-ish',
        'orange-ish',
        'yellow-ish',
        'pink-ish',
        'purple-ish',
        'brown-ish',
        'grey-ish'
      ]
    inputData: any;
    outputData: any;
    model: any;
    angular: any;

    constructor() { }

    ngOnInit() {
        //Prepare/restructure data to pass into neural network
        console.log("data: ", data)
        let colors = [];
        let labels = [];
        for (let entry of data.entries) {
            let rgb = [entry.r / 255, entry.g / 255, entry.b / 255];
            colors.push(rgb);

            let index = this.labelList.indexOf(entry.label)
            labels.push(index);
        }
        console.log("labels: ", labels)

        //Store our structured data in declarations
        this.inputData = tf.tensor2d(colors);
        let labelsTensor = tf.tensor1d(labels, 'int32');
        this.outputData = tf.oneHot(labelsTensor, 9);
        labelsTensor.dispose();

        //Create the layers for our model
        let inputLayer = tf.layers.dense({
            units: 16,
            activation: 'sigmoid',
            inputDim: 3
        });
        let outputLayer = tf.layers.dense({
            units: 9,
            activation: 'softmax'
        });

        //Bring it all together
        this.model = tf.sequential();
        this.model.add(inputLayer);
        this.model.add(outputLayer);

        //Creating an optimizer to help train our model
        const optimizer = tf.train.sgd(0.2);
        this.model.compile({
            optimizer: optimizer,
            loss: 'categoricalCrossentropy'
        });
        this.trainModel();
    }

    trainModel() {
        const options = {
            epochs: 10,
            validationSplit: 0.1,
            shuffle: true,
            callbacks: {
                onTrainBegin: () => console.log('training start'),
                onTrainEnd: () => console.log('training complete'),
                onBatchEnd: tf.nextFrame,
                onEpochEnd: (num, logs) => {
                    console.log('Epoch: ' + num);
                    console.log('Loss: ' + logs)
                }
            }
        }
        return this.model.fit(this.inputData, this.outputData, options)
    }

    draw() {
        tf.tidy(() => {
            const xs = tf.tensor2d([
                [125 / 255, 124 / 255, 124 / 255]
            ]);
            let results = this.model.predict(this.inputData);
            let index = results.argMax(1).dataSync()[0];

            this.label = this.labelList[index];
            console.log("prediction: ", this.label)
        });
      }
}