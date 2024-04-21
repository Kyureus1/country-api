const filterInput = document.getElementById("filterInput");

function Country(flag, name, population, region, capital) {
    this.flag = flag;
    this.name = name;
    this.population = population;
    this.region = region;
    this.capital = capital;
}

filterInput.addEventListener('keyup', async () => {
    contBox.innerHTML = "";
    let holder = filterInput.value;
    let reg = new RegExp('^' + holder, 'i');
    const getData = await fetch(`${API_URL}/all?fields=flags,name,population,region,capital`);
    const parseData = await getData.json();
    parseData.forEach(element => {
        let findMatch = reg.test(element.name.common);
        if(findMatch === true) {
            const country = new Country(
                element.flags.svg, 
                element.name.common, 
                element.population, 
                element.region, 
                element.capital
            );
            const flagDiv = document.createElement("div");
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
            flagDiv.setAttribute("id", `${element.name.common}`);
            flagDiv.addEventListener('click', create);
        }
    });
});