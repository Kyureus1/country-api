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

function countrySelection(nativeName, population, region, subRegion, capital, topLevel, currencies, languages) {
   this.nativeName = nativeName;
   this.population = population;
   this.region = region;
   this.subRegion = subRegion;
   this.capital = capital;
   this.topLevel = topLevel;
   this.currencies = currencies;
   this.languages = languages;
}

async function main() {
   await pageBuild();
   await getFlags();
   await getNames();
   await getPopulation();
   await getRegion();
   await getCapital();
}

async function back() {
   main();
}

async function pageBuild() {
   document.getElementById("main-menu").style.display = "flex";
   contBox.innerHTML = "";
   fetch(`${API_URL}/all?fields=name`).then((response) => response.json())
                        .then((all) => {
                           all.forEach(element => {
                              const flagDiv = document.createElement("div");
                              const flagImg = document.createElement("img");
                              const countName = document.createElement("p");
                              const countPop = document.createElement("p");
                              const countRegion = document.createElement("p");
                              const countCap = document.createElement("p");
                              flagDiv.setAttribute("class", "country");
                              flagDiv.addEventListener('click', async(event) => {
                                 fetch(`${API_URL}/all`).then((response) => response.json())
                                                            .then((all) => {
                                                               let temp = [];
                                                               const countIndex = document.getElementsByClassName("country");
                                                               const buttonDiv = document.createElement("div");
                                                               const backButton = document.createElement("button");
                                                               const mainBox = document.createElement("div");
                                                               const imgDiv = document.createElement("div");
                                                               const textDiv = document.createElement("div");
                                                               const related = document.createElement("div");
                                                               const infoDiv = document.createElement('div');
                                                               const relatedButton = document.createElement("button");
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
                                                               relatedButton.setAttribute('class', 'relatedButton');
                                                               countName.setAttribute('id', 'countName');
                                                               infoDiv.setAttribute('id', 'infoDiv');
                                                               innerText1.setAttribute('id', 'innerText1');
                                                               innerText2.setAttribute('id', 'innerText2');
                                                               for (const iterator of countIndex) {
                                                                  temp.push(iterator);
                                                               }
                                                               for (let i = 0; i < temp.length; i++) {
                                                                  /* console.log(all[i]); */
                                                                  if(temp[i].contains(event.target)) {
                                                                     contBox.innerHTML = "";
                                                                     document.getElementById("main-menu").style.display = "none";
                                                                     buttonDiv.appendChild(backButton);
                                                                     countName.innerHTML = all[i].name.common;
                                                                     textDiv.append(countName, infoDiv, related);
                                                                     image.setAttribute('src', `${all[i].flags.svg}`);
                                                                     imgDiv.appendChild(image);
                                                                     mainBox.append(imgDiv, textDiv);
                                                                     contBox.append(buttonDiv, mainBox);
                                                                     const country = new countrySelection();


                                                                     /* country.nativeName = all[i].name.nativeName; */
                                                                     country.population = all[i].population;
                                                                     country.region = all[i].region;
                                                                     country.subRegion = all[i].subregion;

                                                                     let temp2 = [];
                                                                     let tString = "";
                                                                     if(all[i].tld != undefined) {
                                                                        temp2 = Object.values(all[i].tld);
                                                                        for(j = 0; j < temp2.length; j++) {
                                                                           temp2[j] = temp2[j].toString();
                                                                           tString += temp2[j] + ", ";
                                                                        }
                                                                        tString = tString.substring(0, tString.length - 2);
                                                                        country.topLevel = tString;
                                                                     }
                                                                     else {
                                                                        country.topLevel = 'unknown';
                                                                     }


                                                                     temp2 = [];
                                                                     tString = "";
                                                                     if(all[i].name.nativeName != undefined) {
                                                                        temp2 = Object.values(all[i].name.nativeName);
                                                                        for(j = 0; j < temp2.length; j++) {
                                                                           temp2[j] = temp2[j].official.toString();
                                                                           tString += temp2[j] + ", ";
                                                                        }
                                                                        tString = tString.substring(0, tString.length - 2);
                                                                        country.nativeName = tString;
                                                                     }
                                                                     else {
                                                                        country.nativeName = 'unknown';
                                                                     }


                                                                     temp2 = [];
                                                                     tString = "";
                                                                     if(all[i].capital != undefined) {
                                                                        temp2 = Object.values(all[i].capital);
                                                                        for(j = 0; j < temp2.length; j++) {
                                                                           temp2[j] = temp2[j].toString();
                                                                           tString += temp2[j] + ", ";
                                                                        }
                                                                        tString = tString.substring(0, tString.length - 2);
                                                                        country.capital = tString;
                                                                     }
                                                                     else {
                                                                        country.capital = 'unknown';
                                                                     }


                                                                     temp2 = [];
                                                                     tString = "";
                                                                     if(all[i].currencies != undefined) {
                                                                        temp2 = Object.values(all[i].currencies);
                                                                        for(j = 0; j < temp2.length; j++) {
                                                                           temp2[j] = temp2[j].name.toString();
                                                                        }
                                                                        for(t = 0; t < temp2.length; t++) {
                                                                           tString += temp2[t] + ", ";
                                                                        }
                                                                        tString = tString.substring(0, tString.length - 2);
                                                                        country.currencies = tString;
                                                                     }
                                                                     else {
                                                                        country.languages = "unknown";
                                                                     }


                                                                     temp2 = [];
                                                                     tString = "";
                                                                     if(all[i].languages != undefined) {
                                                                        temp2 = Object.values(all[i].languages);
                                                                        for(j = 0; j < temp2.length; j++) {
                                                                           temp2[j] = temp2[j].toString();
                                                                        }
                                                                        for(t = 0; t < temp2.length; t++) {
                                                                           tString += temp2[t] + ", ";
                                                                        }
                                                                        tString = tString.substring(0, tString.length - 2);
                                                                        country.languages = tString;
                                                                     }
                                                                     else {
                                                                        country.languages = "unknown";
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
                                                               }
                                                            });
                              });
                              flagImg.setAttribute("class", "flagImg");
                              countName.setAttribute("class", "countName");
                              countPop.setAttribute("class", "countPop");
                              countRegion.setAttribute("class", "countRegion");
                              countCap.setAttribute("class", "countCap");
                              flagDiv.append(flagImg, countName, countPop, countRegion, countCap);
                              contBox.appendChild(flagDiv); 
                           });
                        })
                        .catch((e) => {
                           console.log(e);
                        });
}

async function getFlags() {
   fetch(`${API_URL}/all?fields=flags`).then((response) => response.json())
                                       .then((flags) => {
                                          const flagImg = document.getElementsByClassName("flagImg"); 
                                          for (let i = 0; i<flags.length; i++) {
                                             flagImg[i].setAttribute("src",`${flags[i].flags.svg}`);
                                          }
                                       })
                                       .catch((e) => {
                                          console.log(e);
                                       });
}

async function getNames() {
   fetch(`${API_URL}/all?fields=name`).then((response) => response.json())
                                       .then((names) => {
                                          const countName = document.getElementsByClassName("countName");
                                          for (let i = 0; i<names.length; i++) {
                                             countName[i].innerText = `${names[i].name.common}`;
                                          }
                                       })
                                       .catch((e) => {
                                          console.log(e);
                                       });  
}

async function getPopulation() {
   fetch(`${API_URL}/all?fields=population`).then((response) => response.json())
                                          .then((populations) => {
                                             const countPop = document.getElementsByClassName("countPop");
                                             for (let i = 0; i<populations.length; i++) {
                                                countPop[i].innerText = "Population: " + `${populations[i].population}`;
                                             }
                                          })
                                          .catch((e) => {
                                             console.log(e);
                                          });
}

async function getRegion() {
   fetch(`${API_URL}/all?fields=region`).then((response) => response.json())
                                       .then((regions) => {
                                          const countRegion = document.getElementsByClassName("countRegion");
                                          for (let i = 0; i<regions.length; i++) {
                                             countRegion[i].innerText = "Region: " + `${regions[i].region}`;
                                          }
                                       })
                                       .catch((e) => {
                                          console.log(e);
                                       });
}

async function getCapital() {
   fetch(`${API_URL}/all?fields=capital`).then((response) => response.json())
                                       .then((capitals) => {
                                          const countCap = document.getElementsByClassName("countCap");
                                          for (let i = 0; i<capitals.length; i++) {
                                             if(capitals[i].capital.length > 0) {
                                                countCap[i].innerText = "capital: " + `${capitals[i].capital}`+' ';
                                             }
                                             else {
                                                countCap[i].innerText = "capital: " + "unknown";
                                             }
                                          }
                                       })
                                       .catch((e) => {
                                          console.log(e);
                                       });
}
main();


