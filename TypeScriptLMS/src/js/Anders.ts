//import axios, { AxiosPromise } from 'axios';
import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

let uri: string = "http://ande-easj-rest.azurewebsites.net/api/bruger/";

//Anders' tilføjelser

//Button references
let tilføjButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("TilføjButton");

let fjernButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("FjernButton");

//Button bindings
tilføjButton.addEventListener("click", tilføjFunction)

fjernButton.addEventListener("click", fjernFunction)

//Button void functions
function tilføjFunction(): void{

  let errorMessage: HTMLDivElement = <HTMLDivElement> document.getElementById("ErrorMessage");


  let tilføjID: HTMLInputElement = <HTMLInputElement> document.getElementById("TilføjID");
  let tilføjName: HTMLInputElement = <HTMLInputElement> document.getElementById("TilføjName");
  let tilføjKode: HTMLInputElement = <HTMLInputElement> document.getElementById("TilføjKode");

  let id: number = Number(tilføjID.value);
  let navn: string = String(tilføjName.value);
  let kode: string = String(tilføjKode.value);

  console.log(id)
  console.log(navn);
  console.log(kode);

  //if (AllowPost(id) == true)
  //{
    axios.post(uri, 
      {
          Id: id,
          Brugernavn: navn,  
          Kodeord: kode
      })
      .then(function(response) 
      {
          console.log(response.status);
      });
  }
  //else
  //{
  //  errorMessage.innerHTML = "ID allerede i brug. Vælg et andet.";
  //}

//}

function fjernFunction(): void
{

  let sletBruger: HTMLInputElement = <HTMLInputElement> document.getElementById("SletBruger");
  let id: number = Number(sletBruger.value);

  axios.delete(uri + id)
  .then(function(response){
  console.log(response.data); // ex.: { user: 'Your User'}
  console.log(response.status); // ex.: 200
  })
}

function AllowPost(id: number): any
{
  axios.get(uri + id)
  .then(function(response)
  {
    console.log(response.data);
    console.log(response.status);

    if (response.status == 200)
    {
      return false;
    }
    else
    return true
  })
}