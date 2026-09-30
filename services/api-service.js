const apiEnpoint = "https://dummyjson.com/todos"

export async function dohvatiZadatke(){
    const response = await fetch(`${apiEnpoint}?limit=20`)

    if(!response.ok) {
        throw new Error("Greska prilikom dohvacanja zadatka")
    }

    return (await response.json()).todos
}

export async function postZadatak(zadatak){
    try{
        const response = await fetch(apiEnpoint+"/add", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(zadatak)});

        if(!response.ok)
            throw new Error("Greska prilikom postanja zadatka");

        const data = await response.json();
        return data;
    }
    catch(err)
    {
        console.log(err);
    }
    
}

export async function deleteZadatak(id){
    try{
        console.log(`${apiEnpoint}/${id}`);
        const response = await fetch(`${apiEnpoint}/${id}`, {
            method : 'DELETE',
        })

        if(!response.ok)
            throw new Error("Greška prilikom brisanja zadatka");

        return (await response.json());
    }
    catch(err)
    {
        console.log(err);
    }
}

