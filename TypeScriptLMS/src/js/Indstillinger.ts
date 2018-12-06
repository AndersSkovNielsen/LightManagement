let i = document.querySelector('input');
let o = document.querySelector('output');

let slider: HTMLProgressElement = <HTMLProgressElement> document.getElementById("myRange");
let output =  document.getElementById("demo");
output.innerHTML = slider.value.toString(); // Display the default slider value



// Update the current slider value (each time you drag the slider handle)
function slideSet() {
    console.log(i.value)
    o.innerHTML = i.value;
}

slider.addEventListener("scroll", slideSet)
//Eksperiment