const search = document.getElementById("search");

function showContent(tab) {
  document.getElementById('weatherContent').style.display = 'none';
  document.getElementById('historyContent').style.display = 'none';
  document.getElementById('planetContent').style.display = 'none';

  if (tab === 'weather') {
      document.getElementById('weatherContent').style.display = 'block';
  } else if (tab === 'history') {
      document.getElementById('historyContent').style.display = 'block';
  } else if (tab === 'planet') {
      document.getElementById('planetContent').style.display = 'block';
  }
}

document.getElementById("keab").addEventListener("click", () => {
  window.location.href = "https://keabaneth.github.io"
})


search.addEventListener("submit", e => {
  e.preventDefault()

})

function searchLoc() {
  
}


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        getGrid(position.coords.latitude, position.coords.longitude);
      });
  }
  let response;
  
let script = document.createElement("script");
script.src="./eruda.js";
document.body.appendChild(script);
script.onload = function () { eruda.init()}

 async function getGrid(long, lat) {
        let url = "https://api.weather.gov/points/" + long.toFixed(4) + "," + lat.toFixed(4)
        try {
             response = await fetch(url);
             let final = await response.json()
             forecast(final);
          } catch (error) {
            document.getElementById("wind").textContent = "1" + error;
          }
 }
 let response2;
 let final2;
 async function forecast(url2) {
         
          try {
             response2 = await fetch(url2.properties.forecast);
             final2 = await response2.json();
             updForecast(final2);
          } catch (error2) {
            document.getElementById("wind").textContent = error2 + url2;
          }
  }
  function updForecast(fore) {
    document.getElementById("short").textContent = final2.properties.periods[0].shortForecast;
    document.getElementById("speed").textContent = final2.properties.periods[0].windSpeed;
    document.getElementById("dir").textContent = final2.properties.periods[0].windDirection;
    document.getElementById("temp").textContent = final2.properties.periods[0].temperature;
    document.getElementById("prec").textContent = final2.properties.periods[0].probabilityOfPrecipitation.value + "%";
    document.getElementById("tempTon").textContent = final2.properties.periods[1].temperature;
    // document.getElementById("windTon").textContent = fore.properties.periods[1].temperature;
    document.getElementById("speedTon").textContent = final2.properties.periods[1].windSpeed
    document.getElementById("dirTon").textContent = final2.properties.periods[1].windDirection
    document.getElementById("shortTon").textContent = final2.properties.periods[1].shortForecast;
    document.getElementById("precTon").textContent = final2.properties.periods[1].probabilityOfPrecipitation.value + "%"
    
  }
