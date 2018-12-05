import axios, { AxiosPromise, AxiosResponse } from  "../../node_modules/axios/index";
let display :HTMLDivElement= <HTMLDivElement> document.getElementById("clock") 
let uri:string = "http://worldclockapi.com/api/jsonp/cet/now?callback=mycallback"

let raw:string ;
let date:string;
let time:string;
let weekDay:string ;
let timeZone:string;
let blalba:string;

export function hentDato():void
{


let result= axios.get(uri).then(function (response: AxiosResponse): void
{
raw=  (response.data.currentDateTime).jsonp;
console.log (raw)
date=  raw.slice(0,11);
time= time+ raw.slice(12,17);
weekDay= response.data.dayOfTheWeek;
timeZone=response.data.timeZoneName;

})
blalba=weekDay +" "+  date + " " + time +" "+ timeZone;
display.innerHTML= blalba; 
}