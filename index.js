const base_url= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdown =document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg =document.querySelector(".msg")


for (let select of dropdown){
   for (currcode in countryList){
    let newOption =document.createElement("option");
    newOption.innerText=currcode;
    newOption.value=currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
   } else if(select.name === "to" && currcode === "INR"){
           newOption.selected="selected";
   }
   select.append(newOption);
   }
   select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
   });
}

const updateExchangeRate = async() =>{let amount  = document.querySelector(".amount input");
   let amtval = amount.value;
   console.log(amtval);
  if(amtval === "" || amtval<1){
       amtval=1;
       amtval.value="1"
    }
    console.log(fromCurr.value,toCurr.value)
       const url = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate =data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   
    let finalAmount =  amtval*rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag =(element) =>{
    let currcode =element.value;
     let countryCode = countryList[currcode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


 btn.addEventListener("click",  (evt) =>{
   evt.preventDefault();
   updateExchangeRate();
  
   })

window.addEventListener("load",()=>{
   updateExchangeRate();
})
   