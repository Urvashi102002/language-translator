import React, {useEffect}from 'react';
import countries from '../data';
import axios from 'axios';

const Translate = () => {
  useEffect(() => {   // jis jis tag mai hume functionality chahiye thi vo humne yaha le liye
    const fromText = document.querySelector(" .from-text"); // jo humari from-text wali class thi usko humne yaha import kr liya toh y lfthand sid wal box ka code or niche wala right hand side k liye work krega
   const toText = document.querySelector(" .to-text");
    const exchangeIcon = document.querySelector(" .exchange");
  const selectTag = document.querySelectorAll("select"); // query selector all isliye likha kyonki select tag ek se jyada hai
const icons = document.querySelectorAll(".row i");  // jitne bhi i tag hai volume icon or copy icon dono side k vo yaha aa jayenge
const TranslateBtn = document.querySelector("button");

// hum chahte hai ki humare select tag mai jitni bhi countries hai vo aa jaye or left right mai by default hindi or english aa jaye
selectTag.forEach((tag,id)=>{
  for(let country_code in countries){
    let selected =  // ye humne lkya ki for in loop ke help se hindi english ko by default select k diya mtlb agar id 0 hai toh english selected aayega otherwise khaili id 1 hai toh hindi selected aayega otherwise khali
    id==0 
    ? country_code =="en-GB" 
     ? "selected"
    : ""
    : country_code =="hi-IN"
    ? "selected"
    : "";
// ab hum countries ke options ke liye code likhenge 
     let option = `<option ${selected} value ="${country_code}">${countries[country_code]}</option>`;
  // ab hume ye option tag ko insert krana hai toh isko hum kese krayenge
  // insertAdjacentHTML() tag ki help se hum kisi bhi tag ko insert kra skte hai iske andar hum do arguments dete hai first hum btayenge ki hume usko kiske aage piche rkhna hai then us tag ka name
  
    tag.insertAdjacentHTML("beforeend" , option);

    }

});
 //default hidi english dala usse hai hu exchange kr skte hai
exchangeIcon.addEventListener("click" , () =>{
  
let tempText = fromText.value;
let tempLang = selectTag[0].value;
 fromText.value = toText.value;
 toText.value = tempText;
 selectTag[0].value = selectTag[1].value;
 selectTag[1].value = tempLang;
// isse bs humara text change hoga ab hum language change krenge


});
// isse hum text ki value htayenge toh translate wali values bhi ht jayegi
fromText.addEventListener("keyup" , ()=>{
  if(!fromText.value){
    toText.value ="";
  }
});

TranslateBtn.addEventListener("click" ,()=>{
let text = fromText.value.trim(); // trim function extra space ko hta dta hai toh humne agar text mai spaces dekr rkhi hai toh un sbko y hta dega
let translateFrom = selectTag[0].value;
let translateTo = selectTag[1].value;
if (!text) return; // agar koi text nhi hai toh yahi se return ho jayega function
toText.setAttribute("placeholder", "translating...")

//  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
// // let apiUrl  = 'https://translated-mymemory---translation-memory.p.rapidapi.com/set?seg=Hello%20World!&tra=Ciao%20mondo!&langpair=en%7Cit&key=ce1hG0w.8a8Xs&de=a%40b.c';
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
 fetch(apiUrl)
      .then((res) => res.json())
      .then((data) =>{
         toText.value = data.responseData.translatedText;
        
      })
      toText.setAttribute("placeholder" , "translation")
      
// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://translateFrom-mymemory---translateTo-memory.p.rapidapi.com/createkey',
//   headers: {
//     'X-RapidAPI-Key': 'fc7f288e72mshdbac3b46c4c4c5ap12cea8jsn171c7e41530d',
//     'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
 

  })
 // functionality of icons
 // this is the function of copy text
 icons.forEach((icon)=>{
  icon.addEventListener("click" , ({target})=>{
    if(!fromText.value || !toText.value) return;
    if(target.classList.contains("fa-copy")){
      if(target.id=="from"){
        navigator.clipboard.writeText(fromText.value); // this is used for copy message

      }else{
        navigator.clipboard.writeText(toText.value);
      }
    } else{
      let sound ;
      if(target.id=="from"){
        // ye javascript mai method hai ki text ko sound mai kese convert krte hai
        sound=new SpeechSynthesisUtterance(fromText.value);
       
      }else{
        sound=new SpeechSynthesisUtterance(toText.value);
        
      }
      speechSynthesis.speak(sound);
    }
  })
 })






},[]);
  return (
    <>
    <div className='container'>
      <div className="wrapper">
        <div className="text-input">
          <textarea spellCheck = "false"
            className ="from-text" placeholder="enter text " >
          </textarea>
          <textarea
          readOnly
          spellCheck = "false"
            className ="to-text" placeholder="Translation">
          </textarea>
        </div>
        <ul className='controls'>
          <li className='row from'>
            <div className="icons">
              <i id='from' className='fas fa-volume-up'></i>
              <i id='from' className='fas fa-copy'></i>
            </div>
            <select></select>
          </li>
          <li className ='exchange'>
           <i className='fas fa-exchange-alt'></i>
          </li>
          <li className='row to'>
            <select ></select>
            <div className="icons">
              <i id='to' className='fas fa-volume-up'></i>
              <i id='to' className='fas fa-copy'></i>
            </div>
          </li>
        </ul>
      </div>
      <button>Translate Text </button>
    </div>
    </>
    
  )
}

export default Translate