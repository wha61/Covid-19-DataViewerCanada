import { FederalData } from './../../models/federal-data';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProvinceData } from 'src/app/models/province-data';
import { ProvincePlusRegionData } from 'src/app/models/provincePlusRegion-data';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home-default',
  templateUrl: './home-default.component.html',
  styleUrls: ['./home-default.component.css']
})

export class HomeDefaultComponent implements OnInit {
  title = 'Default';

  provincesForChart: any[] = [] 
  regionsForChart: any[] = [] 
  newCasesForChart: any[] = [] 
  cumulativeCasesForChart: any[] = [] 
  newDeathsForChart: any[] = [] 
  cumulativeDeathsForChart: any[] = [] 
  newRecoveredChart: any[] = [] 
  cumulativeRecoveredForChart: any[] = []
  covidData: any;
  covidData2:any;
  chartOption1: any;
  chartOption2: any;

  d:any;
  // provData:ProvinceData[] = [];
  now = new Date(); 
  time = "";
  timeStyle = this.getNowFormatTime();
  initialTimeBefore = this.timeStyle;
  initialTimeAfter = this.timeStyle;
  plusRegionsTime = "01-09-2020";// for test
  timeBefore = "";
  timeAfter = "";
  constructor(private http:HttpClient){ }

  ngOnInit(): void {

      console.log(this.now)

      console.log(this.timeStyle)

      this.timeAfter = this.initialTimeAfter;
      this.timeBefore = this.initialTimeBefore;
      let url = `https://api.opencovid.ca/summary?loc=prov&after=${this.timeAfter}&before=${this.timeBefore}`;
      let urlF = `https://api.opencovid.ca/summary?loc=canada&after=${this.timeAfter}&before=${this.timeBefore}`;
      let provData:ProvinceData[] = [];
      let defaultTable = document.getElementById("data") ;
      let EnableTimePeriod = document.getElementById("fed");
      (defaultTable as any).innerHTML = "";
      (EnableTimePeriod as any).innerHTML = "";




      this.http.get<Object>(url).subscribe((data:any)=>{


        console.log(data)
        
        this.d = data
        this.d.summary.forEach((e:any) => {
          this.provincesForChart.push(e.province)
          this.newCasesForChart.push(e.cases)
          this.cumulativeCasesForChart.push(e.cumulative_cases)
          this.newDeathsForChart.push(e.deaths)
          this.cumulativeDeathsForChart.push(e.cumulative_deaths)
          this.newRecoveredChart.push(e.recovered)
          this.cumulativeRecoveredForChart.push(e.cumulative_recovered)
          console.log(e.province)
          console.log(e.cases)
          console.log(e.deaths)
          console.log(e.recovered)
          provData.push({
            province1:e.province,
            newCases:e.cases,
            newDeaths:e.deaths,
            newRecovered:e.recovered
          })
        })
        for(let i = 0; i < provData.length; i++){
          (defaultTable as any).innerHTML += `<tr>
                    <td>${provData[i].province1}</td>
                    <td>${provData[i].newCases}</td>
                    <td>${provData[i].newDeaths}</td>
                    <td>${provData[i].newRecovered}</td>
                </tr>`
        }
        
        console.log(this.provincesForChart)
        console.log(this.newCasesForChart)
        console.log(this.newDeathsForChart)
        console.log(this.newRecoveredChart)

      })
      
      this.fillCharts();

      this.http.get<Object>(urlF).subscribe((data:any)=>{

        let federalData:FederalData[] = [];
    
          console.log(data)
    
          this.d = data
          this.d.summary.forEach((e:any) => {
            federalData.push({
              province:e.province,
              newCases: e.cases,
              cumulative_cases: e.cumulative_cases,
              newDeaths: e.deaths, 
              cumulative_deaths: e.cumulative_deaths,
              recovered: e.recovered,
              cumulative_recovered: e.cumulative_recovered
            })
    
            // this.pData = provData
            console.log(federalData)
          })
    
          
          for(let i = 0; i < federalData.length; i++){
            (EnableTimePeriod as any).innerHTML += `<tr>
                      <td>${federalData[i].province}</td>
                      <td>${federalData[i].newCases}</td>
                      <td>${federalData[i].cumulative_cases}</td>
                      <td>${federalData[i].newDeaths}</td>
                      <td>${federalData[i].cumulative_deaths}</td>
                      <td>${federalData[i].recovered}</td>
                      <td>${federalData[i].cumulative_recovered}</td>
                  </tr>`
          }
      // console.log(this.pData)
  })
  this.fillFederalCharts();
}


fillFederalCharts(){
  let salesData: ChartData<'line'> = {
    labels: ['Canada'],
    
    datasets: [
      { label: 'New Cases', data: this.newCasesForChart, tension: 0.5 },
      { label: 'Cumulative Cases', data: this.cumulativeCasesForChart, tension: 0.5 },
      { label: 'New Deaths', data: this.newDeathsForChart, tension: 0.5 },
      { label: 'Cumulative Deaths', data: this.cumulativeDeathsForChart, tension: 0.5 },
      { label: 'New Recovered', data: this.newRecoveredChart, tension: 0.5 },
      { label: 'Cumulative Recovered', data: this.cumulativeRecoveredForChart, tension: 0.5 },
    ],
  };
  
  let salesData2: ChartData<'pie'> = {
    labels: this.provincesForChart,
    datasets: [
      { data: this.newCasesForChart },
    ],
  };



  let chartOption1: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Bar chart',
      },
    },
  }

  let chartOption2: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Pie chart',
      },
    },
  }
  this.covidData = salesData
  this.chartOption1 = chartOption1
  this.covidData2 = salesData2
  this.chartOption2 = chartOption2
  
};


  fillCharts(){
    let salesData: ChartData<'line'> = {
      labels: this.provincesForChart,
      
      datasets: [
        { label: 'New Cases', data: this.newCasesForChart, tension: 0.5 },
        { label: 'New Deaths', data: this.newDeathsForChart, tension: 0.5 },
        { label: 'New Recovered', data: this.newRecoveredChart, tension: 0.5 },
      ],
    };
    
    let salesData2: ChartData<'pie'> = {
      labels: this.provincesForChart,
      datasets: [
        { data: this.newCasesForChart },
      ],
    };
  


    let chartOption1: ChartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Bar chart',
        },
      },
    }

    let chartOption2: ChartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Pie chart',
        },
      },
    }
    this.covidData = salesData
    this.chartOption1 = chartOption1
    this.covidData2 = salesData2
    this.chartOption2 = chartOption2
    
  };


  fillCharts2(){
    let salesData: ChartData<'line'> = {
      labels: this.regionsForChart,
      
      datasets: [
        { label: 'New Cases', data: this.newCasesForChart, tension: 0.5 },
        { label: 'Cumulative Cases', data: this.cumulativeCasesForChart, tension: 0.5 },
        { label: 'New Deaths', data: this.newDeathsForChart, tension: 0.5 },
        { label: 'Cumulative Deaths', data: this.cumulativeDeathsForChart, tension: 0.5 },
      ],
    };
    
    let salesData2: ChartData<'pie'> = {
      labels: this.regionsForChart,
      datasets: [
        { data: this.newCasesForChart },
      ],
    };
  


    let chartOption1: ChartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Bar chart',
        },
      },
    }

    let chartOption2: ChartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Pie chart',
        },
      },
    }
    this.covidData = salesData
    this.chartOption1 = chartOption1
    this.covidData2 = salesData2
    this.chartOption2 = chartOption2
    
  };

  fillBasicTable(){

    this.provincesForChart=[];
    this.newCasesForChart=[];
    this.newDeathsForChart=[];
    this.newRecoveredChart=[];

    let Enable : any= document.getElementById("forEnable") as HTMLElement;
    Enable.style.display="none";
    let disable : any= document.getElementById("forDisable") as HTMLElement;
    disable.style.display="initial";

    let R : any= document.getElementById("forR") as HTMLElement;
    R.style.display="none";
    let B : any= document.getElementById("forB") as HTMLElement;
    B.style.display="initial";

    let url = `https://api.opencovid.ca/summary?loc=prov&after=${this.timeAfter}&before=${this.timeBefore}`;

    if(this.checkDate(this.timeAfter)==true){
      return
    }
    if(this.checkDate(this.timeBefore)==true){
      return
    }
    let defaultTable = document.getElementById("data");
    let defaultCols = document.getElementById("cols");
    let provData:ProvinceData[] = [];
    (defaultTable as any).innerHTML = "";
    (defaultCols as any).innerHTML = "";
    this.http.get<Object>(url).subscribe((data:any)=>{

      this.d = data
      this.d.summary.forEach((e:any) => {

        console.log(e.province)
        console.log(e.cases)
        console.log(e.deaths)
        console.log(e.recovered)
        provData.push({
          province1:e.province,
          newCases:e.cases,
          newDeaths:e.deaths,
          newRecovered:e.recovered
        })
      })
      let loop = provData.length
      for(let i = 0; i < loop; i++){
        for(let j = i+1; j < loop; j++){
          if(provData[j].province1 == provData[i].province1){
            provData[i].newCases+=provData[j].newCases
            provData[i].newDeaths+=provData[j].newDeaths
            provData[i].newRecovered+=provData[j].newRecovered
            provData.splice(j, 1)
            j = j-1
            loop--
          }
        }
      }
      console.log(provData);
      for(let i = 0; i < loop; i++){
        this.provincesForChart.push(provData[i].province1)
        this.newCasesForChart.push(provData[i].newCases)
        this.newDeathsForChart.push(provData[i].newDeaths)
        this.newRecoveredChart.push(provData[i].newRecovered)
      }

      for(var i = 0; i < provData.length; i++){
        (defaultTable as any).innerHTML += `<tr>
                  <td>${provData[i].province1}</td>
                  <td>${provData[i].newCases}</td>
                  <td>${provData[i].newDeaths}</td>
                  <td>${provData[i].newRecovered}</td>
              </tr>`
      }
      (defaultCols as any).innerHTML += `<tr>
                                      <th>Province</th>
                                      <th>New Cases</th>
                                      <th>New Deaths</th>
                                      <th>New Recovered </th>
                                      </tr>`;
      
    });
    this.fillCharts();
  }

  fillEnableRegionTable(){
    this.regionsForChart=[]; 
    this.newCasesForChart=[];
    this.cumulativeCasesForChart=[];
    this.newDeathsForChart=[];
    this.cumulativeDeathsForChart=[];
    
    let Enable : any= document.getElementById("forEnable") as HTMLElement;
    Enable.style.display="initial";
    let disable : any= document.getElementById("forDisable") as HTMLElement;
    disable.style.display="none";

    let R : any= document.getElementById("forR") as HTMLElement;
    R.style.display="initial";
    let B : any= document.getElementById("forB") as HTMLElement;
    B.style.display="none";

    let url = `https://api.opencovid.ca/summary?loc=hr&after=${this.timeAfter}&before=${this.timeBefore}`;

    if(this.checkDate(this.timeAfter)==true){
      return
    }
    if(this.checkDate(this.timeBefore)==true){
      return
    }

    let EnabledCols = document.getElementById("cols");
    let EnabledTable = document.getElementById("data");
    let provPlusRegData:ProvincePlusRegionData[] = [];
    (EnabledCols as any).innerHTML = "";
    (EnabledTable as any).innerHTML = "";
    this.http.get<Object>(url).subscribe((data:any)=>{

      // let provData:ProvinceData[] = [];

      console.log(data)

      this.d = data
      this.d.summary.forEach((e:any) => {
        console.log(e.province)
        console.log(e.health_region)
        console.log(e.date)
        console.log(e.cases)
        console.log(e.cumulative_cases)
        console.log(e.deaths)
        console.log(e.cumulative_deaths)

        provPlusRegData.push({
          province: e.province,
          health_region: e.health_region,
          date: e.date,
          newCases: e.cases,
          cumulative_cases: e.cumulative_cases,
          newDeaths: e.deaths, 
          cumulative_deaths: e.cumulative_deaths
        });
      })
      let loop = provPlusRegData.length
      for(let i = 0; i < loop; i++){
        for(let j = i+1; j < loop; j++){
          if(provPlusRegData[j].province == provPlusRegData[i].province){
            if(provPlusRegData[j].health_region == provPlusRegData[i].health_region){
              provPlusRegData[i].newCases+=provPlusRegData[j].newCases
              provPlusRegData[i].newDeaths+=provPlusRegData[j].newDeaths
              provPlusRegData[i].cumulative_cases=provPlusRegData[j].cumulative_cases
              provPlusRegData[i].cumulative_deaths=provPlusRegData[j].cumulative_deaths
              provPlusRegData.splice(j, 1)
              j = j-1
              loop--
            }
            
          }
        }
      }
      console.log(provPlusRegData)
      for(let i = 0; i < loop; i++){
        this.regionsForChart.push(provPlusRegData[i].health_region)
        this.newCasesForChart.push(provPlusRegData[i].newCases)
        this.cumulativeCasesForChart.push(provPlusRegData[i].cumulative_cases)
        this.newDeathsForChart.push(provPlusRegData[i].newDeaths)
        this.cumulativeDeathsForChart.push(provPlusRegData[i].cumulative_deaths)
      }
      for(var i = 0; i < provPlusRegData.length; i++){
        (EnabledTable as any).innerHTML += `<tr>
                  <td>${provPlusRegData[i].province}</td>
                  <td>${provPlusRegData[i].health_region}</td>
                  <td>${provPlusRegData[i].newCases}</td>
                  <td>${provPlusRegData[i].cumulative_cases}</td>
                  <td>${provPlusRegData[i].newDeaths}</td>
                  <td>${provPlusRegData[i].cumulative_deaths}</td>
              </tr>`
      }
      (EnabledCols as any).innerHTML += `<tr>
                                <th>Province</th>
                                <th>Region</th>
                                <th>New Cases</th>
                                <th>Cumulative Cases</th>
                                <th>New Deaths</th>
                                <th>Cumulative Deaths </th>
                                </tr>`
    })


  }


  fillFederalTable(){
    let url = `https://api.opencovid.ca/summary?loc=canada&after=${this.timeAfter}&before=${this.timeBefore}`;

    if(this.checkDate(this.timeAfter)==true){
      return
    }
    if(this.checkDate(this.timeBefore)==true){
      return
    }
    let EnableTimePeriod = document.getElementById("fed");
    (EnableTimePeriod as any).innerHTML = "";
    this.http.get<Object>(url).subscribe((data:any)=>{

    let federalData:FederalData[] = [];

      console.log(data)

      this.d = data
      this.d.summary.forEach((e:any) => {
        federalData.push({
          province:e.province,
          newCases: e.cases,
          cumulative_cases: e.cumulative_cases,
          newDeaths: e.deaths, 
          cumulative_deaths: e.cumulative_deaths,
          recovered: e.recovered,
          cumulative_recovered: e.cumulative_recovered
        })

        // this.pData = provData
        console.log(federalData)
      })

      let loop = federalData.length
      for(let i = 0; i < loop; i++){
        for(let j = i+1; j < loop; j++){
          if(federalData[j].province == federalData[i].province){
    
            federalData[i].newCases+=federalData[j].newCases
            federalData[i].newDeaths+=federalData[j].newDeaths
            federalData[i].recovered+=federalData[j].recovered
            federalData[i].cumulative_cases=federalData[j].cumulative_cases
            federalData[i].cumulative_deaths=federalData[j].cumulative_deaths
            federalData[i].cumulative_recovered=federalData[j].cumulative_recovered
            federalData.splice(j, 1)
            j = j-1
            loop--
          }
        }
      }
      console.log(federalData)
      
      for(var i = 0; i < federalData.length; i++){
        (EnableTimePeriod as any).innerHTML += `<tr>
                  <td>${federalData[i].province}</td>
                  <td>${federalData[i].newCases}</td>
                  <td>${federalData[i].cumulative_cases}</td>
                  <td>${federalData[i].newDeaths}</td>
                  <td>${federalData[i].cumulative_deaths}</td>
                  <td>${federalData[i].recovered}</td>
                  <td>${federalData[i].cumulative_recovered}</td>
              </tr>`
      }
    })
  }









    checkDate(d:String){
      let numbers = d.split("-");
      let d1 = parseInt(numbers[0])
      let d2 = parseInt(numbers[1])
      let d3 = parseInt(numbers[2])
      console.log(d1,d2,d3)
      let slash1 = d[2]
      let slash2 = d[5]
      if(d1<1 || d1>31 || d2<1 || d2>12 || d3>2022 || d3<2020){
        if(slash1!="-" || slash2!="-"){
          alert("the format you enter is incorect, please enter in format 'dd-mm-yyyy'")
          return true
        }
        alert("the date you enter is incorect, please enter day between 1~31, month between 1~12, year between 2020~2021")
        return true
      }
      if(slash1!="-" || slash2!="-"){
        alert("the format you enter is incorect, please enter in format 'dd-mm-yyyy'")
        return true
      }
      return false
    }



  
    // reference: https://blog.csdn.net/wujiezhiwei/article/details/123840198?ops_request_misc=&request_id=&biz_id=102&utm_term=angular%20%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%20dd-mm-yyyy&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-7-123840198.142^v7^control,157^v4^control&spm=1018.2226.3001.4187
    getNowFormatTime() {
      var nowDate = new Date()
      var colon = ':'
      var h = nowDate.getHours()
      var m = nowDate.getMinutes()
      var s = nowDate.getSeconds()
      //补全0，并拼接
      return (
        this.getNowFormatDay(nowDate) 
      )
    }
    getNowFormatDay(nowDate: Date) {
      var char = '-'
      if (nowDate == null) {
        nowDate = new Date()
      }
      var day = nowDate.getDate()-1
      var month = nowDate.getMonth() + 1 //注意月份需要+1
      var year = nowDate.getFullYear()
      //补全0，并拼接
      return  this.completeDate(day) + char + this.completeDate(month) + char + year
    }
    //补全0
    completeDate(value:number) {
      return value < 10 ? '0' + value : value
    }


}
