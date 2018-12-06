import axios, 
{
AxiosResponse,
AxiosError
} from "../../node_modules/axios/index";
let uri: string = "https://ande-easj-rest.azurewebsites.net/api/bruger/";
let elementById: HTMLDivElement = <HTMLDivElement>document.getElementById("content1");
interface IPost {
    
    id: number;
    brugernavn: string;
    kodeord: string;
    sensor: null;
}

let result: IPost[] = new Array(30); //hvordan erklæres array?? //YATA!
function AxiosData (response:AxiosResponse):void
{
    let i:number=0;
    response.data.forEach(e => 
        {
result[i].brugernavn=JSON.stringify(e.brugernavn);
result[i].id=e.id;
result[i].kodeord=e.kodeord;
result[i].sensor=e.sensor;
i=i+1;

        
    });
    
   
}






 axios.get(uri).then(AxiosData).catch()
     

   
 


 function HovedmenuKnap(): void
 {
  console.log("Hovedmenu side er kaldt")
  window.location.href = "index.htm";
 }

 let MenuButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("Index");
    //If checker om menuButton er null. Fikser Fejlen hvor den loader for hurtigt.
    if (MenuButton){
        
        

        MenuButton.addEventListener("click", HovedmenuKnap);
    }

    let BrugerListe = axios.get(uri).then(function (response: AxiosResponse): void
    {
        elementById.innerHTML = JSON.stringify(response.data);
    })