
// json functions
async function load(url){//ciudadanos
    try{
        let returnList = [];
        const response = await fetch(`http://localhost:3000/${url}`);
        if(!response.ok){
            throw new Error(`Error to load ${url} state:`,response.status);
        }
        returnList = await response.json();
        return returnList;
    }catch(error){
        console.error(`error to load the ${url}`,error.message);
    }
}

async function save(newUser,url){
    try{
        const response = await fetch(`http://localhost:3000/${url}`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify(newUser)
        });
        if(!response.ok){
            throw new Error(`Error to load ${url}. state:`,response.status);
        }
        const createdUser = await response.json();
        console.log("created ${url}:",createdUser);
    }catch(error){
        console.error(`error to load the ${url}`,error.message);
    }
}

//html functions

function createCard(dataDic) {
    let cardHTML = `
    <div class="col mt-4">
        <div class="card">
            <div class="card-body container">
    `;
    if (dataDic["fullname"] !== undefined) {
        cardHTML += `<h5 class="card-title">Citizen: ${dataDic["fullname"]}</h5>`;
    }
    cardHTML += `<ul class="list-group mt-2">`;

    for (let key in dataDic) {
        if (key === "similarity") {
            cardHTML += `<li class="list-group-item">${key.replaceAll("_", " ")}: ${dataDic[key]}%`;
            cardHTML += `
        <div class="donut" style="    background: conic-gradient(
            green 0deg ${360*(dataDic[key]/100)}deg,
            red ${360*(dataDic[key]/100)}deg 360deg
        );"></div> 
        <div class="d-flex mt-2 justify-content-around">
            <div class="d-flex">
                <div class="red-square"></div>
                <span>Different</span>
            </div>
            <div class="d-flex">
                <div class="green-square"></div>
                <span>Match</span>
            </div>
        </div>
            `
            cardHTML += `</li>`;
        } else if(key !=="fullname" && key != "id") {
            cardHTML += `<li class="list-group-item">${key.replaceAll("_", " ")}: ${dataDic[key]}</li>`;
        }
    }

    cardHTML += `</ul></div></div></div>`;
    return cardHTML;
}
