let temperatue1=document.querySelector("#Temp1");
let temperatue2=document.querySelector("#Temp2");
let tempMax=document.querySelector("#max-temp");
let tempMin=document.querySelector("#min-temp");
let btn=document.querySelector("#nav-btn");
let hum1=document.querySelector("#Humidity1");
let hum2=document.querySelector("#Humidity2");
let Dew=document.querySelector("#dew");
let feel=document.querySelector("#Feels");
let precip=document.querySelector("#precip");
let wSpeed1=document.querySelector("#wind-speed1");
let wSpeed2=document.querySelector("#wind-speed2");
let wGust=document.querySelector("#wind-gust");
let wDir=document.querySelector("#wind-dir");
let Rain=document.querySelector("#rain");
let Cloud=document.querySelector("#cloud");
let Press=document.querySelector("#pressure");
let sRise=document.querySelector("#sunrise");
let sSet=document.querySelector("#sunset");
let Radiation=document.querySelector("#radiation");
let UVIndex=document.querySelector("#uv-index");
let desc=document.querySelector("#desc");
let aler=document.querySelector("#alert");
let hHeading=document.querySelector("#hero-heading");
let mPhase=document.querySelector("#m-phase");
let visib=document.querySelector("#visib");
let count=0;
let tButton=document.querySelector("#t-btn");
let tButton2=document.querySelector("#t-btn2");
let coll = document.querySelector("#sd");
let dt=document.querySelector("#date1")
let dBtn=document.querySelector("#date-btn");
let image=document.querySelector("#k-img");
let Day=document.querySelector("#day");
let con=document.querySelector(".content");
let hero=document.querySelector("body");
let home=document.querySelector("#home");
let mdl=document.querySelector(".middle");
let others=document.querySelector("#others");
let result;
let images=["images/Snow.jpg","images/Rain.jpg","images/Fog.jpg","images/Wind.jpg","images/Cloud.jpg","images/Partly-cloudy-day2.jpg","images/Clear-day.jpg","images/Clear-night.jpg"]
let url="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hyderabad?unitGroup=us&include=days%2Cevents&key=7VNDDSKQZWW5GKCWREYN35BDC&contentType=json";

async function run(cnt){

    let searchInput=document.querySelector("#search").value.toLowerCase();
    if(searchInput=="" || searchInput==null || searchInput==undefined)
        {
            searchInput="hyderabad";
        }  
    let tempUrl=url.replace("hyderabad",searchInput);
    if(dt.value!="" || dt.value!=" " || dt!=undefined)
    {
        tempUrl=tempUrl.replace("?","/"+dt.value+"?");
    }
    if(count==0)
    {
        const response = await fetch(tempUrl);
    if(response.status>=400)
    {
        if(response.status==429)
        {
            alert("Request limits Crossed!");
            return
        }
        alert("Entered City is Incorrect!");
        return;
    }
     result = await response.json();
    }
    dt.value="";
    aler.style.visibility="hidden";
    let txt=result.days[cnt].icon
    if(txt=="rain")
    {
        txt="CHANCES OF RAIN";
    }
    else{
        txt=txt.toUpperCase();
    }
    mdl.innerText=txt;
    animate(cnt,result);

    Day.innerText="On "+result.days[cnt].datetime;

    hHeading.textContent="Weather For "+searchInput.charAt(0).toUpperCase()+searchInput.slice(1);
    
    desc.innerText=result.days[cnt].description;

    temperatue1.innerText=parseFloat((((result.days[cnt].temp - 32) * (5 / 9)).toFixed(2)))+"ºC";
    temperatue2.innerText="Temperature is : "+parseFloat((((result.days[cnt].temp - 32) * (5 / 9)).toFixed(2)))+"ºC";
    tempMax.innerText="Min Temperature is : "+parseFloat((((result.days[cnt].tempmin - 32) * (5 / 9)).toFixed(2)))+"ºC";
    tempMin.innerText="Max temperature is : "+parseFloat((((result.days[cnt].tempmax - 32) * (5 / 9)).toFixed(2)))+"ºC";
    
    hum1.innerText=result.days[cnt].humidity+" %";
    hum2.innerText="Humidity "+result.days[cnt].humidity+" %";
    Dew.innerText="Dew : "+result.days[cnt].dew;
    precip.innerText=result.days[cnt].precip+" mm";
    feel.innerText="Feels Like "+result.days[cnt].feelslike;

    wSpeed1.innerText=result.days[cnt].windspeed+" km/hr";
    wSpeed2.innerText="Wind Speed is "+result.days[cnt].windspeed+" km/hr";
    wGust.innerText="Wind Gust : "+result.days[cnt].windgust;
    let degrees=result.days[cnt].winddir;
    wDir.innerText="Wind Direction : "+windDir(degrees)+" ("+degrees+"°)";

    if(result.days[cnt].icon=="rain")
    {
        Rain.innerText="Chances of Rain";
    }
    else{
        Rain.innerText="No Rain";
    }
    Cloud.innerText=result.days[cnt].cloudcover;
    Press.innerText=result.days[cnt].pressure+" hPa";

    sRise.innerText=result.days[cnt].sunrise;
    sSet.innerText=result.days[cnt].sunset;
    Radiation.innerText=result.days[cnt].solarradiation;
    UVIndex.innerText=result.days[cnt].uvindex;
    mPhase.innerText=result.days[cnt].moonphase;
    visib.innerText=result.days[cnt].visibility;
    
    
}
function windDir(deg)
{
    if(deg>337.5 ||deg<=22.5)
    {
        return "North";
    }
    if(deg>22.5 && deg<=67.5)
    {
        return "North-East"
    }
    if(deg>67.5 && deg<=112.5)
    {
        return "East";
    }
    if(deg>112.5 && deg<=157.5)
    {
        return "South-East";
    }
    if(deg>157.5 && deg<=202.5)
    {
        return "South";
    }
    if(deg>202 && deg<=247.5)
    {
        return "South-West";
    }
    if(deg>247.5  && deg<=292.5)
    {
        return "West";
    }
    if(deg>292.5 && deg<=337.5)
    {
        return "North-West";
    }
}

   try{
    btn.addEventListener("click",()=>{
        count=0;
        dt.style.display="none";
        dBtn.style.display="none"
        run(0);
    });
   }
   catch(err)
   {
    alert("Connect to the Internet!");
   }
