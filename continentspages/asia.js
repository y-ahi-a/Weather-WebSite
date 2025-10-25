const apiKey="758eab95dab8f6ba36e21d5d6e219c79";

function showMenu(){
    const menu=document.getElementById("burgermenu");
    menu.classList.toggle("active");
}
async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response=await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("could not fetch data");
    }
    return await response.json();
}
document.addEventListener("DOMContentLoaded", async (event)=>{
    document.getElementById("loader").style.display = "block";
    document.getElementById("content").style.display = "none";
    
    await country();

    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 1000);
});
async function country(){
    try{
        const countries=["Tokyo","Beijing","New Delhi","Singapore","Seoul","Dubai"];
        const weather=document.getElementById("weather");
        countries.forEach(async(country)=>{
            const data= await getWeatherData(country);
            let cardWeather=document.createElement("div");
            cardWeather.id="card-weather";
            weather.appendChild(cardWeather);

            let cityImg=document.createElement("div");
            cityImg.id="cityimg";
            cardWeather.appendChild(cityImg);
            let img=document.createElement("img");
            img.src=`/images/${country}.jpg`;
            img.alt="city image";
            cityImg.appendChild(img);

            let h1=document.createElement("h1");
            h1.id="mainCity";
            h1.textContent=country;
            cardWeather.appendChild(h1);

            let weatherData=document.createElement("div");
            weatherData.id="weather-data";
            cardWeather.appendChild(weatherData);

            let firstData1=document.createElement("div");
            firstData1.id="data1";
            firstData1.className="first-data";
            weatherData.appendChild(firstData1);

            let dateHeading=document.createElement("h3");
            updateTime(dateHeading);
            setInterval(()=>updateTime(dateHeading,data.timezone),1000);
            firstData1.appendChild(dateHeading);

            let tempHeading=document.createElement("h2");
            tempHeading.textContent=Math.floor(data.main.temp)+"°C";
            firstData1.appendChild(tempHeading);

            let descriptionHeading=document.createElement("h3");
            descriptionHeading.textContent=data.weather[0].description+` ${weatherEmoji(data.weather[0].id)}`;
            firstData1.appendChild(descriptionHeading); 

            let firstData2=document.createElement("div");
            firstData2.id="data2";
            firstData2.className="first-data";
            weatherData.appendChild(firstData2);

            let humidityP=document.createElement("p");
            humidityP.textContent=`Humidity: ${data.main.humidity}%`;
            firstData2.appendChild(humidityP);

            let windSpeedP=document.createElement("p");
            windSpeedP.textContent=`Wind Speed: ${Math.floor((data.wind.speed)*3.6)} Km/H`;
            firstData2.appendChild(windSpeedP);

            let pressureP=document.createElement("p");
            pressureP.textContent=`pressure: ${data.main.pressure} hpa`;
            firstData2.appendChild(pressureP);
        });
    }catch(error){
        console.log("Fetching data ERROR",error);
    }
}
function updateTime(element,timezoneOffset) {
    const now=new Date();
    const utc=now.getTime()+now.getTimezoneOffset()*60000;
    const cityTime=new Date(utc+(timezoneOffset*1000));
    const year=cityTime.getFullYear().toString().padStart(2,0);
    const month=(cityTime.getMonth()+ 1).toString().padStart(2,0);
    const day=cityTime.getDate().toString().padStart(2,0);
    const hours=cityTime.getHours().toString().padStart(2,0);
    const minutes=cityTime.getMinutes().toString().padStart(2,0);
    const seconds=cityTime.getSeconds().toString().padStart(2,0);
    element.textContent=`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function weatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300): return "⛈️";
        case (weatherId >= 300 && weatherId < 400): return "🌦️"; 
        case (weatherId >= 500 && weatherId < 600): return "🌧️";
        case (weatherId >= 600 && weatherId < 700): return "🌨️";
        case (weatherId >= 700 && weatherId < 800): return "🌫️";
        case (weatherId === 800): return "☀️";
        case (weatherId >= 801 && weatherId <= 804): return "☁️";
        default: return "⚡";
    }
}