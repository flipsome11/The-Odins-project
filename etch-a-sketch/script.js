// Set initial values for color and click
let color = "black"
let click = false

// When the DOM content is loaded, execute the following:
document.addEventListener("DOMContentLoaded", function() {

    // Create a board with a default size of 16x16
    createBoard(16)

    // Add a click event listener to the body
    document.querySelector("body").addEventListener("click", function(e) {
        // Check if the clicked target is not a button
        if(e.target.tagName != "BUTTON") {
            // Toggle the click variable
            click = !click
            let draw = document.querySelector("#draw")
            // Change the draw message based on the click state
            if(click) {
                draw.innerHTML = "Now You Can Draw"
            }
            else {
                draw.innerHTML = "You're Now Allowed To Draw"
            }
        }
    })

    // Get the popup button and add an event listener to it
    let btn_popup = document.querySelector("#popup")
    btn_popup.addEventListener("click", function() {
        // Get the size from the user input and create a new board
        let size = getSize()
        createBoard(size)
    })
})

// Function to create the drawing board with a specified size
function createBoard(size) {
    let board = document.querySelector(".board")

    // Set grid template columns and rows based on the size
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`

    // Calculate the number of divs needed
    let numDivs = size * size

    // Create divs and add event listeners for mouseover
    for(let i = 0; i < numDivs; i++) {
        let div = document.createElement("div")
        div.addEventListener("mouseover", colorDiv) 
        
        board.insertAdjacentElement("beforeend", div)
    }
}

// Function to get the size input from the user
function getSize() {
    let input = prompt("What will be the size of the board?")
    let message = document.querySelector("#message")
    if(input == "") {
        message.innerHTML = "Please provide a number"
    }
    else if(input < 0 || input > 100) {
        message.innerHTML = "Provide a number between 1 and 100"
    }
    else {
        message.innerHTML = "Now you can play!"
        return input
    }
}

// Function to color the div based on the click state and selected color
function colorDiv() {
    if(click){
        if(color == "random") {
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
        }
        else {
            this.style.backgroundColor = "black"
        }
    }
}

// Function to set the drawing color
function setColor(colorChoice) {
    color = colorChoice
}

// Function to reset the board by changing all divs to white
function resetBoard() {
    let divs = document.querySelectorAll("div")
    divs.forEach((div) => div.style.backgroundColor = "white")
}
