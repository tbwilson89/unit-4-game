gameObj = {
  characters: {
    luke: {
      name: `Luke Skywalker`,
      img: `./assets/images/luke.jpg`,
      cardColor: 'text-white bg-primary',
      healthMax: 95,
      healthCurrent: 95,
      attack: 10,
      atkStack: 0,
      counter: 20
    },
    boba: {
      name: `Boba Fett`,
      img: `./assets/images/boba.jpg`,
      cardColor: 'text-white bg-success',
      healthMax: 100,
      healthCurrent: 100,
      attack: 8,
      atkStack: 0,
      counter: 13
    },
    obi: {
      name: `Obi-Wan Kenobi`,
      img: `./assets/images/obi.jpg`,
      cardColor: 'text-white bg-secondary',
      healthMax: 104,
      healthCurrent: 104,
      attack: 9,
      atkStack: 0,
      counter: 19
    },
    vader: {
      name: `Darth Vader`,
      img: `./assets/images/vader.jpg`,
      cardColor: 'text-white bg-dark',
      healthMax: 90,
      healthCurrent: 90,
      attack: 11,
      atkStack: 0,
      counter: 14
    }
  },
  playerChoice: '',
  enemyChoice: '',
  wins: 0,
  slot: 1,
  // function for processing a players attack against the chosen oppoenent
  combatFunction: function(){
    this.characters[this.playerChoice].atkStack += this.characters[this.playerChoice].attack
    this.characters[this.enemyChoice].healthCurrent -= this.characters[this.playerChoice].atkStack
    $(`#${this.enemyChoice}-health`).text(this.characters[this.enemyChoice].healthCurrent)
    $('.battle-log').append(`<p class="log-data ${this.playerChoice}-log player-log text-light">${this.characters[this.playerChoice].name} attacked ${this.characters[this.enemyChoice].name} for ${this.characters[this.playerChoice].atkStack}.</p>`)
    // Check if player has defeated their opponent and updates elements and variables relating to winning combat.
    if(this.characters[this.enemyChoice].healthCurrent <= 0){
      console.log('YOU WON THIS FIGHT!')
      $('.battle-log').append(`<p class="log-data ${this.enemyChoice}-log enemy-log text-light">${this.characters[this.enemyChoice].name} has been defeated!</p>`)
      $(`#${this.enemyChoice}`).remove()
      $('#game-info-header').text('Choose an Opponent!')
      $('.enemy-card-tab').css('visibility', 'hidden')
      this.enemyChoice = ''
      this.wins++
      // Checks if the user has defeated all available opponents, if so display that they win and shows restart button.
      // Checked based on the total number of characters, minus the 1 the user selected.
      if(this.wins === Object.keys(this.characters).length - 1){
        $('#game-info-header').text('You win!')
        $('.btn-restart').addClass('btn-show')
        $('.opponent-tag').css('visibility', 'hidden')
      }
      return;
    }
    this.characters[this.playerChoice].healthCurrent -= this.characters[this.enemyChoice].counter
    $(`#${this.playerChoice}-health`).text(this.characters[this.playerChoice].healthCurrent)
    $('.battle-log').append(`<p class="log-data ${this.enemyChoice}-log enemy-log text-light">${this.characters[this.enemyChoice].name} attacked ${this.characters[this.playerChoice].name} for ${this.characters[this.enemyChoice].counter}.</p>`)
    // Check if the player health has dropped to or below 0, then display necessary information if so.
    if(this.characters[this.playerChoice].healthCurrent <= 0){
      console.log('YOU LOSE')
      $('.battle-log').append(`<p class="log-data ${this.enemyChoice}-log enemy-log text-light">${this.characters[this.enemyChoice].name} has slain you...</p>`)
      $('#game-info-header').text('You lose...')
      $('.btn-restart').addClass('btn-show')
      $('.opponent-tag').css('visibility', 'hidden')
      return;
    }
  },
  resetFunction: function(){
    // adjusting gameObj variables and hiding/showing elements as necessary to return to displaying the correct starting state.
    $(`#${this.playerChoice}`).remove()
    if(this.enemyChoice !== ''){
      $(`#${this.enemyChoice}`).remove()
    }
    this.playerChoice = ''
    this.enemyChoice = ''
    $('.battle-log').removeClass('show')
    $('.battle-actions').removeClass('show')
    $('.btn-restart').removeClass('btn-show')
    $('.battle-log').empty()
    $('#game-info-header').text('Choose a character to start!')
    $('#character-select-row').css('display', 'flex')
    $('.enemy-card-tab').css('visibility', 'hidden')
    $('.player-card-tab').css('visibility', 'hidden')
    this.slot = 1
    this.wins = 0
    // Creating the character cards to be displayed and interacted with on the page
    // Based on the characters available within the characters object within gameObj
    for(char in this.characters){
      this.characters[char].healthCurrent = this.characters[char].healthMax
      this.characters[char].atkStack = 0
      var html = $(`
        <div id=${char} class='character-cards'>
          <div class="card ${this.characters[char].cardColor}" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title text-center">${this.characters[char].name}</h5>
            </div>
            <img class="" src=${this.characters[char].img} alt="Card image cap">
            <div class="card-body">
              <p class="card-text text-center">Health: <span id="${char}-health">${this.characters[char].healthCurrent}</span></p>
              <br>
              <div class='text-center'>
              </div>
            </div>
          </div>
        </div>
        `).appendTo(`#cs${this.slot}`)
        this.slot++
    }
    // attaching the on click event for the character cards after they have been created.
    $('.character-cards').on('click', (e)=>{
      console.log('Card clicked')
      console.log(e)
      if(gameObj.playerChoice === ''){
        gameObj.playerChoice = e.currentTarget.id
        $('#game-info-header').text('Choose an Opponent!')
        $(`#${e.currentTarget.id}`).appendTo('#cs-player')
        $('.player-card-tab').css('visibility', 'visible')
        $('.opponent-tag').css('visibility', 'visible')
        this.slot = 1
        for(char in gameObj.characters){
          if(char !== gameObj.playerChoice){
            console.log(char)
            $(`#${char}`).appendTo(`#cs${this.slot}-opponent`)
            this.slot++
          }
          $('#character-select-row').css('display', 'none')
        }
      } else if (gameObj.enemyChoice === '' && gameObj.playerChoice !== e.currentTarget.id){
        gameObj.enemyChoice = e.currentTarget.id
        $(`#${e.currentTarget.id}`).appendTo('#cs-enemy')
        $('#game-info-header').text('Fight!')
        $('.battle-log').addClass('show')
        $('.battle-actions').addClass('show')
        $('.enemy-card-tab').css('visibility', 'visible')
      }
    })
  }
}

gameObj.resetFunction()
// Attack button on click, checks if there is an enemy chosen and if the player is still alive before running attack function/method
$('#atk-btn').on('click', ()=>{
  if(gameObj.enemyChoice !== '' && gameObj.characters[gameObj.playerChoice].healthCurrent > 0){
    gameObj.combatFunction()
  }
})
// Button to restart the game once the player has either lost or won.
$('.btn-restart').on('click', ()=>{
  console.log('Restarting game...')
  gameObj.resetFunction()
})
