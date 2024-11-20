const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
const fromCur=document.querySelector(".from select")
const toCur=document.querySelector(".to select")
const msg=document.querySelector(".msg")

for(let select of dropdown){
    for(curCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=curCode;
        newOption.value=curCode;
        if(select.name === "form" && curCode ==="USD"){
            newOption.selected="selected";
        } 
        else if(select.name ==="to" && curCode==="PKR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}
 const updateFlag=(element)=>{
    let curcode=element.value;
    let countryCode=countryList[curcode];
    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`  
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
 }
  
 btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amt=amount.value;
    if(amt==="" || amt<1){
        amt=1;
        amount.value="1";
    }

    const URL=`${BASE_URL}/${fromCur.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate = data[fromCur.value.toLowerCase()][toCur.value.toLowerCase()];
    let finalAmount = amt * rate; 
    console.log(finalAmount);

    msg.innerText=`${amt} ${fromCur.value} = ${finalAmount} ${toCur.value}`;


    
 })








