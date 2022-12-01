import { Component , OnInit ,ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { getSafePropertyAccessString } from '@angular/compiler';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  dataSource:any=[];
  datas:any=[];
  @ViewChild("chart") chart!: ChartComponent;
  chartOptions: ChartOptions;
  constructor(private formBuilder:FormBuilder,private router:Router,private userAPI:UserService) { 
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 480,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.userAPI.getAllData().subscribe(res=>{
      console.log(res);
      this.dataSource=res;
      this.sorting(this.dataSource);

    })
  }

  sorting(data:any){
      var map = data.reduce(function(map: any, doc: any) {
        var name = doc.EmployeeName
        if (!name) return map;

        var date1 = new Date(doc.StarTimeUtc);
        var date2 = new Date(doc.EndTimeUtc);
        var time = Math.floor((date2.getTime() - date1.getTime())/(1000*3600));

        map[name] = (map[name] || 0) + time;
        return map
      }, {})

      Object.keys(map).map(key => this.datas.push({ name: key, time: map[key]}))
      this.chartOptions.series = Object.values(map)
      this.chartOptions.labels = Object.keys(map)

      // this.datas=map;

      console.log(map)
  }

  piechart(){

  }






}
