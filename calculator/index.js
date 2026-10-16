const buttons=document.querySelectorAll("button");
const display=document.getElementById("display");
let firstExperssion="";
let secondExperssion="";
let operation="";
buttons.forEach((i)=>{
    i.addEventListener("click",()=>{
        if (i.textContent === '.') {
            if (operation) {
                if (!secondExperssion.includes('.')) {
                    secondExperssion += '.';
                    display.textContent = secondExperssion;
                }
            } else {
                if (!firstExperssion.includes('.')) {
                    firstExperssion += '.';
                    display.textContent = firstExperssion;
                }
            }
            return;
        }
        if( Number(i.textContent) >= 0 && Number(i.textContent) <= 9 && i.textContent !== ""){
            if(operation){
                secondExperssion+=i.textContent;
                display.textContent=secondExperssion;
            }
            else{
                firstExperssion+=i.textContent;
                display.textContent=firstExperssion;
            }
        }
        else{
            console.log(i.textContent);
            let value=i.textContent;
            if (["+", "-", "%", "×"].includes(value)) {
                if (firstExperssion !== "") {
                    operation = value;
                    display.textContent="";
                }
            }
            else if(i.textContent==='C'){
                firstExperssion="";
                secondExperssion="";
                operation="";
                display.textContent = "0";
            }
            else if (value === "=") {
                if (
                    firstExperssion === "" ||
                    secondExperssion === "" ||
                    operation === ""
                ) {
                    return;
                }

                const number1 = Number(firstExperssion);
                const number2 = Number(secondExperssion);
                let result;

                if (operation === "+") {
                    result = number1 + number2;
                } else if (operation === "-") {
                    result = number1 - number2;
                } else if (operation === "×") {
                    result = number1 * number2;
                } else if (operation === "%") {
                    result = number1 % number2;
                }

                display.textContent = result;

                firstExperssion = String(result);
                secondExperssion = "";
                operation = "";
    
            }
            else if (value === "Del") {
                if (secondExperssion !== "") {
                    secondExperssion = secondExperssion.slice(0, -1);
                    display.textContent = secondExperssion || "0";
                } else if (operation) {
                    operation = "";
                    display.textContent = firstExperssion || "0";
                } else {
                    firstExperssion = firstExperssion.slice(0, -1);
                    display.textContent = firstExperssion || "0";
            }
            }

        }
    })
})