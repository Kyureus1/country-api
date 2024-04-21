const filters = document.getElementsByClassName("filters");
const depText = document.querySelector("#depButton p");

for (const iterator of filters) {
    iterator.addEventListener('click', (event) => {
        event.preventDefault();
        const clickEvent = event.target;
        depText.innerHTML = clickEvent.innerHTML;
        sort(clickEvent);
    });
}
//function that will do literally everything :D

//descubre por qué no se está mostrando toda la información, esto está quedando precioso.

async function sort(clickEvent) {
    contBox.innerHTML = "";
    const res = await fetch(`${API_URL}/all?fields=region,flags,name,population,capital`);
    const data = await res.json();
    data.forEach(element => {
        if(element.region == clickEvent.innerText) {
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
        }
    });
    const flagImg = document.getElementsByClassName("flagImg");
    const countName = document.getElementsByClassName("countName");
    const countPop = document.getElementsByClassName("countPop");
    const countRegion = document.getElementsByClassName("countRegion");
    const countCap = document.getElementsByClassName("countCap");
    let i = 0;
    data.forEach(element => {
        if(element.region == clickEvent.innerText) {
            flagImg[i].setAttribute("src",`${element.flags.svg}`);
            countName[i].innerText = `${element.name.common}`;
            countPop[i].innerText = "Population: "+`${element.population}`;
            countRegion[i].innerText = "Region: "+`${element.region}`;
            countCap[i].innerText = "Capital: "+`${element.capital}`;
            i++;
        }
    });
}


