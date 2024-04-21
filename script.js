const API_URL = "https://restcountries.com/v3.1";
const contBox = document.getElementById("content");
let selection;
const dropdownButton = document.getElementById("depButton");
const dropdown = document.querySelector("#navigator ul");
const dropdownImg = document.querySelector("#depButton svg");
const colors = document.getElementById("colors");
const themeSwitch = document.getElementById("theme-switch-button");
const themeSwitchtxt = document.querySelector("#theme-switch-button p");

themeSwitch.addEventListener('click', async () => {
   if(colors.getAttribute('href') == "darkstyles.css") {
      colors.setAttribute('href', "styles.css");
      themeSwitch.innerHTML = 
      `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
         <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
      </svg>
      <p>Dark Mode</p>
      `
   }
   else {
      colors.setAttribute('href', "darkstyles.css");
      themeSwitchtxt.innerText = "Light Mode";
      themeSwitch.innerHTML = 
      `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="ionicon" viewBox="0 0 512 512">
         <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"/><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/>
      </svg>
      <p>Light Mode</p>
      `
   }
});

dropdownButton.addEventListener("click", () => {
   if(dropdown.style.display != "flex") {
      dropdown.style.display = "flex";
      dropdownImg.style.transform = "rotate(180deg)";
      dropdownImg.style.marginTop = "0px";
      dropdownImg.style.marginBottom = "8px";
   }
   else {
      dropdown.style.display = "none";
      dropdownImg.style.transform = "rotate(0deg)";
      dropdownImg.style.marginBottom = "0px";
      dropdownImg.style.marginTop = "8px";
   }
});

function countrySelection(nativeName, population, region, subRegion, capital, topLevel, currencies, languages, borders) {
   this.nativeName = nativeName;
   this.population = population;
   this.region = region;
   this.subRegion = subRegion;
   this.capital = capital;
   this.topLevel = topLevel;
   this.currencies = currencies;
   this.languages = languages;
   this.borders = borders;
}

async function main() {
   await pageBuild();
   await getContent();
}

async function back() {
   await main();
}

