let BrugerButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("Bruger");
BrugerButton.addEventListener("click", BrugerKnap);

function BrugerKnap(): void
{
    console.log("Brugerside er kaldt")
    window.location.href = "index.htm";
}

let IndstillingerButton:HTMLButtonElement=<HTMLButtonElement> document.getElementById("Indstillinger");
IndstillingerButton.addEventListener("click", IndstillingerKnap);

function IndstillingerKnap(): void
{
console.log("Indstillinger er kaldt")
window.location.href = "Indstillinger.htm";
}