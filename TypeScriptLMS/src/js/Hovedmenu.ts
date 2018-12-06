    //Udkommentering af aEL gør Brugerside knapper ubrugelige... Le Was?
    
    let brugerButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("Bruger");
    //brugerButton.addEventListener("click", BrugerKnap);

    function BrugerKnap(): void
    {
        console.log("Brugerside er kaldt")
        window.location.href = "index.htm";
    }

    let indstillingerButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("Indstillinger");
    //indstillingerButton.addEventListener("click", IndstillingerKnap);

    function IndstillingerKnap(): void
    {
    console.log("Indstillinger er kaldt")
    window.location.href = "Indstillinger.htm";
    }