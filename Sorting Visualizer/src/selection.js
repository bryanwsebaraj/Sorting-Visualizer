async function selection(){
    console.log('In selection()');
    const ele = document.querySelectorAll(".bar");
    for(let i = 0; i < ele.length; i++){
        let min_index = i;
        ele[i].style.background = 'blue';
        for(let j = i+1; j < ele.length; j++){
            ele[j].style.background = 'red';
            await waitforme(delay);
            if(parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)){
                console.log('In if condition height comparision');
                if(min_index !== i){
                    ele[min_index].style.background = 'mediumpurple';
                }
                min_index = j;
            } 
            else{
                ele[j].style.background = 'mediumpurple';
            }   
        }
        await waitforme(delay);
        swap(ele[min_index], ele[i]);
        ele[min_index].style.background = 'mediumpurple';
        ele[i].style.background = 'green';
    }
}

const selectionbtn = document.querySelector(".selectionSort");
selectionbtn.addEventListener('click', async function(){
    disable("Selection Sort");
    await selection();
    enable();
});

const selectionbtncom = document.querySelector(".selectionSort");
selectionbtncom.addEventListener('mouseover', async function(){
    timeComplexity("O(n^2)");
    spaceComplexity("O(1)");
});