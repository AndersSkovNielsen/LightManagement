import axios, 
{
AxiosResponse,
AxiosError
} from "../../node_modules/axios/index";

let uri: string = "https://ande-easj-rest.azurewebsites.net/api/bruger/";
let elementById: HTMLDivElement = <HTMLDivElement>document.getElementById("content1");
let LoginNavn: HTMLInputElement = <HTMLInputElement>document.getElementById("LoginNavn");
let Kodeord: HTMLInputElement = <HTMLInputElement>document.getElementById("LoginKodeord");
import BrugerInfo from "./index";

//eksperimental kode, kan slettes. gør intet.
var responseHTML = document.createElement("body");



//let BrugerInfo: HTMLDivElement = <HTMLDivElement>document.getElementById("BrugerInfo");

interface IPost {
    
    id: number;
    brugernavn: string;
    kodeord: string;
    sensor: null;
}


//skaber en tom liste, dette var tidligere et array med 30 objecter.
let result: IPost[] = []; 
//Skaber en række af objecter der sættes ind i "result" listen.
function AxiosData (response:AxiosResponse):void
{
    console.log("axios data")
    let i:number=0;
    result = response.data;

}
//Nedenunder er der den tidligere version af "AxiosData", som skulle lægge objecter fra resten over i "result" listen.
///////////
//function AxiosData (response:AxiosResponse):void
//{
//    let i:number=0;
//    //for(let i = 0; i<result.length;i++)
//    response.data.array.forEach(e => {
//        {
//            result[i].id=e.id;
//            result[i].brugernavn=JSON.stringify(e.brugernavn);
//            result[i].kodeord=JSON.stringify(e.kodeord);
//            result[i].sensor=e.sensor;
//            i=i+1;
//        }
//    });
//}
///////////



//starter axios funktionen og tildeler den REST-objecterne.
 axios.get(uri).then(AxiosData).catch()
 axios.get(uri).then(function(response:AxiosResponse):void{})
     

   
 

//Function der bliver kladt, efter boolen er blevet bestemt i "Sammenlign" function.
//skaber en alert, hvis boolen "sammenlign" viser sig at være "false".
 function HovedmenuKnap(): void
 {
     console.log("Hovedmenu Funktion");
    sammenlign();
    
    console.log("bool er:" + Sammenlign)
     if(Sammenlign == true)
    {
        //Bruger = String(LoginNavn);
        //BrugerInfo.innerHTML = "test";
        window.location.href = "index.htm";
        
    }
    else{
        alert("Forkert brugernavn eller kodeord.");
    }
 }
        

 

   


    
    //Skaber en boolean som skal checkes for true eller false for adgang til næste side.
    let Sammenlign: boolean = false;
    //En function som sammenligner den nuværende bruger, som bliver ændret til det der skrives ind på siden.
    function sammenlign(): void
    {
        console.log(result.length)
        console.log("sammenlign function begyndt")
        for(let id = 0; id<result.length;id++)
        {
            console.log(String(result[1]))
            if(LoginNavn.value.toString() == result[id].brugernavn.toString())
            {
                console.log(String(result[id].brugernavn))
                if(String(Kodeord.value) == result[id].kodeord)
                {
                    Sammenlign = true;   
                    stop();
                }
            }
        }        
    }
    //skaber button element der føre tilbage til index siden
    let MenuButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("Index");
    //If checker om menuButton er null. Fikser Fejlen hvor den loader for hurtigt.
    if (MenuButton)
    {
        MenuButton.addEventListener("click", HovedmenuKnap);
        
    }




//-------------------------------------------------
//ikke god kode

   // function ÆndreBruger(): string 
   // {
   //     axios.get(uri).then(function (response: AxiosResponse): void
   //     {
   //         Bruger = Bruger + response.data[1].id + " - " + LoginNavn + " - " + Kodeord + "<br/>";
   //         
   //     })
   //     return Bruger;
   // }
   // let BrugerListe =[ 
   //     axios.get(uri).then(function (response: AxiosResponse): void
   // {
   //     let i: number;
//
  //          for(i=0; i<10; i++)
   //         {
   //             Login = response.data[i].id + " - " + response.data[i].brugernavn + " - " + response.data[i].kodeord + "<br/>";
   //         }
   //     
   //     elementById.innerHTML = Login;
   // })]