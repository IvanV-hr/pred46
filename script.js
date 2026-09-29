import { Sekcija } from "./components/sekcija.js"
import { Zadatak } from "./components/zadatak.js"
import { dohvatiZadatke } from "./services/api-service.js"

const main = document.querySelector("#glavni-sadrzaj")

main.innerHTML = `
    <h1>Upravljanje zadatcima</h1>  
    ${Sekcija("Zadaci", `
        <div class="filteri">
            <label for="filter-naziv">Pretraga po nazivu</label>
            <input id="filter-naziv" type="search" placeholder="Unesite naziv zadatka">
            <label for="filter-status">Status</label>
            <select id="filter-status">
                <option value="svi">Svi zadaci</option>
                <option value="otvoren">Otvoreni</option>
                <option value="zavrsen">Završeni</option>
            </select>
        </div>
        <div id="zadaci" class="kartice"></div>
    `)}
    ${Sekcija("Dodaj zadatak", `<div>dodaj formu za dodavanje zadatka</div>`)}
`

const zadaciWrapper = document.querySelector("#zadaci")
const filterNaziv = document.querySelector("#filter-naziv")
const filterStatus = document.querySelector("#filter-status")
let zadaci = []

filterNaziv.addEventListener("input", prikaziZadatke)
filterStatus.addEventListener("change", prikaziZadatke)

async function dohvatiPrikaziZadatke() {
    zadaciWrapper.textContent = "Ucitavanje zadataka..."

    try {
        zadaci = await dohvatiZadatke()
        prikaziZadatke()
    } catch {
        zadaciWrapper.textContent = "Doslo je do greske prilikom ucitavanja zadataka. Molimo osvjezite stranicu."   
    }
}

dohvatiPrikaziZadatke()

function prikaziZadatke() {
    const naziv = filterNaziv.value.trim().toLocaleLowerCase()
    const status = filterStatus.value
    const filtriraniZadaci = zadaci.filter((zadatak) => {
        const odgovaraNazivu = zadatak.todo.toLocaleLowerCase().includes(naziv)
        const odgovaraStatusu = status === "svi"
            || (status === "zavrsen" && zadatak.completed)
            || (status === "otvoren" && !zadatak.completed)

        return odgovaraNazivu && odgovaraStatusu
    })

    zadaciWrapper.innerHTML = filtriraniZadaci.length
        ? filtriraniZadaci.map(Zadatak).join("")
        : zadaci.length ? "Nema zadataka koji odgovaraju filteru" : "Nema zadataka za prikaz"
}