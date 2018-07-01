if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./service-worker.js', { scope: './' })
    .then(function (registration) {
      console.log("Service Worker registered");
    })
    .catch(function (err) {
      console.log("Service Worker failed to register", err);
    })

}


// Perform HTTP request
const get = function (url) {
  return new Promise(function (resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var result = xhr.responseText
          result = JSON.parse(result);
          resolve(result);
        } else {
          reject(xhr);
        }
      }
    };

    xhr.open("GET", url, true);
    xhr.send();

  });
};


// get('https://free.currencyconverterapi.com/api/v5/countries')
get('https://free.currencyconverterapi.com/api/v5/convert?q=USD_ZAR')
  .then(function (response) {
    // console.warn('Response', response);
    // console.warn('Rate', response.results.USD_ZAR.val);

    // document.getElementById('rateDiv').innerHTML = response.results.USD_ZAR.val;


  })
  .catch(function (err) {
    console.log("Error", err);
  })

  
get('https://free.currencyconverterapi.com/api/v5/countries')
  .then(function (response) {
    // console.log('Countries response', response.results);
    console.log('Countries response', response.results.AE.currencyId);
    console.log('Countries response', response.results.AE.currencyName);

    console.log('ID test', document.querySelectorAll('*[id]'));


// AE:
// currencyId: "AED"
// currencyName: "UAE dirham"



    // console.warn('Rate', response.results.USD_ZAR.val);

    // document.getElementById('rateDiv').innerHTML = response.results.USD_ZAR.val;


  })
  .catch(function (err) {
    console.log("Error", err);
  })

  

 
  // const rateCurrency1Name = document.getElementById('rateCurrency1Name').value;
  const rateCurrency1ID = document.getElementById('rateCurrency1ID_').outerText;
  const rateCurrency1Amount = document.getElementById('rateCurrency1Amount_').value;

  const rateCurrency2ID = document.getElementById('rateCurrency2ID_').outerText;
  const rateCurrency2Amount = document.getElementById('rateCurrency2Amount_').value;
  // const rateCurrency2Name = document.getElementById('rateCurrency2Name').value;

  console.log('1 ID', rateCurrency1ID);
  console.log('1 Amount', rateCurrency1Amount);
  console.log('2 ID', rateCurrency2ID);
  console.log('2 Amount', rateCurrency2Amount);


