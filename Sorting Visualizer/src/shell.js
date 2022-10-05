const increments = [8, 4, 2, 1];

async function checkAndSwap(i, j, increment){
    const ele = document.querySelectorAll(".bar");
    ele[i+(j*increment)].style.background = 'blue';
    ele[i+((j+1)*increment)].style.background = 'blue';

    await waitforme(2*delay);
    if(parseInt(ele[i+(j*increment)].style.height) > parseInt(ele[i+((j+1)*increment)].style.height)){
        swap(ele[i+(j*increment)], ele[i+((j+1)*increment)]);
        await waitforme(2*delay);
        if(j > 0){
            ele[i+(j*increment)].style.background = 'red';
            ele[i+((j+1)*increment)].style.background = 'red';
            await checkAndSwap(i, (j-1), increment); // recursive call of checkAndSwap to regress through array to compare bar to bar to the left
        }
    }
    if(increment != 1){
        ele[i+(j*increment)].style.background = 'red';
        ele[i+((j+1)*increment)].style.background = 'red';    
    } else{
        ele[i+(j*increment)].style.background = 'green';
        ele[i+((j+1)*increment)].style.background = 'green';    
    }
}

async function shelly(increment){
    const ele = document.querySelectorAll(".bar");
    for(let i = 0; i < increment; i++){
        for(let j = 0; j < Math.floor(ele.length / increment); j++){
            ele[i+(j*increment)].style.background = 'red';
        }
        await waitforme(delay);
        for(let j = 0; j < ((ele.length / increment) - 1); j++){
            await checkAndSwap(i, j, increment);
        }
        await waitforme(delay);

        if(increment != 1){
            for(let all = 0; all < ele.length; all++){
                ele[all].style.background = 'mediumpurple';
            }
        }
    }
}

async function shell(){
    console.log('In shell()');
    for(let i = 0; i < increments.length; i++){
        await shelly(increments[i]);
    }
}

const shellbtn = document.querySelector(".shellSort");
shellbtn.addEventListener('click', async function(){
    disable("Shell Sort");
    await shell();
    enable();
});

const shellbtncom = document.querySelector(".shellSort");
shellbtncom.addEventListener('mouseover', async function(){
    timeComplexity("O(n log(n))");
    spaceComplexity("O(1)");
});