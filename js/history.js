const currenciesHistoricalRatesFormData = document.getElementById("currencies__HistoricalRates-formData");
const hisRatesDateControl = document.getElementById('hist_date');
const btn__historicalRates = document.getElementById('btn__historicalRates');


btn__historicalRates.onclick = () => showBtnHistoricalRates();
hisRatesDateControl.onchange = () => {
    getHistoricalRatesData();
    getHistoricalCurenciesRates();
}

 showBtnHistoricalRates = () => {
    document.getElementById('currencies__HistoricalRates-form').classList.toggle('showSettings-form2');
}

// gethistoricalData
getHistoricalRatesData = () => {
    const historicalRatesData = new Date(event.target.value);
    return (historicalRatesData.getFullYear()+"-"+(historicalRatesData.getMonth()+1)+"-"+historicalRatesData.getDate());
}

getHistoricalCurenciesRates = () => {
    loaded ();
    const options = {
        method: "GET",
    };
    let promise = fetch('https://api.exchangeratesapi.io/' + getHistoricalRatesData() + "", options);
    promise
        .then( response => {
            return response.json();
        })
        .then(data => {
            removeChild(currenciesHistoricalRatesFormData);
            Object.keys(data.rates).map( (i) => {
                const newCurencies = document.createElement('p');
                newCurencies.textContent = `${i} ${data.rates[i]}`;
                currenciesHistoricalRatesFormData.appendChild(newCurencies);
                            })
        });
}

