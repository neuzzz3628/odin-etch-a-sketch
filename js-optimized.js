// DOM
const body = document.querySelector("body");
const container = document.querySelector(".container");

// Create and append button
const promptUser = document.createElement("button");
promptUser.textContent = "Grid Adjustment. Default size: 6 x 6";
promptUser.style.fontSize = "30px";
body.insertBefore(promptUser, container);

// Initial grid setup
let gridSize = 6;
createGrid(gridSize);

// Adjust grid size on button click
promptUser.addEventListener("click", () => {
    gridSize = promptGridSize();
    promptUser.textContent = `Grid Adjustment. Current size: ${gridSize} x ${gridSize}`;
    updateGrid(gridSize);
});

// Create grid
function createGrid(size) {
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.classList.add("base");
        div.style.width = div.style.height = `${100 / size}%`;
        container.appendChild(div);
        div.style.fontSize = `${100 * 6 / size}px`

        let hoveredCount = 0;
        div.addEventListener("mouseover", () => {
            if (!div.classList.contains("hovered")) {
                const ranBGColor = randomRGBColor();
                div.classList.replace("base", "hovered");
                div.dataset.originalBG = div.style.backgroundColor = `rgb(${ranBGColor.join(",")})`;
            } else if (hoveredCount < 10) {
                const originalBG = toRGBArray(div.dataset.originalBG);
                const currentBG = toRGBArray(div.style.backgroundColor);
                div.style.backgroundColor = `rgb(${darkenToBlack(currentBG, originalBG).join(",")})`;
            }
            if (hoveredCount < 10) div.textContent = ++hoveredCount;
        });
    }
}

// Remove all grid tiles
function updateGrid(size) {
    container.textContent = "";
    createGrid(size);
}

// Get valid grid size from user
function promptGridSize() {
    let size;
    do {
        size = parseInt(prompt("Assign grid size (1-100):"), 10);
    } while (isNaN(size) || size < 1 || size > 100);
    return size;
}

// Generate random RGB color
function randomRGBColor() {
    return [0, 0, 0].map(() => Math.floor(Math.random() * 256));
}

// Calculate next step toward black
function darkenToBlack(current, original) {
    return current.map((c, i) => Math.max(0, Math.floor((c * 9 - original[i]) / 9)));
}

// Parse "rgb(r, g, b)" into an array
function toRGBArray(rgbStr) {
    return rgbStr.match(/\d+/g).map(Number);
}