tButton.addEventListener("click",()=>{
    count++;
    dt.style.display="none";
    dBtn.style.display="none"
    run(count);
});
tButton2.addEventListener("click",()=>{
    count++;
    dt.style.display="none";
    dBtn.style.display="none"
    run(count);
});
run(0);
function see()
{
    if(dt.style.display==="none")
    {
        dt.style.display="block";
        dBtn.style.display="block";
    }
    else{
        dt.style.display="none";
        dBtn.style.display="none";
    }
    
}
coll.addEventListener("click",see);
function animate(cnt,result){
    let count2=countFun(cnt,result);
    if(count2==5)
    {
        others.style.color="black";
    }
    else{
        others.style.color="white";
    }
    if(count2==0 ||count2==3||count2==5||count2==6)
        {
             hHeading.style.color="black";
             Day.style.color="black";
             desc.style.color="black";
             hHeading.style.borderBottom="1px solid black";
             desc.style.borderBottom="1px solid black";
        }
        else{
             hHeading.style.color="white";
             Day.style.color="white";
             desc.style.color="white";
             hHeading.style.borderBottom="1px solid white";
             desc.style.borderBottom="1px solid white";
        }
         hero.style.backgroundImage=`url('${images[count2]}')`;
         con.classList.add("animate");
         hero.classList.add("animate-before");
         mdl.classList.add("animateMiddle");
         setTimeout(()=>{
             con.classList.remove("animate");
             hero.classList.remove("animate-before");
             mdl.classList.remove("animateMiddle");
         },4100);
}


function countFun(cnt,result)
{
    if(result.days[cnt].icon=="snow"){
        return 0;
    }
    if(result.days[cnt].icon=="rain"){
        return 1;
    }
    if(result.days[cnt].icon=="fog"){
        return 2;
    }
    if(result.days[cnt].icon=="wind"){
        return 3;
    }
    if(result.days[cnt].icon=="cloudy"){
        return 4;
    }
    if(result.days[cnt].icon=="partly-cloudy-day" || result.days[cnt].icon=="partly-cloudy-night"){
        return 5;
    }
    if(result.days[cnt].icon=="clear-day"){
        return 6;
    }
    else{
        return 7;
    }
}
dBtn.addEventListener("click",()=>{
    count=0;
    run(0);
    see();
});
home.addEventListener("click",()=>{
    count=0;
    run(0);
    dt.style.display="none";
    dBtn.style.display="none"
});