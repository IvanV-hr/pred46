import { Sekcija } from "./components/sekcija.js"
import { Zadatak } from "./components/zadatak.js"
import { dohvatiZadatke, postZadatak } from "./services/api-service.js"
import { createForm } from "./components/form.js"

const main = document.querySelector("#glavni-sadrzaj")

main.innerHTML = `
    <h1>Upravljanje zadatcima</h1>  
    ${Sekcija("Zadaci", `<div>dodaj filtriranje</div><div id="zadaci" class="kartice"></div>`)}
    ${Sekcija("Dodaj zadatak", `<div class="form-wrapper">${createForm("upload")}</div>`)}
    `


const zadaciWrapper = document.querySelector("#zadaci")
let zadaci = []

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

form.addEventListener("submit", e => {
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
    
    async function POST(){
        try{
            postZad = await postZadatak(zadObj);
            if(!postZad)
            throw new Error("Nije uspješno!!");
            
            zadaciWrapper.innerHTML += Zadatak(postZad);
        }
        catch{
            console.log("Nešto je pošlo po zlu")
        }
        
    }
    POST();



    
})