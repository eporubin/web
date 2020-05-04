//  objects to represent each plan and the objects are stored into an array called CONTRACTS 
//in order to make able the comparison between plans I stored in the object all values in numeric format so that data is only in GB and respectiv convert is 1MB = 0.001GB and Unlimited=1000
const contracts = [
    {phone:"iPhone XS", brand:"Apple", monthlyCost:"43", data:"0.5", minutes:"1000", texts:"1000"},
    {phone:"iPhone 11", brand:"Apple", monthlyCost:"64", data:"90", minutes:"1000", texts:"1000"},
    {phone:"Galaxy S10", brand:"Samsung", monthlyCost:"30", data:"20", minutes:"1000", texts:"1000"},
    {phone:"Galaxy S10", brand:"Samsung", monthlyCost:"65", data:"1000", minutes:"1000", texts:"1000"},
    {phone:"Galaxy A10", brand:"Samsung", monthlyCost:"11.99", data:"0.5", minutes:"250", texts:"1000"},
    {phone:"Galaxy S9", brand:"Samsung", monthlyCost:"31", data:"20", minutes:"1000", texts:"1000"},
    {phone:"StarTAC", brand:"Motorola", monthlyCost:"3", data:"0", minutes:"200", texts:"500"},
    {phone:"Pixel 3A", brand:"Google", monthlyCost:"23", data:"4", minutes:"1000", texts:"1000"},
    {phone:"Xperia 10", brand:"Sony", monthlyCost:"30", data:"20", minutes:"1000", texts:"1000"},
    {phone:"P30", brand:"Huawei", monthlyCost:"27.99", data:"0.5", minutes:"500", texts:"1000"}

];
//--------------------END Contracts object---------------------

//----------START CheckBox Option Storing-------------------------

// empty object to store the selected options
var options ={
    "brands": []//use an array to store the options
};
function add(){
    var sbox = Array.from(document.getElementsByName("mycheckboxes"));
    options.brands = []; //empty the array before rebuilding
    sbox.forEach(function (v){
        if (v.checked){
            options.brands.push(v.value);
        }
    });

    console.log(options.brands); //output array selected in the console
}

//-------------------END CheckBox Option Storing-------------

//-----------------START Getting User Preferences-----------------



//get the monthly cost number
function getMonthlyCost(){
    const monthlyCost = document.getElementById("myRange").value;
  return monthlyCost;
};



//get the minimum data units 
function getData(){
    const data = document.getElementById("data").value;
    const units = document.getElementById("dataUnit").value;
    const convert = 1000;
    //converting the input values so that they will corespond to the object
    if (units === "unlimited"){ //if user select the input "Unlimited" from oprions
        data = convert;
        return data;

    }else if(units === "MB"){//if user select the MB from options it convert it to GB by dividing.
        return data/1000;
    }
    else { 
        if(data>90){ //if it will enter any value bigger then 90GB it will consider it as unlimited

            return convert;
        }else{
            return data;
        }
    }
};
//get the minimum minutes- and convert to compare to unlimited
function getMinutes(){
    const minutes = document.getElementById("minutes").value;
    const convert = 1000;
    if (minutes<250){  //every brand has it`s own limit on minutes so fuck knows how to convert them
        return convert;
    } else if(minutes ==="unlimited" || minutes ==="Unlimited"){
        return convert;
    }
  return minutes;
};
//get the minimum texts
function getTexts(){
    const mess = document.getElementById("texts").value;
    const convert = 1000;
    if(mess>2){
        return convert; //only motorala limit is 500 in rest all unlimited again Fuck knows how to convert it
    }else if(mess ==="unlimited" || mess ==="Unlimited"){
        return convert;
    }
  return mess;
  
};
//collecting together all user preferences into an object userPreferences
function getUserPreferences(){
     const brand = options.brands[0]; //looking only for the first option in the array! NEED TO WORK FOR IF THERE ARE MORE OPTIONS TO CHOOSE FROM 
    const monthlyCost = getMonthlyCost();
    const data = getData();
    const minutes = getMinutes();//unlimitid case not working properly
    const message = getTexts();//unlimitid case not working properly
    const userPreferences = { brandS: brand, monthlyCostS: monthlyCost, dataS: data, minutesS: minutes, txtS: message};
    return userPreferences;
}
//------------------------END Getting User Preferences -----------------
//---------------START Matching contract plans-----------------------------
//
function filterContracts(userPreferences){
    matchingContracts = contracts.filter(function(contract){
        if(contract.brand == userPreferences.brandS && contract.monthlyCost <= userPreferences.monthlyCostS
             && contract.data >= userPreferences.dataS
             && contract.minutes >= userPreferences.minutesS
             && contract.texts >= userPreferences.txtS )
             {
            return true;
        } return false;
    }); return matchingContracts;
};

const resultDiv =document.querySelector("#result"); // get hold of the div from the html page
function displayResults(matchingContracts){
    if(matchingContracts.length>0){
        resultDiv.textContent = `Here is your potential contract match:`
        matchingContracts.forEach(function(contract){
            const newParagraph = document.createElement ("p");//create a <p> element
            newParagraph.textContent = `${contract.phone} ${contract.brand} ${contract.monthlyCost}£`;
            resultDiv.appendChild(newParagraph);//insert the <p> into this section
        });
    }else{
      resultDiv.textContent = `no matching contracts`;
    };
};

function main(){
        const userPreferences = getUserPreferences();
        const matchingContracts = filterContracts(userPreferences);
        displayResults(matchingContracts);
    };



const btn = document.getElementById("myButton");
btn.addEventListener("click", function(){

    main();
});
