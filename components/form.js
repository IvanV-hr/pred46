import { Button } from "./button"

export function createForm(id){
    return`
            <form id="${id}">
            <h3>Upišite podatke</h3>

            <div class="input-wrapper">
                <label for="zad">Upišite novi zadatak</label>
                <input
                    type="text"
                    id="zad"
                    name="zad"
                    required
                >
            </div>
            <div class="input-wrapper">
                <label for="zadId">Upišite user ID</label>
                <input
                    type="number"
                    id="zadId"
                    name="zad-id"
                    required
                >
            </div>

            ${Button("Dodaj zadatak","gumb",{type:"submit"})}
            </form>
        
    `
}