const search = document.getElementById("search");
let oofa = document.querySelector(".labels");
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
function getDayOfWeek() {
  const now = new Date;
  const today = now.getDay();
  return today;
}
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let oofIt = 1;
 for(const oofs of document.getElementById("week").querySelectorAll(".labels")) {
  oofs.textContent = daysOfWeek[getDayOfWeek() + oofIt]
  oofIt++;
 }

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
function putWeek() {
  let i = 1;
  for (const elements of document.getElementById("week").children) {
    i++;

    let i2 = 1;
    for(const el of elements.children) {
      if(el.classList.contains("labels")) {
        continue;
      }
      let periodOf = i*2+i2-3;
      for(const days of el.children) {
        switch (days.getAttribute("class").split(" ")[0]) {
          case "dayPrec":
            days.textContent = final2.properties.periods[periodOf].probabilityOfPrecipitation.value + "%";
            break
        case "dayForecast":
            days.textContent = final2.properties.periods[periodOf].shortForecast;
            break;
        case "dayTemp":
            days.textContent = final2.properties.periods[periodOf].temperature + " F";
            break;
        case "dayWind":
            days.textContent =`${final2.properties.periods[periodOf].windDirection} \n${final2.properties.periods[periodOf].windSpeed}`;
            break;
            case "nighPrec":
            days.textContent = final2.properties.periods[periodOf+1].probabilityOfPrecipitation.value + "%";
            break
        case "nighForecast":
            days.textContent = final2.properties.periods[periodOf+1].shortForecast;
            break;
        case "nighTemp":
            days.textContent = final2.properties.periods[periodOf+1].temperature + " F";
            break;
        case "nighWind":
            days.textContent =`${final2.properties.periods[periodOf+1].windDirection} \n${final2.properties.periods[periodOf].windSpeed}`;
            break;
            
        }
      }
    }
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
    document.getElementById("titleLat").textContent = final2.properties.periods[1].name;
    document.getElementById("titleNow").textContent = final2.properties.periods[0].name;
    putWeek();
  }
