
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DxChartModule, DxChartComponent } from 'devextreme-angular';
import { ArchitectureInfo, Service } from './app.service';
import { DataMiningService } from './data-mining.service';
import { DataMiningModel } from './model';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    public testMessage: string;
    title = 'app';
    types: string[] = ['line'];
    ds: any = {};
    architecturesInfo: ArchitectureInfo[];
    public dataRecive: DataMiningModel[] = [];
    public dataminingPredictRecive: DataMiningModel[] = [];
    public trainingDatasetContent = 'trainingDatasetContent';
    public naiveBayesClassifier = 'naiveBayesClassifier';
    public maxDataLength = 10;
    public chartPalette = ['#f77d00', '#ad00f5'];
    public chartPredictPalette = ['#ff0000'];
    @ViewChild('chartDatamining') chartDatamining: DxChartComponent;
    @ViewChild('chartDataminingPredict') chartDataminingPredict: DxChartComponent;
    constructor(
      private service: Service,
      private dataMiningService: DataMiningService
    ) {
        this.architecturesInfo = service.getArchitecturesInfo();
    }

    getDataSource() {
        this.ds = this.chartDatamining.instance.getDataSource();
    }
    sendMessage() {
      this.dataMiningService.sendMsg(this.testMessage);
    }

    customizeLabel = (arg: any) => {
        return {
            visible: true,
            // backgroundColor: 'transparent',
            // backgroundColor: function (e: any) {
            //     return e.backgroundColor;
            // },
            color: function (e: any) {
                return e.backgroundColor;
            },
            customizeText: function (e: any) {
                return e.valueText;
            }
        };
    }
    ngAfterViewInit() {
      this.dataMiningService.messages.subscribe(msg => {
        const tempObject = {
          time: new Date().toLocaleTimeString(),
          temperature: parseFloat(msg.text.temperature),
          humidity: parseFloat(msg.text.humidity),
          temperatureSet: parseFloat(msg.text.temperatureSet)
        };

        if (msg.text.type === '1') {
          const store1 = this.chartDatamining.instance.getDataSource().store();
          console.log(store1._array.length);
          if ( store1._array.length === this.maxDataLength ) {
            store1.remove(store1._array[0]);
          }
          store1.insert(tempObject);

          // if ( store1._array.length === this.maxDataLength ) {
          //   store1.remove(store1._array[0]);
          //   for (let index = 0; index < store1._array.length; index++) {
          //     const element = store1._array[index];
          //     if (index === store1._array.length - 1) {
          //       store1.update(store1._array[index], store1._array[index + 1]);
          //     } else {
          //       store1.update(store1._array[index], tempObject);
          //     }
          //   }
          // } else {
          //   store1.insert(tempObject);
          // }


        } else if (msg.text.type === '2') {
          const store = this.chartDataminingPredict.instance.getDataSource().store();
          console.log(store._array.length);
          if ( store._array.length === this.maxDataLength ) {
            store.remove(store._array[0]);
          }
          store.insert(tempObject);
        } else if (msg.text.type === '3') {
          this.trainingDatasetContent = msg.text.trainingDatasetContent;
        } else if (msg.text.type === '4') {
          this.naiveBayesClassifier = msg.text.naiveBayesClassifier;
        }
      });
  }
}
