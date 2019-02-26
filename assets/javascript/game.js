gameObj = {
  characters: {
    luke: {
      name: `Luke Skywalker`,
      img: `./assets/images/luke.jpg`,
      cardColor: 'text-white bg-primary',
      healthMax: 100,
      healthCurrent: 100,
      attack: 10,
      atkStack: 0,
      counter: 20
    },
    boba: {
      name: `Boba Fett`,
      img: `./assets/images/boba.jpg`,
      cardColor: 'text-white bg-success',
      healthMax: 105,
      healthCurrent: 100,
      attack: 9,
      atkStack: 0,
      counter: 13
    },
    obi: {
      name: `Obi-Wan Kenobi`,
      img: `./assets/images/obi.jpg`,
      cardColor: 'text-white bg-secondary',
      healthMax: 105,
      healthCurrent: 105,
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
  combatFunction: function(){
    this.characters[this.playerChoice].atkStack += this.characters[this.playerChoice].attack
    this.characters[this.enemyChoice].healthCurrent -= this.characters[this.playerChoice].atkStack
    $(`#${this.enemyChoice}-health`).text(this.characters[this.enemyChoice].healthCurrent)
    $('.battle-log').append(`<p class="log-data ${this.playerChoice}-log player-log text-light">${this.characters[this.playerChoice].name} attacked ${this.characters[this.enemyChoice].name} for ${this.characters[this.playerChoice].atkStack}.</p>`)
    if(this.characters[this.enemyChoice].healthCurrent <= 0){
      console.log('YOU WON THIS FIGHT!')
      $('.battle-log').append(`<p class="log-data ${this.enemyChoice}-log enemy-log text-light">${this.characters[this.enemyChoice].name} has been defeated!</p>`)
      $(`#${this.enemyChoice}`).remove()
      $('#game-info-header').text('Choose an Opponent!')
      $('.enemy-card-tab').css('visibility', 'hidden')
      this.enemyChoice = ''
      this.wins++
      if(this.wins === 3){
        $('#game-info-header').text('You win!')
        $('.btn-restart').addClass('btn-show')
      }
      return;
    }
    this.characters[this.playerChoice].healthCurrent -= this.characters[this.enemyChoice].counter
    $(`#${this.playerChoice}-health`).text(this.characters[this.playerChoice].healthCurrent)
    $('.battle-log').append(`<p class="log-data ${this.enemyChoice}-log enemy-log text-light">${this.characters[this.enemyChoice].name} attacked ${this.characters[this.playerChoice].name} for ${this.characters[this.enemyChoice].counter}.</p>`)
    if(this.characters[this.playerChoice].healthCurrent <= 0){
      console.log('YOU LOSE')
      $('.battle-log').append(`<p class="log-data ${this.enemyChoice}-log enemy-log text-light">${this.characters[this.enemyChoice].name} has slain you...</p>`)
      $('#game-info-header').text('You lose...')
      $('.btn-restart').addClass('btn-show')
      return;
    }
  },
  resetFunction: function(){
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
    this.slot = 1
    this.wins = 0
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
    // On click event for the character cards
    $('.character-cards').on('click', (e)=>{
      console.log('Card clicked')
      console.log(e)
      if(gameObj.playerChoice === ''){
        gameObj.playerChoice = e.currentTarget.id
        $('#game-info-header').text('Choose an Opponent!')
        $(`#${e.currentTarget.id}`).appendTo('#cs-player')
        $('.player-card-tab').css('visibility', 'visible')
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

$('#atk-btn').on('click', ()=>{
  if(gameObj.enemyChoice !== '' && gameObj.characters[gameObj.playerChoice].healthCurrent > 0){
    gameObj.combatFunction()
  }
})
$('.btn-restart').on('click', ()=>{
  console.log('Restarting game...')
  gameObj.resetFunction()
})
