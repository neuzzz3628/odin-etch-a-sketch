// DOM
const body = document.querySelector("body");
const container = document.querySelector(".container");

const promptUser = document.createElement("button");
promptUser.textContent = "Grid Adjustment. Default size: 6 x 6";
promptUser.style.fontSize = "20px";
body.insertBefore(promptUser, container);

//removed
promptUser.addEventListener("click", () =>{
    removeDivs();
    changeSize();
})
//


// Workspace
let gridSize = 6;
let square = [];
createGrid(square, gridSize);

// Functions
function changeSize(){
    let input = true;
    while(input){
        gridSize = Number(prompt("Assign grid size:"));
        if (Number.isInteger(gridSize) === false || gridSize > 100 || gridSize < 1){
            alert("The user input might be too high or too low, or simply invalid. Try again")
        } else {
            input = false;
        }
    }
    let newSquare = [];
    promptUser.textContent = `Grid Adjustment. Current size: ${gridSize} x ${gridSize}`;
    createGrid(newSquare, gridSize);
}

function removeDivs(){
    const divs = document.querySelectorAll(".container div");
    divs.forEach((div) => div.remove());
}

function createGrid(shape, size){
    for(let h = 1; h <= size; h++){
        for (let v = 1; v <= size; v++){
            shape.push(`${h}_${v}`);
        }
    }
    //there was "tile" in () below'
    shape.forEach(() => {
        const div = document.createElement("div");
        div.classList.add("base")
        container.appendChild(div);
        div.style.width = `${100 / size}%`;
        div.style.height = `${100 / size}%`;
    })
    
    const divs = document.querySelectorAll(".container div");
    divs.forEach((div) =>{
        let hoveredCount = 0;
        div.addEventListener("mouseover", () =>{
            if(div.classList.contains("hovered")){
                const originalBG = div.id.split(",");
                const currentBG = toRGBArray(div.style.backgroundColor);
                const darkened = blackened(currentBG, originalBG)
                div.style.backgroundColor = `rgb(${darkened[0]}, ${darkened[1]}, ${darkened[2]})`;
                if (hoveredCount<10) hoveredCount+=1;
                div.textContent = hoveredCount;
            } else{
                hoveredCount += 1;
                div.textContent = hoveredCount;
                div.fontSize = "50px";
                const ranBGColor = randomRGBColor();
                div.classList.add("hovered")
                div.style.backgroundColor = `rgb(${ranBGColor[0]}, ${ranBGColor[1]}, ${ranBGColor[2]})`;
                div.id = ranBGColor;
            }
        });
    })
    return divs;
};

function randomRGBColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [r,g,b];
}

function blackened(currentRGB, originalRGB){
    let r = (currentRGB[0]*9 - originalRGB[0]) /9;
    let g = (currentRGB[1]*9 - originalRGB[1]) /9;
    let b = (currentRGB[2]*9 - originalRGB[2]) /9;
    if (r < 0) r = 0;
    if (g < 0) g = 0;
    if (b < 0) b = 0;
    return [Math.floor(r),Math.floor(g),Math.floor(b)];
}

function toRGBArray(rgbStr) {
    return rgbStr.match(/\d+/g).map(Number);
} 