//import axios, { AxiosPromise } from 'axios';
    import axios, 
    {
    AxiosResponse,
    AxiosError
    } from "../../node_modules/axios/index";
    import "./Login";
    import "./Bruger";
    import {hentDato} from "./Clock";

    let uri: string = "https://ande-easj-rest.azurewebsites.net/api/bruger/";
    let uri2: string = "https://ande-easj-rest.azurewebsites.net/api/sensor/";

    //Liste kode
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName("collapsible");
    // let i: number;

    for (let i: number = 0; i < elements.length; i++) 
    {
    elements[i].addEventListener("click", function (): void 
    {
        console.log("click");
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

    let elementById: HTMLDivElement = <HTMLDivElement>document.getElementById("content1");
    let elementById2: HTMLDivElement = <HTMLDivElement>document.getElementById("content2");
    let InputConverter: HTMLInputElement = <HTMLInputElement> document.getElementById("InputConverter");

    axios.get(uri).then(function (response: AxiosResponse): void
    {
        let list: string = "";
        let i: number;

            for(i=0; i<response.data.length; i++)
            {
                list = list + "ID: " + response.data[i].id + " = " + response.data[i].brugernavn + "<br/>";
            }
        
        elementById.innerHTML = list;
    })

    axios.get(uri+InputConverter).then(function(response:AxiosResponse): void
    {
    elementById2.innerHTML= JSON.stringify(response.data);
    })

    let getIdButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("GetIdButton");
    getIdButton.addEventListener("click", AxionGetBrugerById);

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
            elementById2.innerHTML = "ID: " + response.data.id + " = " + response.data.brugernavn
        })
        .catch(function (error: AxiosError): void 
        {
        elementById2.innerHTML = error.message;
        });
        }
    }

    //Indstillinger

    interface Sensor {
    
        id: number;
        isMoving: string;
        sensitivity: number;
    }

    let idbutton: HTMLInputElement = <HTMLInputElement> document.getElementById("IDButton");
    idbutton.addEventListener("click", HentSensor)

    let sensorid: HTMLInputElement = <HTMLInputElement> document.getElementById("SensorID");

    let sensoroutput: HTMLOutputElement = <HTMLOutputElement> document.getElementById("SensorOutput");

    let valgtSensor: Sensor = null;

    function HentSensor():void
    {
        let idSensor: number = Number(sensorid.value);

        axios.get(uri2 + idSensor)
            .then(function (response: AxiosResponse): void 
        {
            valgtSensor = response.data;
            sensoroutput.innerHTML = "ID: " + response.data.id + " - Sensitivitetsniveau på: " + response.data.sensitivity;
        });
    }

    //Indstillinger - Sensitivitetsstyring
    let upbutton: HTMLInputElement = <HTMLInputElement> document.getElementById("SenseUpButton");
    upbutton.addEventListener("click", SensivititetOp)

    let downbutton: HTMLInputElement = <HTMLInputElement> document.getElementById("SenseDownButton");
    downbutton.addEventListener("click", SensivititetNed)

    function SensivititetOp():void
    {
        valgtSensor.sensitivity = valgtSensor.sensitivity - 0.3;

        axios.put(uri2 + valgtSensor.id,
            {
            Id: valgtSensor.id,
            IsMoving: valgtSensor.isMoving,  
            Sensitivity: valgtSensor.sensitivity
            }).then(function (response: AxiosResponse): void
            {
                sensoroutput.innerHTML = "ID: " + valgtSensor.id + " - Sensitivitetsniveau på: " + valgtSensor.sensitivity;
            })
    }

    function SensivititetNed():void
    {
        valgtSensor.sensitivity = valgtSensor.sensitivity + 0.3;

        axios.put(uri2 + valgtSensor.id,
            {
            Id: valgtSensor.id,
            IsMoving: valgtSensor.isMoving,  
            Sensitivity: valgtSensor.sensitivity
            }).then(function (response: AxiosResponse): void
            {
                sensoroutput.innerHTML = "ID: " + valgtSensor.id + " - Sensitivitetsniveau på: " + valgtSensor.sensitivity;
            })
    }

    //Side navigation

    let LoginSideButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("LoginSideButton");
    LoginSideButton.addEventListener("click", LoginSideKnap);

    function LoginSideKnap(): void
    {
     console.log("Login side er kaldt")
     window.location.href = "LoginSide.htm";
    }

    let TilbageButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("Tilbage");
    TilbageButton.addEventListener("click", HovedmenuKnap);

    function HovedmenuKnap(): void
    {
    console.log("Hovedmenu er kaldt")
    window.location.href = "Hovedmenu.htm";
    }

    let settingsButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("Settings");
    settingsButton.addEventListener("click", SettingsKnap);

    function SettingsKnap(): void
    {
    console.log("Indstillinger er kaldt")
    window.location.href = "Indstillinger.htm";
    }