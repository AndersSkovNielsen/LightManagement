import axios, { AxiosPromise, AxiosResponse } from  "../../node_modules/axios/index" 

let display :HTMLDivElement= <HTMLDivElement> document.getElementById("clock") 
let uri:string = "http://worldclockapi.com/api/json/utc/now"

 





let raw:string ;
let day:string;
let month:string;
let year:string;
let time:string;
let weekDay:string ;
let timeZone:string;
let blalba:string;




 export function hentDato():void
{
let result= axios.get(uri).then(function (response: AxiosResponse): void
{
raw= JSON.stringify (response.data.currentDateTime);
console.log (raw.slice(1,11))

//date=  raw //raw.slice(1,11);
year= raw.slice(1,5)
month= raw.slice (7,9)
day=raw.slice(9,11)
time= raw.slice(12,17)
weekDay= response.data.dayOfTheWeek;
timeZone=response.data.timeZoneName;

})
blalba=weekDay +" "+  day + "/"+month+"/"+year+ " " + time +" "+ timeZone;

display.innerHTML=blalba;

}