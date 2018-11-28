//Virker ikke umiddelbart - Bliver ikke opdateret?
//import axios, { AxiosPromise } from 'axios';
import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

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