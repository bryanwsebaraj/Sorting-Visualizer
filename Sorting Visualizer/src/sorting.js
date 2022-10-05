// swap function for elements with .style.height feature
function swap(el1, el2) {
    console.log('In swap()');
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
    
}

const pages = [".bubbleSort", ".insertionSort", ".mergeSort", ".quickSort", ".selectionSort", ".radixSort", ".shellSort"]

// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSortingBtn(){
    for(let i = 0; i < pages.length; i++){
        document.querySelector(pages[i]).disabled = true;
    }
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn(){
    for(let i = 0; i < pages.length; i++){
        document.querySelector(pages[i]).disabled = false;
    }
}

// Function passes string with to display worst cast time complexity of current sorting algorithm
function timeComplexity(timeString){
    document.getElementById("timecomplexity").innerHTML = "Worst Case Time Complexity: " + timeString;
}

// Function passes string with to display worst cast space complexity of current sorting algorithm
function spaceComplexity(spaceString){
    document.getElementById("spacecomplexity").innerHTML = "Worst Case Space Complexity: " + spaceString;
}

// Function passes string with the name of the sorting algorithm currently running
function currentPage(currentPageString){
    document.getElementById("currentSort").innerHTML = "Currently Running: " + currentPageString;
}

// Disables array size slider during sorting 
function disableSizeSlider(){
    document.querySelector("#arr_sz").disabled = true;
}

// Enables array size slider after algorithm completion
function enableSizeSlider(){
    document.querySelector("#arr_sz").disabled = false;
}

// Disables newArray button during sorting 
function disableNewArrayBtn(){
    document.querySelector(".newArray").disabled = true;
}

// Enables newArray button after algorithm completion
function enableNewArrayBtn(){
    document.querySelector(".newArray").disabled = false;
}

// runs all disable functions after a sorting algorithm button is pressed
function disable(currentPageString){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    currentPage(currentPageString);
}

// runs all enable functions to re-establish button/slider functions after algorithm has completed
function enable(){
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn(); 
    currentPage("");
}

// sync function used as a pause in the animation of the sorting algorithms
function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

// size slider
let arraySize = document.querySelector('#arr_sz');

// istener to update the bars on the UI
arraySize.addEventListener('input', function(){
    console.log(arraySize.value, typeof(arraySize.value));
    createNewArray(parseInt(arraySize.value));
});

// sets default input for waitforme function
let delay = 260;

// delay slider
let delayElement = document.querySelector('#speed_input');

// istener to update delay time 
delayElement.addEventListener('input', function(){
    console.log(delayElement.value, typeof(delayElement.value));
    delay = 320 - parseInt(delayElement.value);
});

let array = [];
createNewArray();

function createNewArray(noOfBars = 72) {
    deleteChild();
    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 250) + 1);
    }
    console.log(array);
    const bars = document.querySelector("#bars");
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]*2}px`;
        bar.classList.add('bar');
        bar.classList.add('bar-visual');
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
    }
}

// function to delete all the previous bars 
function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}

const newArray = document.querySelector(".newArray");
newArray.addEventListener("click", function(){
    console.log("From newArray " + arraySize.value);
    console.log("From newArray " + delay);
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});
