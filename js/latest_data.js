const currenciesLatestRatesForm = document.getElementById("currencies__LatestRates-form");


btn__latestRates.onclick = () => showBtnLatestRates();
btn__latestRatesForm.onclick = () => getLatestRates();

showBtnLatestRates = () => {
    document.getElementById('currencies__LatestRates-form').classList.toggle('showSettings-form2');
}

// получения сегодняшней даты
getCurrentDate = () => {
    const today = new Date();
    return today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
}

getLatestRates = () => {
    loaded ();
    const options = {
        method: "GET",
    };
    const promise  = fetch('https://api.exchangeratesapi.io/'+getCurrentDate()+"", options);
    promise
        .then( response => {
            return response.json();
        })
        .then(data => {
            Object.keys(data.rates).map( (i) => {
                var nowCurencies = document.createElement('p');
                nowCurencies.textContent = `${i} ${data.rates[i]}`;
                currenciesLatestRatesForm.appendChild(nowCurencies);
            })
        });
}