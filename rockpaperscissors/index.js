const rockBtn = document.querySelector("#rock");
rockBtn.classList.add('playButtons')

// paper button
const paperBtn = document.querySelector("#paper");
paperBtn.classList.add('playButtons')
// scissors button
const scissorsBtn = document.querySelector("#scissors");
scissorsBtn.classList.add('playButtons')

// new game button
const newGameBtn = document.querySelector("#newGame");
newGameBtn.classList.add('playButtons')

const roundScore = document.querySelector("#roundScore");
const finalScore = document.querySelector("#finalScore");
const player = document.querySelector("#player");
const computer = document.querySelector("#computer");

function getComputerScore() {
    const choices = ['rock', 'scissors', 'paper']
    const randomIndex = Math.floor(Math.random() * choices.length)
    const computerChoice = choices[randomIndex]
    return computerChoice

}

function playRound(playerSelection, computerSelection) {
    const newLi = document.createElement("li");
    newLi.classList.add('newLi')
    if (playerSelection === computerSelection) {
        newLi.innerText = `You chose ${playerSelection} and the computer chose ${computerSelection}. That's a tie!`;
        roundScore.appendChild(newLi)
    } else if (
        playerSelection === 'rock' && computerSelection === 'scissors' ||
        playerSelection === 'paper' && computerSelection === 'rock' ||
        playerSelection === 'scissors' && computerSelection === 'paper'
    ) {
        newLi.innerText = `You chose ${playerSelection} and the computer chose ${computerSelection}. You win!`;
        roundScore.appendChild(newLi);
        playerScore++;
        player.innerText = playerScore
    } else {
        newLi.innerText = `You chose ${playerSelection} and the computer chose ${computerSelection}. You lost.`;
        roundScore.appendChild(newLi);
        computerScore++
        computer.innerText = computerScore
    }
}

let playerScore = 0;
let computerScore = 0;
let isGameOver = false;
let scoreToReach = 5

rockBtn.addEventListener('click', function () {
    if (!isGameOver) {
        playRound('rock', getComputerScore())
        endGame()
    }
})



paperBtn.addEventListener("click", function () {
    if (!isGameOver) {
      playRound("paper", getComputerScore());
      endGame();
    }
  });
  
  scissorsBtn.addEventListener("click", function () {
    if (!isGameOver) {
      playRound("scissors", getComputerScore());
      endGame();
    }
  });

  newGameBtn.addEventListener('click', function () {
    isGameOver = false
    playerScore = 0
    computerScore = 0
    roundScore.innerText = ''
    playerScore.innerText = '0'
    finalScore.innerText = ''
    player.classList.remove('winner', 'loser')
    computer.classList.remove('winner', 'loser')
  })





  function endGame() {
    if(playerScore === scoreToReach ||  computerScore === scoreToReach) {
        isGameOver = true
        if (playerScore === scoreToReach) {
            finalScore.innerText = 'you won the game'
            player.classList.add("winner");
            computer.classList.add("loser")
        }
    } else if (computerScore === scoreToReach) {
        finalScore.innerText = 'you lost the game'
        computer.classList.add("winner");
        player.classList.add("loser")
    }
  }