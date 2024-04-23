let timer
let deleteFirstPhotoDelay

async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        createBreedList(data.message)
    } catch (e) {
        console.log("There was a problem fetching the breed list.")
    }
}

start()

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select oncharge="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedList).map(function (breed) { 
                return `<option>${breed}</option>` 
            }).join('')}
            </select>
        `
}



async function loadByBreed(breed) {
    if (breed != "Choose a dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideshow(data.message)
    }
}

