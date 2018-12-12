//import axios, { AxiosPromise } from 'axios';
import axios, 
    {
    AxiosResponse,
    AxiosError
    } from "../../node_modules/axios/index";

let uri: string = "http://ande-easj-rest.azurewebsites.net/api/bruger/";

let errorMessage: HTMLDivElement = <HTMLDivElement> document.getElementById("ErrorMessage");

//Button references
let tilføjButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("TilføjButton");

let fjernButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("FjernButton");

//Button bindings
tilføjButton.addEventListener("click", tilføjFunction)

fjernButton.addEventListener("click", fjernFunction)

//Button void functions
function tilføjFunction(): void{

  let tilføjID: HTMLInputElement = <HTMLInputElement> document.getElementById("TilføjID");
  let tilføjName: HTMLInputElement = <HTMLInputElement> document.getElementById("TilføjName");
  let tilføjKode: HTMLInputElement = <HTMLInputElement> document.getElementById("TilføjKode");

  let id: number = Number(tilføjID.value);
  let navn: string = String(tilføjName.value);
  let kode: string = String(tilføjKode.value);

    axios.post(uri, 
      {
          Id: id,
          Brugernavn: navn,  
          Kodeord: kode
      })
      .then(function(response) 
      {
          console.log(response.data);
          console.log(response.status);

          if (response.data != true)
          {
            console.log("Error: Tilføj");
            errorMessage.innerHTML = "ID allerede i brug. Vælg et andet.";
          }
          else
          {
            console.log("Succes: Tilføj");
            errorMessage.innerHTML = "Bruger " + id + " er tilføjet.";
          }
      });
}

function fjernFunction(): void
{
  let sletBruger: HTMLInputElement = <HTMLInputElement> document.getElementById("SletBruger");
  let id: number = Number(sletBruger.value);

  axios.delete(uri + id)
  .then(function(response)
  {
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200

    if (response.data != true)
      {
        console.log("Error: Fjern");
        errorMessage.innerHTML = "ID findes ikke. Vælg et andet.";
      }
      else
      {
        console.log("Succes: Fjern");
        errorMessage.innerHTML = "Bruger " + id + " er fjernet.";
      }
  })
}