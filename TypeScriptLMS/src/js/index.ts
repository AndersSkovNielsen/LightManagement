//import axios, { AxiosPromise } from 'axios';
    import axios, 
    {
    AxiosResponse,
    AxiosError
    } from "../../node_modules/axios/index";
    import "./Login";
    import "./Bruger";
    import {hentDato} from "./Clock";

    //Liste kode
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName("collapsible");
    // let i: number;

    for (let i: number = 0; i < elements.length; i++) 
    {
    elements[i].addEventListener("click", function (): void 
    {
         hentDato();
        this.classList.toggle("active");
        var content: HTMLElement = this.nextElementSibling;
        if (content.style.maxHeight) 
        {
            content.style.maxHeight = null;
        } else 
        {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
    }

    //Aktuel kode (forbindelse til Azure

    let uri: string = "https://ande-easj-rest.azurewebsites.net/api/bruger/";
    let elementById: HTMLDivElement = <HTMLDivElement>document.getElementById("content1");
    let elementById2: HTMLDivElement = <HTMLDivElement>document.getElementById("content2");
    let InputConverter: HTMLInputElement = <HTMLInputElement> document.getElementById("InputConverter");

    axios.get(uri).then(function (response: AxiosResponse): void
    {
        let list: string = "";
        let i: number;

            for(i=0; i<10; i++)
            {
                list = list + response.data[i].id + " - " + response.data[i].brugernavn + " - " + response.data[i].kodeord + "<br/>";
            }
        
        elementById.innerHTML = list;
    })

    

    axios.get(uri+InputConverter).then(function(response:AxiosResponse): void
    {
    elementById2.innerHTML= JSON.stringify(response.data);
    })

    

    


    
    function LoginSideKnap(): void
    {
     console.log("Login side er kaldt")
     window.location.href = "LoginSide.htm";
    }
   

    
    
    

    let getIdButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("GetIdButton");
    getIdButton.addEventListener("click", AxionGetBrugerById);

    let LoginSideButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("LoginSideButton");
    LoginSideButton.addEventListener("click", LoginSideKnap);
    
    

    function AxionGetBrugerById(): void
    { 
        let InputConverter: HTMLInputElement = <HTMLInputElement> document.getElementById("InputConverter");
        //if (InputConverter.value=null)
        //{
          //  elementById2.innerHTML = "Please Input ID before pressing the 'Get' button " ;  
        //}
    //else 
        //{
        {
            let id: number = Number(InputConverter.value); 
            axios.get(uri + id)
            .then(function (response: AxiosResponse): void 
        {
            elementById2.innerHTML = response.data.id + " - " + response.data.brugernavn + " - " + response.data.kodeord
        })
        .catch(function (error: AxiosError): void 
        {
        elementById2.innerHTML = error.message;
        });
    }
}