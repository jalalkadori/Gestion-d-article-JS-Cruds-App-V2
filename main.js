let ProduitData;
let table = document.getElementById('table');

// si le localstorage n'est pas vide on va assigner ses données au tableeau 'ProduitData',
// le cas contraire on va declarer le tableau vide
if(localStorage.ProduitList != null) { 
    ProduitData = JSON.parse(localStorage.ProduitList)
}else{
    ProduitData = [];
}

class produit {
    constructor(Nom, Marque,Prix, Date, type, Promotion) {
        this.Nom = Nom;
        this.Marque = Marque;
        this.Prix = Prix;
        this.Date = Date;
        this.type = type;
        this.Promotion = Promotion;
    }
}

function Add(){
    let Nom = document.getElementById('Nom');
    let Marque = document.getElementById('Marque');
    let Prix = document.getElementById('Prix');
    let Date = document.getElementById('Date');
    let type = document.getElementById('type');
    let Promo = document.getElementById('Oui');
    let noPromo = document.getElementById('Non');
    let PromoOutput = document.getElementById('PromoOutput');
    let getSelectedValue = document.querySelector( 'input[name="Promotion"]:checked');
    let Promotion = getSelectedValue.value;


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

    if(Nom.value != '' && Marque.value != '' && Prix.value != '' && 
    Date.value != '' && type.value != '' &&
     (Promo.checked || noPromo.checked)) {
        let newProduct = new produit(Nom.value, Marque.value, Prix.value,
            Date.value, type.value, Promotion);

        ProduitData.push(newProduct);
        // integration des données du tableau sur le local storage apres avoir la transformer en formt string
        localStorage.setItem('ProduitList', JSON.stringify(ProduitData));
    }
    show();
    clearInput();
}

function show() {
    let table = document.getElementById('table');
    table.innerHTML='';
    
    for(let j=0;j<ProduitData.length;j++){

        let row = document.createElement('tr');

        for(let i=0;i<7; i++) {
            let cell = document.createElement('td');
            let SuppBtn = document.createElement('button');
            let UppdateBtn = document.createElement('button');
            row.appendChild(cell);
            if(i==0) {
                cell.innerHTML = ProduitData[j].Nom;
            }
            if(i==1) {
                cell.innerHTML = ProduitData[j].Marque;
            }
            if(i==2) {
                cell.innerHTML = ProduitData[j].Prix;
            }
            if(i==3) {
                cell.innerHTML = ProduitData[j].Date;
            }
            if(i==4) {
                cell.innerHTML = ProduitData[j].type;
            }
            if(i==5) {
                cell.innerHTML = ProduitData[j].Promotion;
            }
            if(i==6) {
                // iserer un botton de modification  
                UppdateBtn.innerText = "Modifier";
                UppdateBtn.setAttribute("class", "btn btn-info mx-2");
                UppdateBtn.setAttribute("onclick", "modification(this)");
                cell.appendChild(UppdateBtn);
                // iserer un botton de suppression 
                SuppBtn.innerText = "Supprimer";
                SuppBtn.setAttribute("class", "btn btn-danger");
                SuppBtn.setAttribute("onclick", "deletRow(this)");
                cell.appendChild(SuppBtn);
            }
        table.appendChild(row);
        }
    }
}

function deletRow(r) {
    let indexOfRow = (r.parentNode.parentNode.rowIndex) - 1;
   
    ProduitData.splice(indexOfRow, 1);
    localStorage.setItem('ProduitList', JSON.stringify(ProduitData));
    show() //Afichage des donnes sur le tableau HTML apres la suppression 
}

// Modification function 
function modification(x) {
    let Nom = document.getElementById('Nom');
    let Marque = document.getElementById('Marque');
    let Prix = document.getElementById('Prix');
    let Date = document.getElementById('Date');
    let type = document.getElementById('type');
    let Promo = document.getElementById('Oui');
    let noPromo = document.getElementById('Non');
    let addButton = document.getElementById('Ajouter');
    let ModiButton = document.getElementById('Modifier');
    
    addButton.setAttribute("class", "d-none");
    ModiButton.setAttribute("class", "btn btn-info d-inline-block");
    var i = (x.parentNode.parentNode.rowIndex) - 1;
    Nom.value = ProduitData[i].Nom;
    Marque.value = ProduitData[i].Marque
    Prix.value = ProduitData[i].Prix
    Date.value = ProduitData[i].Date
    type.value = ProduitData[i].type
    const radio = ProduitData[i].Promotion
    if ( radio == "Oui") {
        Promo.checked = true; 
    } else {
        noPromo.checked = true; 
    }
    ModiButton.onclick = function Update() {
        let getSelectedValue = document.querySelector( 'input[name="Promotion"]:checked');
        let Promotion = getSelectedValue.value;
        addButton.setAttribute("class", "btn btn-primary d-inline-block");
        ModiButton.setAttribute("class","d-none");

        ProduitData[i].Nom = Nom.value;
        ProduitData[i].Marque = Marque.value;
        ProduitData[i].Prix = Prix.value;
        ProduitData[i].Date = Date.value;
        ProduitData[i].type = type.value;
        ProduitData[i].Promotion = Promotion;

        localStorage.setItem('ProduitList', JSON.stringify(ProduitData));
    
        clearInput();
        show()
    }
}
function clearInput(){
    document.getElementById('Nom').value = '';
    document.getElementById('Marque').value = '';
    document.getElementById('Prix').value ='';
    document.getElementById('Date').value ='';
    document.getElementById('type').value='';
    document.getElementById('Oui').checked = false;
    document.getElementById('Non').checked = false;
}


