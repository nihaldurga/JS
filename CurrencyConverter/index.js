const inputData= document.getElementById("amount");
const result=document.getElementById("result");
const ConvertButton=document.getElementById("convert-btn");
const error=document.getElementById("error");
result.classList.add("result");

const ToCurrency=document.getElementById("to-currency");
const FromCurrency=document.getElementById("from-currency");


const country=async()=>{
    try{
    const respose=await fetch('https://api.restcountries.com/countries/v5?response_fields=names.common,names.native,names.official,currencies,flag.emoji&limit=100&offset=0&api-key=rc_live_14857045378248499b8e50fae90b0a28&pretty=1');
    const data=await respose.json();
    
    data.data.objects.forEach((countries)=> {
    if (!countries.currencies || countries.currencies.length === 0) {
     return;
    }
    const countryName = countries.names.common;
    const currency = countries.currencies[0].code;
    const currencyName = countries.currencies[0].name;
    let newOption1 = document.createElement("option");
    newOption1.text = `${currency} - ${currencyName} (${countryName})`;
    newOption1.value = currency;
    ToCurrency.appendChild(newOption1);
    let newOption2 = document.createElement("option");
    newOption2.text = `${currency} - ${currencyName} (${countryName})`;
    newOption2.value = currency;
    FromCurrency.appendChild(newOption2);
    });
    }
    catch(err){
        console.error(err);
    }
}
country();

let amount;
ConvertButton.addEventListener("click",async(event)=>{
    event.preventDefault();
    amount=Number(inputData.value);
    const fromCurrency = FromCurrency.value;
    const toCurrency = ToCurrency.value;
    try{
        const conversionAPI=await fetch('https://v6.exchangerate-api.com/v6/f604376b98a68fd8ce1a9c83/latest/USD');
        if (!conversionAPI.ok) {
          throw new Error("Failed to fetch exchange rates");
        }

        const conversionData=await conversionAPI.json();
        const FCurrency=conversionData.conversion_rates[fromCurrency];
        const TCurrency=conversionData.conversion_rates[toCurrency];
        const convertedAmount = amount * (TCurrency / FCurrency);
        result.textContent =`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        result.hidden = false;
        error.hidden = true;

    }
    catch(err){
        console.log(err);

        error.textContent = "An error occurred, please try again later";
        error.hidden = false;
        result.hidden = true;
    }
});

