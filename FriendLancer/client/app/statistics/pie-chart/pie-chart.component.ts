import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../services/posts.service";

class NumOfPosts {
  _id: string;
  numOfPosts: number;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  options: any;
  data: any = [];
  isDataLoaded: boolean;

  constructor(postSer: PostsService) {
    this.isDataLoaded = false;
    this.options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function (d) {
          return d.key;
        },
        y: function (d) {
          return d.y;
        },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    };

    this.data = new Array<any>();
    postSer.groupByForumNameAndCount().subscribe(data=> {
      data.forEach(numOfPosts=> {
        console.log(numOfPosts);
        console.log({key: numOfPosts._id, y: numOfPosts.numOfPosts });
        this.data.push({key: numOfPosts._id, y: numOfPosts.numOfPosts });
      });

      this.isDataLoaded = true;
    });
    // this.data = [
    //   {
    //     key: "Computer Science",
    //     y: 3
    //   },
    //   {
    //     key: "QA",
    //     y: 4
    //   },
    //   {
    //     key: "Accounting",
    //     y: 5
    //   },
    // ];
  }

  ngOnInit(): void {
  }

}
