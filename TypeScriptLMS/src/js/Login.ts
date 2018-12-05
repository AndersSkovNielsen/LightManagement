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
interface IPost extends Array<IPost>{}

 var result:IPost[] = []
   
 


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