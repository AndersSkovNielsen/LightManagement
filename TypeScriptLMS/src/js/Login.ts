import axios, 
{
AxiosResponse,
AxiosError
} from "../../node_modules/axios/index";
let uri: string = "https://ande-easj-rest.azurewebsites.net/api/bruger/";
let elementById: HTMLDivElement = <HTMLDivElement>document.getElementById("content1");
let LoginNavn: HTMLInputElement = <HTMLInputElement>document.getElementById("LoginNavn");
let Kodeord: HTMLInputElement = <HTMLInputElement>document.getElementById("LoginKodeord");
let ID: HTMLInputElement = <HTMLInputElement>document.getElementById("theId");
let Bruger: string = "";
let Login: string = "";

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
            //result[i].sensor=e.sensor;
            i=i+1;



        
        }
    );
    
   
}






 axios.get(uri).then(AxiosData).catch()
     

   
 


 function HovedmenuKnap(): void
 {
    sammenlign();
    console.log(Sammenlign)
     if(Sammenlign == true)
    {
        console.log("Hovedmenu side er kaldt")
        window.location.href = "index.htm";
    }
}
        

 

   


    
    //Skaber en boolean so skal checkes for true eller false for adgang til næste side.
    let Sammenlign: boolean = false;
    //En function som sammenligner den nuværende bruger, som bliver ændret til det der skrives ind på siden.
    function sammenlign(): void
    {
        console.log(result.length)
        console.log("sammenlign begyndt")

        result.forEach(element => 
        {
            
            console.log("loop begyndt"+element)
            //if(String(LoginNavn) == element.brugernavn)
            //{
            //    if(String(Kodeord) == element.kodeord)
            //    Sammenlign = true;         
            //    stop();
           // }
           if(Login == Bruger)
           {
               console.log(Login + Bruger)
               Sammenlign = true;
           }
        });
    }
    //skaber button element der føre tilbage til index siden
    let MenuButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("Index");
    //If checker om menuButton er null. Fikser Fejlen hvor den loader for hurtigt.
    if (MenuButton)
    {
        MenuButton.addEventListener("click", HovedmenuKnap);
        
    }





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