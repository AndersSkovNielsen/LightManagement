import axios, { AxiosPromise, AxiosResponse } from  "../../node_modules/axios/index" 

//3. Part API URI
let uri:string = "http://worldclockapi.com/api/json/utc/now"

//Element - Display
let display :HTMLDivElement= <HTMLDivElement> document.getElementById("clock") 

let raw:string ;
let day:number;
let month:number;
let year:number;
let hour:number;
let minute:number;
let weekDay:string ;
let timeZone:string;
let timeString:string;

//Function - Get
export function hentDato():void
    {
    let result= axios.get(uri).then(function (response: AxiosResponse): void
    { 
    raw= JSON.stringify (response.data.currentDateTime);
    console.log (raw.slice(1,11));

        clockNewYearsEveTest();
    year= Number( raw.slice(1,5));
    month= Number (raw.slice (6,8));
    day=Number(raw.slice(9,11));
    hour=Number( raw.slice(12,14))+1;
    minute=Number(raw.slice(15,17))
    weekDay= JSON.stringify( response.data.dayOfTheWeek);
    timeZone=response.data.timeZoneName;
    cetClockcorrection(hour)
    timeString=weekDay +" "+  day + "/"+month+"/"+year+ " "+hour+":"+minute +" CET";
        

    display.innerText=timeString;
    });

//Function - Test
function clockNewYearsEveTest():void
{
    result= axios.get(uri).then(function (response: AxiosResponse): void
    { 
    raw= JSON.stringify (response.data.currentDateTime);
    console.log (raw.slice(1,11));

    year= Number( raw.slice(1,5));
    month=12;
    day=31;
    hour=24;
    minute=0;
    weekDay="Monday";

    timeString=weekDay +" "+ day + "/"+month+"/"+year+ " "+hour+":0"+minute +" CET";

    console.log("new years eve test value before correction:" + timeString);

    cetClockcorrection(hour);

    timeString=weekDay +" "+ day + "/"+month+"/"+year+ " "+hour+"0:0"+minute +" CET";
    console.log("new years eve test after correction:"+ timeString);
    });
}

//Function - Tids korrektion
function cetClockcorrection(h:number):void
    {if(hour>23)
        {
        hour=0;
        hour
        day=day+1;
        if(weekDay=="Monday"){weekDay="Tuesday";}
        else if(weekDay=="Tuesday"){weekDay="Wednesday";}
        else if (weekDay=="Wednesday"){weekDay="Thursday";}
        else if (weekDay=="Thursday"){weekDay="Friday";}
        else if (weekDay=="Friday"){weekDay="Saturday";}
        else if (weekDay=="Saturday"){weekDay="Sunday"}
        else if (weekDay== "Sunday") {weekDay="Monday"}
        if(day>31){day=1; month=month+1;}
        if(month>12){month=1; year=year+1;}
        }
    }
}