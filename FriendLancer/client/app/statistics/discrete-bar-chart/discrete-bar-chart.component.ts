import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-discrete-bar-chart',
  templateUrl: './discrete-bar-chart.component.html',
  styleUrls: ['./discrete-bar-chart.component.css']
})
export class DiscreteBarChartComponent implements OnInit {
  options: any;
  data: any = [
    {
      key: "Cumulative Return",
      //{label, value}
      values: []
    }
  ];
  isDataLoaded: boolean;
  constructor(postSer: PostsService) {
    this.isDataLoaded = false;
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value + (1e-10);},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    };

    postSer.groupByPostLocationAndCount().subscribe(data=> {
      var array: Array<any> = new Array<any>();
      data.forEach(numOfPosts=> {
        array.push({label: numOfPosts._id, value: numOfPosts.numOfPosts});
      });
      this.data[0].values = array;
      console.log(this.data);
      this.isDataLoaded = true;
    });
  }

  ngOnInit(): void {
  }

}
