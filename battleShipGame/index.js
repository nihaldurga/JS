const cell=Array.from(document.getElementsByClassName("cell"));

let count_s=0;
let count_w=0;
let count=0;



const resetButton=document.getElementById("reset-button");
const reset = () => {
    cell.forEach((i) => {
        const image = i.querySelector("img");
        image.style.display = "none";
    });

    count_s = 0;
    count_w = 0;
    count = 0;
};
resetButton.addEventListener("click", reset);


cell.forEach((i)=>{
    i.addEventListener("click",()=>{
       const images=i.querySelector('img');
        if (images.style.display === "block") {
            return;
        }
       const srcValue = images.getAttribute('src'); 
       const str=srcValue.toString();
       images.style.display = "block";
       if(str[0]==='s'){
        count_s++;
        count++;
       }else{
        count++;
       }
       if(count_s===5){
        alert("You won");
        reset();
       }
       else if(count===8){
        alert("You lost");
        reset();
       }
});
});