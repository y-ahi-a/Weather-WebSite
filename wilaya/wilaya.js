const params = new URLSearchParams(window.location.search);
const wilayaName = params.get("name");
document.getElementById("title").textContent = `${wilayaName} Weather`;
const apiKey="758eab95dab8f6ba36e21d5d6e219c79";

function showMenu(){
    const menu=document.getElementById("burgermenu");
    menu.classList.toggle("active");
}
async function getWeatherDataForecast(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response=await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("could not fetch data");
    }
    return await response.json();
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
    await currentTempWilaya(wilayaName);
    await partOfDayWeather(wilayaName);
    await the3DaysWeather(wilayaName);
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 1000);
});
async function currentTempWilaya(wilayaName){
    try{
        const div1=document.getElementById("1data");
        const div2=document.getElementById("2data");
        const data=await getWeatherData(wilayaName);
        document.getElementById("1h1").textContent=`The Current Weather in ${wilayaName} Center:`;
        document.getElementById("1h1").style.textDecoration="underline";
        document.getElementById("cityImg").src=`/images/${wilayaName}.jpg`;
        document.getElementById("2h1").textContent=wilayaName;
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
async function partOfDayWeather(wilayaName){
    const data=await getWeatherDataForecast(wilayaName);
    const morningData=data.list.find(item=>item.dt_txt.includes("09:00:00"));
    const noonData=data.list.find(item=>item.dt_txt.includes("12:00:00"));
    const nightData=data.list.find(item=>item.dt_txt.includes("18:00:00"));
    const morning=document.getElementById("morning");
    const noon=document.getElementById("noon");
    const night=document.getElementById("night");
    let headingM=document.createElement("h2");
    headingM.textContent=`Morning Weather`;
    morning.appendChild(headingM);
    let emojiM=document.createElement("h2");
    emojiM.textContent="🌅";
    morning.appendChild(emojiM);
    let tempH=document.createElement("h3");
    tempH.textContent=`${morningData.main.temp}°C`;
    morning.appendChild(tempH);
    let maxTempP=document.createElement("p");
    maxTempP.textContent=`Max Temp: ${morningData.main.temp_max}°C`;
    morning.appendChild(maxTempP);
    let minTempP=document.createElement("p");
    minTempP.textContent=`Min Temp: ${morningData.main.temp_min}°C`;
    morning.appendChild(minTempP);
    let conditionP=document.createElement("p");
    conditionP.textContent=`Condition: ${morningData.weather[0].main}`;
    morning.appendChild(conditionP);
    let emojiP=document.createElement("p");
    emojiP.textContent=`${weatherEmoji(morningData.weather[0].id)}`;
    morning.appendChild(emojiP);

    let headingN=document.createElement("h2");
    headingN.textContent=`Noon Weather`;
    noon.appendChild(headingN);
    let emojiN=document.createElement("h2");
    emojiN.textContent="🌞";
    noon.appendChild(emojiN);
    let tempHN=document.createElement("h3");
    tempHN.textContent=`${(noonData.main.temp)}°C`;
    noon.appendChild(tempHN);
    let maxTempPN=document.createElement("p");
    maxTempPN.textContent=`Max Temp: ${(noonData.main.temp_max)}°C`;
    noon.appendChild(maxTempPN);
    let minTempPN=document.createElement("p");
    minTempPN.textContent=`Min Temp: ${(noonData.main.temp_min)}°C`;
    noon.appendChild(minTempPN);
    let conditionPN=document.createElement("p");
    conditionPN.textContent=`Condition: ${noonData.weather[0].main}`;
    noon.appendChild(conditionPN);
    let emojiPN=document.createElement("p");
    emojiPN.textContent=`${weatherEmoji(noonData.weather[0].id)}`;
    noon.appendChild(emojiPN);

    let headingNH=document.createElement("h2");
    headingNH.textContent=`Night Weather`;
    night.appendChild(headingNH);
    let emojiNH=document.createElement("h2");
    emojiNH.textContent="🌃";
    night.appendChild(emojiNH);
    let tempHNH=document.createElement("h3");
    tempHNH.textContent=`${(nightData.main.temp)}°C`;
    night.appendChild(tempHNH);
    let maxTempPNH=document.createElement("p");
    maxTempPNH.textContent=`Max Temp: ${(nightData.main.temp_max)}°C`;
    night.appendChild(maxTempPNH);
    let minTempPNH=document.createElement("p");
    minTempPNH.textContent=`Min Temp: ${(nightData.main.temp_min)}°C`;
    night.appendChild(minTempPNH);
    let conditionPNH=document.createElement("p");
    conditionPNH.textContent=`Condition: ${nightData.weather[0].main}`;
    night.appendChild(conditionPNH);
    let emojiPNH=document.createElement("p");
    emojiPNH.textContent=`${weatherEmoji(nightData.weather[0].id)}`;
    night.appendChild(emojiPNH);
}
async function the3DaysWeather(wilayaName){
    const data=await getWeatherDataForecast(wilayaName);
    const daysWeather=document.getElementById("daysWeather");
    const daily={};
    data.list.forEach(item=>{
        const date=item.dt_txt.split(" ")[0];
        if (!daily[date]){
            daily[date]=[];
        }
        daily[date].push(item);
    });
    const dates=Object.keys(daily);
    for (let i=1;i<4;i++){
        const dayData=daily[dates[i]];
        const div=document.createElement("div");
        div.id=`day${i+1}`;
        div.className="days";
        daysWeather.appendChild(div);
        const firstItem=dayData[0];
        let h1=document.createElement("h1");
        h1.textContent=dates[i];
        div.appendChild(h1);
        let h2_1=document.createElement("h2");
        h2_1.textContent=weatherEmoji(firstItem.weather[0].id);
        div.appendChild(h2_1);
        let p1=document.createElement("p");
        p1.textContent=`Max temp: ${Math.floor(firstItem.main.temp_max)}°C`;
        div.appendChild(p1);
        let p2=document.createElement("p");
        p2.textContent=`Min temp: ${Math.floor(firstItem.main.temp_min)}°C`;
        div.appendChild(p2);
        let p3=document.createElement("p");
        p3.textContent=`Humidity: ${firstItem.main.humidity}%`;
        div.appendChild(p3);
        let p4=document.createElement("p");
        p4.textContent=`Wind Speed: ${Math.floor(firstItem.wind.speed*3.6)} Km/h`;
        div.appendChild(p4);
        let h2_2=document.createElement("h2");
        h2_2.textContent=firstItem.weather[0].description;
        div.appendChild(h2_2);
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