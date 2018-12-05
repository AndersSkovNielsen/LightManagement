import axios, { AxiosPromise, AxiosResponse } from  "../../node_modules/axios/index";

let uri:string = "http://worldclockapi.com/api/jsonp/cet/now?callback=mycallback"

let raw:string ="";
let date:string= "";
let time:string="";
let weekDay:string ="";
let timeZone:string="";

let result= axios.get(uri).then(function (response: AxiosResponse): void
{
raw= raw + response.data.currentDateTime;
date= date+ raw.slice(0,11);
time= time+ raw.slice(12,17);
weekDay=weekDay+response.data.dayOfTheWeek;
timeZone=timeZone+response.data.timeZoneName;

})

let display :HTMLDivElement= <HTMLDivElement> document.getElementById("clock") 
display.innerHTML= weekDay +" "+  date + " " + time +" "+ timeZone; 