

async function addCitizen(){
    
    const fullnameHTML = document.getElementById("fullname");
    const dnacodeHTML = document.getElementById("dnaCode");
    const cellphoneHTML = document.getElementById("cellphone");
    const addressHTML = document.getElementById("address");

    const fullName = fullnameHTML.value;
    const dnaCode = dnacodeHTML.value;
    const cellphone = cellphoneHTML.value;
    const address = addressHTML.value;

    const newCitizen = {
        "fullname" : fullName,
        "address" : address,
        "cellphone" : cellphone,
        "DNA_code" : dnaCode
    }

    await save(newCitizen,"ciudadanos");

    fullnameHTML.value = "";
    dnacodeHTML.value = "";
    cellphoneHTML.value = "";
    addressHTML.value = "";
    alert("Citizen sucessfully created");
}


async function analyzeCitizen(){
    
    const defendantDNAHTML = document.getElementById("defendantDNA");
    const resultHTML = document.getElementById("result");
    const defendantDNA = defendantDNAHTML.value;

    if(defendantDNA.length != 20){// if was the wrong input it doesn't do anything
        return;
    }
    const citizens = await load("ciudadanos");
    let listDNASimilarities = new Array(citizens.length);

    const DNATotalPositions = 20;// we can change it if in the future is longer or smaller the DNA code

    let n = citizens.length;

    resultHTML.innerHTML = "";//make sure that is empty
    resultHTML.innerHTML = `<h2 class="text-center">Result</h2>`;
    for(let i = 0; i < n;i++){
        const citizenDNA = citizens[i]["DNA_code"];
        let similarity = 0;
        for(let j = 0; j < DNATotalPositions;j++){
            if(citizenDNA[j] === defendantDNA[j]){
                similarity++;//will count every similarity
            }
        }

        similarity /= (DNATotalPositions/100)// to know the percentage
        citizens[i]["similarity"] = similarity;//save the similarity
    }

    citizens.sort((first,second) => {return second.similarity - first.similarity})//sort the list for the similarity percentage

    for(let citizen of citizens){//add to the html the list sorted of citizens
        resultHTML.innerHTML += createCard(citizen)
    }


}