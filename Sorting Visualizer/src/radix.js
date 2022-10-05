var countArray =  [];
var auxArray = [];

function splitDigit(digit, digitPos){
    var num = digit;
    var digits = num.toString().split('');
    var realDigits = digits.map(Number)
    if(digitPos == 1){
        return realDigits[(realDigits.length - digitPos)];
    } else{
        if(realDigits.length <= (digitPos - 1)){
            return 0;
        } else{
            return realDigits[(realDigits.length - digitPos)];
        }
    } 
}

async function scan(digitPos){
    const ele = document.querySelectorAll(".bar");
    countArray =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(let i = 0; i < ele.length; i++){
        ele[i].style.background = 'red';
        if(i != 0){
            ele[i-1].style.background = 'mediumpurple';
        }
        countArray[splitDigit((parseInt(ele[i].style.height)/2), digitPos)]++;
        await waitforme(delay);
    }
    ele[ele.length-1].style.background = 'mediumpurple';
}

function rollingSummation(){
    countArray[0]--;
    for(let j = 1; j < 10; j++){
        countArray[j] = countArray[j] + countArray[j-1];
    }
}

function fillAuxArray(digitPos){
    const ele = document.querySelectorAll(".bar");
    for(let k = (ele.length-1); k >= 0; k--){
        auxArray[countArray[splitDigit((parseInt(ele[k].style.height)/2), digitPos)]] = (parseInt(ele[k].style.height)/2);
        countArray[splitDigit((parseInt(ele[k].style.height)/2), digitPos)]--;
    }
    console.log(auxArray);
}

async function swapBars(pass){
    const ele = document.querySelectorAll(".bar");
    for(let i = 0; i < ele.length; i++){
        ele[i].style.background = 'blue';
        let j = i;
        let found = false;
        while(!found){
            if(auxArray[i] == (parseInt(ele[j].style.height)/2)){
                swap(ele[i], ele[j]);
                found = true;
            } else{
                j++;
            }
        }
        await waitforme(delay);
        
        if(pass == 3){
            ele[i].style.background = 'green';
        } else{
            ele[i].style.background = 'mediumpurple';
        }
    }
}

async function radix(){
    console.log('In radix()');
    for(let digit = 1; digit <= 3; digit++){
        await scan(digit);
        rollingSummation();
        fillAuxArray(digit);
        await swapBars(digit);
    }
    
}

const radixbtn = document.querySelector(".radixSort");
radixbtn.addEventListener('click', async function(){
    disable("Radix Sort");
    await radix();
    enable();
});

const radixbtncom = document.querySelector(".radixSort");
radixbtncom.addEventListener('mouseover', async function(){
    timeComplexity("O(nk)");
    spaceComplexity("O(n + k)");
});