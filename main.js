function checkInputs(){
    let Nom = document.getElementById('Nom');
    let Marque = document.getElementById('Marque');
    let Prix = document.getElementById('Prix');
    let Date = document.getElementById('Date');
    let type = document.getElementById('type');
    let Promo = document.getElementById('Oui');
    let noPromo = document.getElementById('Non');
    let PromoOutput = document.getElementById('PromoOutput');



    if(Nom.value != '' && Nom.value.length < 30 && Nom.value.length > 3){
        Nom.style.border = "1px solid #14A44D"
    } else {
        Nom.style.border = "1px solid #e91e63"
    }
    if(Marque.value != '' && Marque.value.length < 30 && Marque.value.length > 3){
        Marque.style.border = "1px solid #14A44D"
    } else {
        Marque.style.border = "1px solid #e91e63"
    }

    if(Prix.value != ''){
        Prix.style.border = "1px solid #14A44D"
    } else {
        Prix.style.border = "1px solid #e91e63"
    }

    if(Date.value != ''){
        Date.style.border = "1px solid #14A44D"
    } else {
        Date.style.border = "1px solid #e91e63"
    }
    if(type.value != ''){
        type.style.border = "1px solid #14A44D"
    } else {
        type.style.border = "1px solid #e91e63"
    }
    
    if(Promo.checked || noPromo.checked) {
        PromoOutput.innerHTML = ""
    } else {
        PromoOutput.innerHTML = "* Produit en promotion ?";
        PromoOutput.style.color ="#e91e63";
    }



}

function Ajouter() {
    let table = document.getElementById('table');
    
    for (let k = 0; k < 1; k++) {
        const row = document.createElement("tr")
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");
                const suppButton = document.createElement("button");
                const modiButton = document.createElement("button");
                row.appendChild(cell);
                if (j == 0) {
                    cell.innerText = Nom.value; 
                }
                if(j == 1){
                    cell.innerText = Marque.value;
                }
                if(j == 2){
                    cell.innerText = Prix.value;
                }
                if(j == 3){
                    cell.innerText = Date.value;
                }
                if(j == 4){ 
                    cell.innerText = Type.value;
                }
                if(j == 5){
                    var getSelectedValue = document.querySelector( 'input[name="promotion"]:checked');
                    cell.innerText = getSelectedValue.value;
                }
                if(j == 6){
                    // iserer un botton de modification  
                    modiButton.innerText = "Modifier";
                    modiButton.setAttribute("class", "modifier");
                    modiButton.setAttribute("onclick", "modification(this)");
                    cell.appendChild(modiButton);
                    // iserer un botton de suppression 
                    suppButton.innerText = "Supprimer";
                    suppButton.setAttribute("class", "supprimer");
                    suppButton.setAttribute("onclick", "deletRow(this)");
                    cell.appendChild(suppButton);
                }
            }
        table.appendChild(row);
    }
}

