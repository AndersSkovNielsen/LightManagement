//import axios, { AxiosPromise } from 'axios';
import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

//Liste kode
let elements: HTMLCollectionOf<Element> = document.getElementsByClassName("collapsible");
// let i: number;

for (let i: number = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function (): void {
        this.classList.toggle("active");
        var content: HTMLElement = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

//Aktuel kode (forbindelse til Azure)

let uri: string = "https://ande-easj-rest.azurewebsites.net/api/bruger/";
let elementById: HTMLDivElement = <HTMLDivElement>document.getElementById("content2");
let elementById2: HTMLDivElement = <HTMLDivElement>document.getElementById("content3");
let InputConverter: HTMLInputElement = <HTMLInputElement> document.getElementById("InputConverter");

axios.get(uri).then(function (response: AxiosResponse): void
{
    elementById.innerHTML = JSON.stringify(response.data);
})
.catch (function (error : AxiosError): void
{
elementById.innerHTML = JSON.stringify(error.message);
});

axios.get(uri+InputConverter).then(function(response:AxiosResponse): void
{
    elementById2.innerHTML= JSON.stringify(response.data);
})
.catch(function(error:AxiosError): void 
{
    elementById2.innerHTML = error.message;
});

function AxionGetBrugerById(): void
{ 
    let InputConverter: HTMLInputElement = <HTMLInputElement> document.getElementById("InputConverter");
  let id: number = Number(InputConverter.value); 
  axios.get(uri + id)
  .then(function (response: AxiosResponse): void {
      elementById2.innerHTML = JSON.stringify(response.data);
  })
  .catch(function (error: AxiosError): void {
      elementById2.innerHTML = error.message;
  });

}
let getIdButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("GetIdButton");
getIdButton.addEventListener("click", AxionGetBrugerById);

 //
 //
 //
 //
 //Anders' tilføjelser

//Button references
let tilføjButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("TilføjButton");

let fjernButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("FjernButton");

//Button bindings
tilføjButton.addEventListener("click", tilføjFunction)

fjernButton.addEventListener("click", fjernFunction)

//Button void functions
function tilføjFunction(): void{
    
    let tilføjName: HTMLInputElement = <HTMLInputElement> document.getElementById("TilføjName");
    let tilføjKode: HTMLInputElement = <HTMLInputElement> document.getElementById("TilføjKode");

    let navn: string = String(tilføjName.value);
    let kode: string = String(tilføjKode.value);

    console.log(navn);
    console.log(kode);

    axios.post('http://ande-easj-rest.azurewebsites.net/api/bruger/', {
    Brugernavn: navn,  
    Kodeord: kode
  })
  .then(function(response) {
    console.log(response.status);
  });
}

function fjernFunction(): void{}