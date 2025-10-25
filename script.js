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
    await mainWilaya();
    await wilaya();
    await theSeas();
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 1000);
});
async function mainWilaya() {
    try{
        const div1=document.getElementById("1data");
        const div2=document.getElementById("2data");
        const data=await getWeatherData("Constantine");
        let dateHeading=document.createElement("h3");
        updateTime(dateHeading);
        setInterval(()=>updateTime(dateHeading),1000);
        div1.appendChild(dateHeading);
        let tempHeading=document.createElement("h2");
        tempHeading.textContent=Math.floor(data.main.temp)+"°C";
        div1.appendChild(tempHeading);
        let descriptionHeading=document.createElement("h3");
        descriptionHeading.textContent=data.weather[0].description+` ${weatherEmoji(data.weather[0].id)}`;
        div1.appendChild(descriptionHeading);
        let humidityP=document.createElement("p");
        humidityP.textContent=`Humidity: ${data.main.humidity}%`;
        div2.appendChild(humidityP);
        let windSpeedP=document.createElement("p");
        windSpeedP.textContent=`Wind Speed: ${Math.floor((data.wind.speed)*3.6)} Km/H`;
        div2.appendChild(windSpeedP);
        let pressureP=document.createElement("p");
        pressureP.textContent=`pressure: ${data.main.pressure} hpa`;
        div2.appendChild(pressureP);
    }catch(error){
        console.log("Fetching data ERROR",error);
    }
}
async function wilaya() {
    try{
        let wilayas=["Algeria","Oran","Annaba","Tizi Ouzou","Tlemcen","Setif","Blida","Béjaïa","Batna","Sidi Bel Abbès","Biskra","Médéa","Chlef","Mostaganem","Skikda","Boumerdès","Ghardaïa","Tiaret","Laghouat"];
        const wilayaWeather=document.getElementById("willayaWeather");
        wilayas.forEach(async (wilaya)=>{
            let wilayaDiv=document.createElement("div");
            const data=await getWeatherData(wilaya);
            wilayaDiv.className="wilaya";
            wilayaWeather.appendChild(wilayaDiv);
            let link=document.createElement("a");
            link.href=`/wilaya/wilaya.html?name=${wilaya}`;
            wilayaDiv.appendChild(link);
            let h2Link=document.createElement("h2");
            h2Link.textContent=wilaya;
            link.appendChild(h2Link);
            let tempHeading=document.createElement("h3");
            tempHeading.textContent=`${Math.floor(data.main.temp)}°C`;
            wilayaDiv.appendChild(tempHeading);
            let emojiHeading=document.createElement("h5");
            emojiHeading.textContent=weatherEmoji(data.weather[0].id);
            wilayaDiv.appendChild(emojiHeading);
            let humidityP=document.createElement("p");
            humidityP.textContent=`Humidity: ${data.main.humidity}%`;
            wilayaDiv.appendChild(humidityP);
            let pressureP=document.createElement("p");
            pressureP.textContent=`Pressure: ${data.main.pressure} hpa`;
            wilayaDiv.appendChild(pressureP);
            let conditionP=document.createElement("p");
            conditionP.textContent=`Condition: ${data.weather[0].description}`;
            wilayaDiv.appendChild(conditionP);
        });
    }catch(error){
        console.log("Fetching data ERROR",error);
    }
}
async function theSeas(){
    const theSeas=document.getElementById("sea-weather");
    let locations=[
                    { name: "Oran", lat: 35.6971, lon: -0.6308 },
                    { name: "Algiers", lat: 36.7529, lon: 3.0420 },
                    { name: "Annaba", lat: 36.9, lon: 7.7667 }
                ];
    try{
        locations.forEach(async (location)=>{
            const data=await getWeatherData(location.name);
            let seaState=document.createElement("div");
            seaState.className="sea-state";
            theSeas.appendChild(seaState);
            let heading=document.createElement("h1");
            heading.textContent=`${location.name} Coast:`;
            seaState.appendChild(heading);
            let emojiHeading=document.createElement("h2");
            emojiHeading.textContent=weatherEmoji(data.weather[0].id);
            seaState.appendChild(emojiHeading);
            let seaLevel=document.createElement("p");
            seaLevel.textContent=`The Pressure  Sea: ${data.main.sea_level} hPa`;
            seaState.appendChild(seaLevel);
            let windSpeed=document.createElement("p");
            windSpeed.textContent=`Wind Speed: ${Math.floor(data.wind.speed)} Km/h`;
            seaState.appendChild(windSpeed);
            let visibility=document.createElement("p");
            visibility.textContent=`The Visibility: +${Math.floor(data.visibility/1000)}Km`;
            seaState.appendChild(visibility);
            let condition=document.createElement("p");
            condition.textContent=`Condition: ${data.weather[0].description}`;
            seaState.appendChild(condition);
    });
    }catch(error){
        console.log("Fetching data ERROR",error);
    }
}
function updateTime(element){
    const date=new Date();
    const year = date.getFullYear().toString().padStart(2,0);
    const month = (date.getMonth() + 1).toString().padStart(2,0);
    const day = date.getDate().toString().padStart(2,0);
    const hours =date.getHours().toString().padStart(2,0);
    const minutes =date.getMinutes().toString().padStart(2,0);
    const seconds = date.getSeconds().toString().padStart(2,0);
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
