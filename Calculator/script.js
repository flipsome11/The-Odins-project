// Declare variables to store operator, previous value, and current value
let operator = ''
let previousValue = ''
let currentValue = ''

// Execute code when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    
    // Store references to various HTML components in variables
    let clear = document.querySelector("#clear-btn")
    let equal = document.querySelector(".equal")
    let decimal = document.querySelector(".decimal")
    let numbers = document.querySelectorAll(".number")
    let operators = document.querySelectorAll(".operator")
    let previousScreen = document.querySelector(".previous")
    let currentScreen = document.querySelector(".current")
    
    // Add event listeners to number buttons
    numbers.forEach((number) => number.addEventListener("click", function(e) {
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue
    }))
    
    // Add event listeners to operator buttons
    operators.forEach((op) => op.addEventListener("click", function(e) {
        handleOperator(e.target.textContent)
        previousScreen.textContent = previousValue + " " + operator
        currentScreen.textContent = currentValue
    }))
    
    // Event listener for the clear button
    clear.addEventListener("click", function(){
        // Reset values to empty strings
        previousValue = ''
        currentValue = ''
        operator = ''
        previousScreen.textContent = currentValue
        currentScreen.textContent = currentValue
    })
    
    // Event listener for the equal button
    equal.addEventListener("click", function(){
        if(currentValue != '' && previousValue != ''){
            calculate()
            previousScreen.textContent = ''
            // Display the result on the current screen, limited to 5 characters
            if(previousValue.length <= 5){
                currentScreen.textContent = previousValue
            } else{
                currentScreen.textContent = previousValue.slice(0,5) + "..."
            }
        }
    })
    
    // Event listener for the decimal button
    decimal.addEventListener('click', function(){
        addDecimal()
    })
})

// Function to handle number button clicks
function handleNumber(num) {
    // Append the clicked number to the current value if character limit not exceeded
    if(currentValue.length <= 5){
        currentValue += num
    }
}

// Function to handle operator button clicks
function handleOperator(op){
    // Set the operator and store the current value as the previous value
    operator = op
    previousValue = currentValue
    currentValue = ''
}

// Function to perform calculations
function calculate() {
    previousValue = Number(previousValue)
    currentValue = Number(currentValue)
    
    // Perform arithmetic based on the selected operator
    if(operator === "+"){
        previousValue += currentValue
    } else if(operator === "-"){
        previousValue -= currentValue
    } else if(operator === "x"){
        previousValue *= currentValue
    } else{
        previousValue /= currentValue
    }
    
    // Round the result to three decimal places
    previousValue = roundNumber(previousValue)
    previousValue = previousValue.toString()
    currentValue = previousValue.toString()
}

// Function to round numbers to three decimal places
function roundNumber(num) {
    return Math.round(num * 1000) / 1000
}

// Function to add a decimal point to the current value
function addDecimal() {
    if(!currentValue.includes(".")){
        currentValue += '.'
    }
}
