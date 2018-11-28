//import axios, { AxiosPromise } from 'axios';
import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";


interface Person {
    firstName: string;
    lastName: string;
    //note her::::
}

function greeter(person: Person): string {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let user: Person = { firstName: "John", lastName: "Doe" };

let element: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
element.innerHTML = greeter(user);

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


let uri: string = "https://ande-easj-rest.azurewebsites.net/api/bruger";


let elementById: HTMLDivElement = <HTMLDivElement>document.getElementById("content2");
let elementById2: HTMLDivElement = <HTMLDivElement>document.getElementById("content3");
let InputConverter: HTMLInputElement = <HTMLInputElement> document.getElementById("InputConverter");

axios.get(uri)
    .then(function (response: AxiosResponse): void {
        elementById.innerHTML = JSON.stringify(response.data);
    })
    .catch(function (error: AxiosError): void {
        elementById.innerHTML = error.message;
    });

    axios.get(uri + InputConverter)
    .then(function (response: AxiosResponse): void {
        elementById2.innerHTML = JSON.stringify(response.data);
    })
    .catch(function (error: AxiosError): void {
        elementById2.innerHTML = error.message;
    });


function AxionGetBid(): void
{

    axios.get('https://ande-easj-rest.azurewebsites.net/api/bruger')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

}

function AxionGetBidById(id:number): void
{

    axios.get('https://ande-easj-rest.azurewebsites.net/api/bruger' + id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

}

function CTO(): void
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
let toOuncesButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("GetIdButton");
toOuncesButton.addEventListener("click", CTO);