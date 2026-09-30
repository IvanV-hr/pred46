import { Sekcija } from "./components/sekcija.js"
import { Zadatak } from "./components/zadatak.js"
import { dohvatiZadatke, postZadatak, deleteZadatak } from "./services/api-service.js"
import { createForm } from "./components/form.js"

const main = document.querySelector("#glavni-sadrzaj")

main.innerHTML = `
    <h1>Upravljanje zadatcima</h1>  
    ${Sekcija("Zadaci", `<div>dodaj filtriranje</div><div id="zadaci" class="kartice"></div>`)}
    ${Sekcija("Dodaj zadatak", `<div class="form-wrapper">${createForm("upload")}</div>`)}
    `


const zadaciWrapper = document.querySelector("#zadaci");
let zadaci = [];

async function dohvatiPrikaziZadatke() {
    zadaciWrapper.textContent = "Ucitavanje zadataka..."

    try {
        zadaci = await dohvatiZadatke()
        prikaziZadatke()
        console.log(zadaci)
    } catch {
        zadaciWrapper.textContent = "Doslo je do greske prilikom ucitavanja zadataka. Molimo osvjezite stranicu."   
    }
}

dohvatiPrikaziZadatke()

function prikaziZadatke() {
    zadaciWrapper.innerHTML = zadaci.length ? zadaci.map(Zadatak).join("") : "Nema zadataka za prikaz"
}



//Event listener gumb -Josip

const form = document.getElementById("upload");

form.addEventListener("submit", async e => {
    e.preventDefault();

    const zadText = document.getElementById("zad").value.trim("");
    const userId = document.getElementById("zadId").value.trim("");
    let zadObj;
    let postZad;

    if(zadText && userId)
        zadObj = {
            todo: zadText,
            completed: false,
            userId : Number(userId),
        };
    

    
    postZad = await postZadatak(zadObj);
    if(!postZad)
    throw new Error("Nije uspješno!!");
            
    zadaciWrapper.innerHTML += Zadatak(postZad);
        
});

// Delete gumb - Josip

zadaciWrapper.addEventListener("click",async e => {
    e.preventDefault()

    const gumb = e.target.closest("button");
    const kartica = e.target.closest(".kartica");
    let id;
    
    if(gumb)
    {   
        if(gumb.classList.contains("obrisi-gumb"))
        {
            id = gumb.dataset.obrisiId;
            await deleteZadatak(id);
            kartica.remove();
        }
    }
    else{
        return
    }
});