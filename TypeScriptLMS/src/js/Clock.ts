import axios, { AxiosPromise, AxiosResponse } from  "../../node_modules/axios/index" 


let display :HTMLDivElement= <HTMLDivElement> document.getElementById("clock") 
let uri:string = "http://worldclockapi.com/api/json/utc/now"

 





let raw:string ;
let day:number;
let month:number;
let year:number;
let hour:number;
let minute:number;
let weekDay:string ;
let timeZone:string;
let timeString:string;






 export function hentDato():void
{
let result= axios.get(uri).then(function (response: AxiosResponse): void
{ 
raw= JSON.stringify (response.data.currentDateTime);
console.log (raw.slice(1,11));


year= Number( raw.slice(1,5));
month= Number (raw.slice (6,8));
day=Number(raw.slice(9,11));
hour=Number( raw.slice(12,14))+1;
minute=Number(raw.slice(15,17))

if(hour>23)
{
    hour=0;
    day=day+1;
    if(day>31){
        day=1;
    month=month+1;}
if(month>12){
    month=1;
    year=year+1;
}
}



weekDay= response.data.dayOfTheWeek;
timeZone=response.data.timeZoneName;
timeString=weekDay +" "+  day + "/"+month+"/"+year+ " "+hour+":"+minute +" CET";
display.innerText=timeString;
});
}