const btn__currenciesCalculator = document.getElementById('btnCurrenciesCalculator');
const btn__latestRates = document.getElementById('btn__latestRates')
const btn__latestRatesForm = document.getElementById('btnLatestRates');
const currenciesFirst = document.getElementsByTagName("select");
const currenciesValue = document.getElementById('currenciesValue');
const currencies__Curencies = document.getElementById("currencies__Curencies");
const currencies__currentData = document.getElementById("currencies__currentData");
const currenciesExchangeValue = document.getElementById("currenciesExchangeValue");
const inputData = document.getElementById('calcData');
console.log(inputData.value);
const radioBtn = document.getElementById("radioDiv");

const dataHistory = document.getElementById("his");
// const pageReloaded = document.getElementById('page-reloader');


loaded = () => {
    document.getElementById('page-preloader').style.display = "block";
    setTimeout( function () {
   document.getElementById('page-preloader').style.display = "none";
}
    ,400)
}

changeFunc = (chengeelem,func1,func2) => {
    if (chengeelem.checked) {
        func1;
    } else {
        func2;
    }}
currenciesFirst[0].onchange = () => {
    changeCurenciesFirsttoExchenge();
    changeFunc(dataHistory,getCalculatorHitoryRates(),getCalculatorRates());
       }

currenciesFirst[1].onchange = () => {
    changeCurenciesExchengetoFirst();
    changeFunc(dataHistory,getCalculatorHitoryRates(),getCalculatorRates());
   };

btn__currenciesCalculator.onclick = () => {
    showBtnCurenciesCalculator();
}

showBtnCurenciesCalculator = () => {
    document.getElementById('currencies__Calculator-form').classList.toggle('showSettings-form1');
}

changeCurenciesFirsttoExchenge = () => {
    currenciesFirst[0].value === "USD" ? currenciesFirst[1].value = "EUR" : currenciesFirst[1].value = "USD";
    return currenciesFirst[1].value;
  }

changeCurenciesExchengetoFirst = () => {
    currenciesFirst[1].value === "USD" ? currenciesFirst[0].value = "EUR" : currenciesFirst[0].value = "USD";
    return currenciesFirst[0].value;
   }

currenciesValue.onchange = () => {
    // console.log(dataHistory.checked);
    changeFunc(dataHistory,getCalculatorHitoryRates(),getCalculatorRates());
    }

getCalculatorRates  = () => {
    loaded ();
    currencies__Curencies.textContent = "";
    var options = {
        method: "GET",
    };
    var promise = fetch('https://api.exchangeratesapi.io/latest?base=' + changeCurenciesExchengetoFirst() + "", options);
    promise
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data.rates);
            if (changeCurenciesExchengetoFirst() === "EUR") {
                currencies__Curencies.textContent = "1" + changeCurenciesExchengetoFirst() + "=" + data.rates.USD + changeCurenciesFirsttoExchenge();
                currenciesExchangeValue.value = (currenciesValue.value * data.rates.USD).toFixed(2);
            } else {
                currencies__Curencies.textContent = "1" + changeCurenciesExchengetoFirst() + "=" + data.rates.EUR + changeCurenciesFirsttoExchenge();
                currenciesExchangeValue.value = (currenciesValue.value * data.rates.EUR).toFixed(2);
            }
            currencies__currentData.textContent = new Date();
        })
}

getHistoricalCalcRatesData = () => {
    const historicalRatesData = new Date(event.target.value);
    // console.log(historicalRatesData);
    return (historicalRatesData.getFullYear()+"-"+(historicalRatesData.getMonth()+1)+"-"+historicalRatesData.getDate());
}

getCalculatorHitoryRates  = () => {
    loaded ();
    currencies__Curencies.textContent = "";
    var options = {
        method: "GET",
    };

    var promise = fetch(`https://api.exchangeratesapi.io/${inputData.value}?base=${changeCurenciesExchengetoFirst()}`, options);
    promise
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data.rates);
            if (changeCurenciesExchengetoFirst() === "EUR") {
                currencies__Curencies.textContent = "1" + changeCurenciesExchengetoFirst() + "=" + data.rates.USD + changeCurenciesFirsttoExchenge();
                currenciesExchangeValue.value = (currenciesValue.value * data.rates.USD).toFixed(2);
            } else {
                currencies__Curencies.textContent = "1" + changeCurenciesExchengetoFirst() + "=" + data.rates.EUR + changeCurenciesFirsttoExchenge();
                currenciesExchangeValue.value = (currenciesValue.value * data.rates.EUR).toFixed(2);
            }
            currencies__currentData.textContent = `${new Date(inputData.value)}`;
        })
}


radioBtn.onchange  = () => {
    if (dataHistory.checked) {
        currenciesExchangeValue.value = "___";
        currencies__currentData.textContent = "history data";
        currenciesValue.value = "___";
        currencies__Curencies.textContent = "history currencies";
        inputData.onchange = () => {
            getHistoricalRatesData(event.target);
            getCalculatorHitoryRates();
                              }
    }
    else {
        currenciesExchangeValue.value = " ";
        currencies__currentData.textContent = "current data";
        currenciesValue.value = " ";
        currencies__Curencies.textContent = " current currencies ";
    }
}
// remove child
removeChild = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}