async function fillFlagInfo(event) {
   const buttonDiv = document.createElement("div");
   const backButton = document.createElement("button");
   const mainBox = document.createElement("div");
   const imgDiv = document.createElement("div");
   const textDiv = document.createElement("div");
   const related = document.createElement("div");
   const infoDiv = document.createElement('div');
   const countName = document.createElement('h2');
   const image = document.createElement('img');
   const innerText1 = document.createElement('div');
   const innerText2 = document.createElement('div');
   buttonDiv.setAttribute('id', 'buttonDiv');
   backButton.setAttribute('id', 'backButton');
   backButton.setAttribute('cursor', 'custom');
   backButton.addEventListener('click', back);
   backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/></svg><p>Back</p>`;
   mainBox.setAttribute('id', 'mainBox');
   imgDiv.setAttribute('id', 'imgDiv');
   textDiv.setAttribute('id', 'textDiv');
   related.setAttribute('id', 'related');
   countName.setAttribute('id', 'countName');
   infoDiv.setAttribute('id', 'infoDiv');
   innerText1.setAttribute('id', 'innerText1');
   innerText2.setAttribute('id', 'innerText2');
   const API = await fetch(`${API_URL}/all?fields=name,flags,population,region,subregion,capital,languages,currencies,tld,borders`);
   const parseAPI = await API.json();
   const countIndex = document.getElementsByClassName("country");
   for (const iterator of countIndex) {
      if(iterator.contains(event.target)) {
         parseAPI.forEach(element => {
            if(event.target.parentElement.id == element.name.common) {
               contBox.innerHTML = "";
               
               document.getElementById("main-menu").style.display = "none";
               buttonDiv.appendChild(backButton);
               countName.innerHTML = element.name.common;
               textDiv.append(countName, infoDiv, related);
               image.setAttribute('src', `${element.flags.svg}`);
               imgDiv.appendChild(image);
               mainBox.append(imgDiv, textDiv);
               contBox.append(buttonDiv, mainBox);
               const country = new countrySelection();
               country.population = element.population;
               country.region = element.region;
               country.subRegion = element.subregion;

               let temp2 = [];
               let tString = "";
               temp2 = Object.values(element.tld);
               for(j = 0; j < temp2.length; j++) {
                  temp2[j] = temp2[j].toString();
                  tString += temp2[j] + ", ";
               }
               tString = tString.substring(0, tString.length - 2);
               country.topLevel = tString;


               temp2 = [];
               tString = "";
               temp2 = Object.values(element.name.nativeName);
               for(j = 0; j < temp2.length; j++) {
                  temp2[j] = temp2[j].official.toString();
                  tString += temp2[j] + ", ";
               }
               tString = tString.substring(0, tString.length - 2);
               country.nativeName = tString;


               temp2 = [];
               tString = "";
               temp2 = Object.values(element.capital);
               for(j = 0; j < temp2.length; j++) {
                  temp2[j] = temp2[j].toString();
                  tString += temp2[j] + ", ";
               }
               tString = tString.substring(0, tString.length - 2);
               country.capital = tString;


               temp2 = [];
               tString = "";
               temp2 = Object.values(element.currencies);
               for(j = 0; j < temp2.length; j++) {
                  temp2[j] = temp2[j].name.toString();
               }
               for(t = 0; t < temp2.length; t++) {
                  tString += temp2[t] + ", ";
               }
               tString = tString.substring(0, tString.length - 2);
               country.currencies = tString;


               temp2 = [];
               tString = "";
               temp2 = Object.values(element.languages);
               for(j = 0; j < temp2.length; j++) {
                  temp2[j] = temp2[j].toString();
               }
               for(t = 0; t < temp2.length; t++) {
                  tString += temp2[t] + ", ";
               }
               tString = tString.substring(0, tString.length - 2);
               country.languages = tString;

               if(element.borders.length != 0) {
                  related.append(document.createElement("p").innerText = "Borders: ");
                  element.borders.forEach(el => {
                     let buttonCreate = document.createElement('button');
                     buttonCreate.setAttribute('class', 'borderButtons');
                     buttonCreate.innerText = el;
                     buttonCreate.addEventListener('click', async() => {
                        const API = await fetch(`${API_URL}/all?fields=cca3,name,flags,population,region,subregion,capital,languages,currencies,tld,borders`);
                        const parseAPI = await API.json();
                        parseAPI.forEach(element => {
                           if(element.cca3 == buttonCreate.innerText) {
                              const country = new countrySelection();
                              countName.innerHTML = element.name.common;
                              country.population = element.population;
                              country.region = element.region;
                              country.subRegion = element.subregion;

                              let temp2 = [];
                              let tString = "";
                              temp2 = Object.values(element.tld);
                              for(j = 0; j < temp2.length; j++) {
                                 temp2[j] = temp2[j].toString();
                                 tString += temp2[j] + ", ";
                              }
                              tString = tString.substring(0, tString.length - 2);
                              country.topLevel = tString;


                              temp2 = [];
                              tString = "";
                              temp2 = Object.values(element.name.nativeName);
                              for(j = 0; j < temp2.length; j++) {
                                 temp2[j] = temp2[j].official.toString();
                                 tString += temp2[j] + ", ";
                              }
                              tString = tString.substring(0, tString.length - 2);
                              country.nativeName = tString;


                              temp2 = [];
                              tString = "";
                              temp2 = Object.values(element.capital);
                              for(j = 0; j < temp2.length; j++) {
                                 temp2[j] = temp2[j].toString();
                                 tString += temp2[j] + ", ";
                              }
                              tString = tString.substring(0, tString.length - 2);
                              country.capital = tString;


                              temp2 = [];
                              tString = "";
                              temp2 = Object.values(element.currencies);
                              for(j = 0; j < temp2.length; j++) {
                                 temp2[j] = temp2[j].name.toString();
                              }
                              for(t = 0; t < temp2.length; t++) {
                                 tString += temp2[t] + ", ";
                              }
                              tString = tString.substring(0, tString.length - 2);
                              country.currencies = tString;


                              temp2 = [];
                              tString = "";
                              temp2 = Object.values(element.languages);
                              for(j = 0; j < temp2.length; j++) {
                                 temp2[j] = temp2[j].toString();
                              }
                              for(t = 0; t < temp2.length; t++) {
                                 tString += temp2[t] + ", ";
                              }
                              tString = tString.substring(0, tString.length - 2);
                              country.languages = tString;
                              image.setAttribute('src', `${element.flags.svg}`);
                              const capital = document.getElementById("capital");
                              const currencies = document.getElementById("currencies");
                              const languages = document.getElementById("languages");
                              const nativeName = document.getElementById("nativename");
                              const population = document.getElementById("population");
                              const region = document.getElementById("region");
                              const subRegion = document.getElementById("subregion");
                              const topLevel = document.getElementById("toplevel");
                              capital.innerText = `Capital: ${country.capital}`
                              currencies.innerText = `Currencies: ${country.currencies}`
                              languages.innerText = `languages: ${country.languages}`
                              nativeName.innerText = `Native Names: ${country.nativeName}`
                              population.innerText = `Population: ${country.population}`
                              region.innerText = `Region: ${country.region}`
                              subRegion.innerText = `Sub Region: ${country.subRegion}`
                              topLevel.innerText = `Top Level Domain: ${country.topLevel}`
                           }
                        });
                     });
                     related.append(buttonCreate);
                  });
               }
               else {
                  related.append(document.createElement("p").innerText = "Borders: none");
               }

               const capital = document.createElement('p');
               const currencies = document.createElement('p');
               const languages = document.createElement('p');
               const nativeName = document.createElement('p');
               const population = document.createElement('p');
               const region = document.createElement('p');
               const subRegion = document.createElement('p');
               const topLevel = document.createElement('p');
               capital.setAttribute('class', 'countryInfo');
               currencies.setAttribute('class', 'countryInfo');
               languages.setAttribute('class', 'countryInfo');
               nativeName.setAttribute('class', 'countryInfo');
               population.setAttribute('class', 'countryInfo');
               region.setAttribute('class', 'countryInfo');
               subRegion.setAttribute('class', 'countryInfo');
               topLevel.setAttribute('class', 'countryInfo');
               
               capital.setAttribute('id', 'capital');
               currencies.setAttribute('id', 'currencies');
               languages.setAttribute('id', 'languages');
               nativeName.setAttribute('id', 'nativename');
               population.setAttribute('id', 'population');
               region.setAttribute('id', 'region');
               subRegion.setAttribute('id', 'subregion');
               topLevel.setAttribute('id', 'toplevel');
               capital.innerText = `Capital: ${country.capital}`
               currencies.innerText = `Currencies: ${country.currencies}`
               languages.innerText = `languages: ${country.languages}`
               nativeName.innerText = `Native Names: ${country.nativeName}`
               population.innerText = `Population: ${country.population}`
               region.innerText = `Region: ${country.region}`
               subRegion.innerText = `Sub Region: ${country.subRegion}`
               topLevel.innerText = `Top Level Domain: ${country.topLevel}`
               innerText1.append(nativeName, population, region, subRegion, capital);
               innerText2.append(topLevel, currencies, languages);
               infoDiv.append(innerText1, innerText2);
            }
         });
      }
   }
}

async function create(event) {
   await fillFlagInfo(event);
}

async function pageBuild() {
   document.getElementById("main-menu").style.display = "flex";
   document.querySelector("#depButton p").innerText = "Filter by Region";
   contBox.innerHTML = "";
   const API = await fetch(`${API_URL}/all`);
   const parseAPI = await API.json();
   parseAPI.forEach(element => {
      const flagDiv = document.createElement("div");
      const flagImg = document.createElement("img");
      const countName = document.createElement("p");
      const countPop = document.createElement("p");
      const countRegion = document.createElement("p");
      const countCap = document.createElement("p");
      flagDiv.setAttribute("class", "country");
      flagDiv.setAttribute("id", `${element.name.common}`);
      flagDiv.addEventListener('click', create);

      flagImg.setAttribute("class", "flagImg");
      countName.setAttribute("class", "countName");
      countPop.setAttribute("class", "countPop");
      countRegion.setAttribute("class", "countRegion");
      countCap.setAttribute("class", "countCap");
      flagDiv.append(flagImg, countName, countPop, countRegion, countCap);
      contBox.appendChild(flagDiv); 
   });
}

async function getContent() {
   const getContent = await fetch(`${API_URL}/all?fields=flags,name,population,region,capital`);
   const parseContent = await getContent.json();
   const countName = document.getElementsByClassName("countName");
   const flagImg = document.getElementsByClassName("flagImg");
   const countPop = document.getElementsByClassName("countPop");
   const countRegion = document.getElementsByClassName("countRegion");
   const countCap = document.getElementsByClassName("countCap");
   let i = 0;
   parseContent.forEach(element => {
      flagImg[i].setAttribute("src",`${element.flags.svg}`);
      flagImg[i].setAttribute("alt",`${element.name.common}` + "-flag");
      countName[i].innerText = `${element.name.common}`;
      countPop[i].innerText = "Population: " + `${element.population}`;
      countRegion[i].innerText = "Region: " + `${element.region}`;
      if(element.capital.length > 0) {
         countCap[i].innerText = "capital: " + `${element.capital}`+' ';                                        
      }
      else {
         countCap[i].innerText = "capital: " + "unknown";
      }
      i++;
   });
}

main();


