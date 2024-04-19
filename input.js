const filterInput = document.getElementById("filterInput");

function Country(flag, name, population, region, capital) {
    this.flag = flag;
    this.name = name;
    this.population = population;
    this.region = region;
    this.capital = capital;
}

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

async function back() {
    main();
}

filterInput.addEventListener('keyup', async () => {
    contBox.innerHTML = "";
    let holder = filterInput.value;
    let reg = new RegExp('^' + holder, 'i');
    const getData = await fetch(`${API_URL}/all?fields=flags,name,population,region,capital`);
    const parseData = await getData.json();
    for(let i = 0; i < parseData.length; i++) {
        let findMatch = reg.test(parseData[i].name.common);
        if(findMatch === true) {
            const country = new Country(
                parseData[i].flags.svg, 
                parseData[i].name.common, 
                parseData[i].population, 
                parseData[i].region, 
                parseData[i].capital
            );
            const flagDiv = document.createElement("a");
            const flagImg = document.createElement("img");
            const countName = document.createElement("p");
            const countPop = document.createElement("p");
            const countRegion = document.createElement("p");
            const countCap = document.createElement("p");
            flagDiv.setAttribute("class", "country");
            flagImg.setAttribute("class", "flagImg");
            flagImg.setAttribute("src", `${country.flag}`);
            countName.setAttribute("class", "countName");
            countName.innerHTML = country.name;
            countPop.setAttribute("class", "countPop");
            countPop.innerHTML = "Population: " + country.population;
            countRegion.setAttribute("class", "countRegion");
            countRegion.innerHTML = "Region: " + country.region;
            countCap.setAttribute("class", "countCap");
            if(country.capital == "") {
                countCap.innerHTML = "Capital: " + "unknown";
            }
            else {
                countCap.innerHTML = "Capital: " + country.capital;
            }
            flagDiv.append(flagImg, countName, countPop, countRegion, countCap);
            contBox.appendChild(flagDiv);
            flagDiv.addEventListener('click', async(event) => {
                document.getElementById("filterInput").value = "";
                fetch(`${API_URL}/all`).then((response) => response.json())
                                           .then((all) => {
                                              const names = document.getElementsByClassName('countName');
                                              const divs = document.getElementsByClassName('country');
                                              let temp = [];
                                              let temNames = [];
                                              /*hasta este punto, la cosa funciona
                                              usando como indices, los nombres de
                                              los paises filtrados, puedo
                                              acceder a los elementos actuales y
                                              encontrar una coincidencia :D*/

                                              //const countIndex = document.getElementsByClassName("country");
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
                                              innerText1.setAttribute('id', 'innerText1');
                                              innerText2.setAttribute('id', 'innerText2');
                                              buttonDiv.setAttribute('id', 'buttonDiv');
                                              backButton.setAttribute('id', 'backButton');
                                              backButton.addEventListener('click', back);
                                              backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/></svg><p>Back</p>`;
                                              mainBox.setAttribute('id', 'mainBox');
                                              imgDiv.setAttribute('id', 'imgDiv');
                                              textDiv.setAttribute('id', 'textDiv');
                                              related.setAttribute('id', 'related');
                                              relatedButton.setAttribute('class', 'relatedButton');
                                              countName.setAttribute('id', 'countName');
                                              infoDiv.setAttribute('id', 'infoDiv');
                                              for (const iterator of names) {
                                                 temp.push(iterator);
                                              }
                                              for (const iterator of divs) {
                                                temNames.push(iterator);
                                             }
                                              /*para poder inyectar datos en este caso,
                                              debes encontrar una manera de acceder
                                              un dato dentro del arreglo de elementos
                                              que coincida con alguno de los datos de 
                                              los elementos obtenidos en el fetch,
                                              así mismo, al ocurrir una coincidencia,
                                              podrás permitirte inyectar la información
                                              correcta en el evento de click correcto,
                                              sin duda, lo único fácil de esta situación 
                                              es pensarlo*/
                                              for (let i = 0; i < temp.length; i++) {
                                                 if(temNames[i].contains(event.target) === true) {
                                                    all.forEach(element => {
                                                        if(element.name.common == temp[i].innerText) {
                                                            //coincidencia!!!!!!
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
                                                            if(element.tld != undefined) {
                                                                temp2 = Object.values(element.tld);
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
                                                            if(element.name.nativeName != undefined) {
                                                                temp2 = Object.values(element.name.nativeName);
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
                                                            if(element.capital != undefined) {
                                                                temp2 = Object.values(element.capital);
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
                                                            if(element.currencies != undefined) {
                                                                temp2 = Object.values(element.currencies);
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
                                                            if(element.languages != undefined) {
                                                            temp2 = Object.values(element.languages);
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
                                                    });
                                                }
                                              }
                                           });
            });
        }
    }
});