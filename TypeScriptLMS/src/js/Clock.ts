import axios, { AxiosPromise, AxiosResponse } from  "../../node_modules/axios/index";

let uri:string = "http://worldclockapi.com/api/jsonp/cet/now?callback=mycallback"

let raw:string ="";
let date:string= "";
let time:string="";
let weekDay:string ="";
let timeZone:string="";

let result= axios.get(uri).then(function (response: AxiosResponse): void
{
raw= response.data.currentDateTime;
date= raw.slice(0,11);
time= raw.slice(12,17);
weekDay=response.data.dayOfTheWeek;
timeZone=response.data.timeZoneName;

})