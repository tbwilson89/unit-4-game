gameObj = {
  characters: {
    luke: {
      name: `Luke Skywalker`,
      img: `./assets/images/luke.jpg`,
      cardColor: 'text-white bg-primary',
      healthMax: 100,
      healthCurrent: 100,
      attack: 12,
      atkStack: 0,
      counter: 15
    },
    boba: {
      name: `Boba Fett`,
      img: `./assets/images/boba.jpg`,
      cardColor: 'text-white bg-success',
      healthMax: 130,
      healthCurrent: 130,
      attack: 10,
      atkStack: 0,
      counter: 12
    },
    obi: {
      name: `Obi-Wan Kenobi`,
      img: `./assets/images/obi.jpg`,
      cardColor: 'text-white bg-secondary',
      healthMax: 140,
      healthCurrent: 140,
      attack: 15,
      atkStack: 0,
      counter: 20
    },
    vader: {
      name: `Darth Vader`,
      img: `./assets/images/vader.jpg`,
      cardColor: 'text-white bg-dark',
      healthMax: 150,
      healthCurrent: 150,
      attack: 10,
      atkStack: 0,
      counter: 25
    }
  },
  playerChoice: '',
  enemyChoice: '',
  wins: 0,
  slot: 1,
  combatFunction: function(){
    this.characters[this.playerChoice].atkStack += this.characters[this.playerChoice].attack
    this.characters[this.enemyChoice].healthCurrent -= this.characters[this.playerChoice].atkStack
    this.characters[this.playerChoice].healthCurrent -= this.characters[this.enemyChoice].counter
    $(`#${this.playerChoice}-health`).text(this.characters[this.playerChoice].healthCurrent)
    $(`#${this.enemyChoice}-health`).text(this.characters[this.enemyChoice].healthCurrent)
    $('.battle-log').append(`<p class="log-data ${this.playerChoice}-log">${this.characters[this.playerChoice].name} attacked ${this.characters[this.enemyChoice].name} for ${this.characters[this.playerChoice].atkStack}.</p>`)
    $('.battle-log').append(`<p class="log-data ${this.enemyChoice}-log enemy-log">${this.characters[this.enemyChoice].name} attacked ${this.characters[this.playerChoice].name} for ${this.characters[this.enemyChoice].counter}.</p>`)
  }
}

for(char in gameObj.characters){
  var html = 0
  $(`
    <div id=${char} class='character-cards'>
      <div class="card ${gameObj.characters[char].cardColor}" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title text-center">${gameObj.characters[char].name}</h5>
        </div>
        <img class="" src=${gameObj.characters[char].img} alt="Card image cap">
        <div class="card-body">
          <p class="card-text text-center">Health: <span id="${char}-health">${gameObj.characters[char].healthCurrent}</span></p>
          <br>
          <div class='text-center'>
          </div>
        </div>
      </div>
    </div>
    `).appendTo(`#cs${gameObj.slot}`)
    gameObj.slot++
}

$('.character-cards').on('click', (e)=>{
  console.log(e)
  if(gameObj.playerChoice === ''){
    gameObj.playerChoice = e.currentTarget.id
    $(`#${e.currentTarget.id}`).appendTo('#cs-player')
  } else if (gameObj.enemyChoice === ''){
    gameObj.enemyChoice = e.currentTarget.id
    $(`#${e.currentTarget.id}`).appendTo('#cs-enemy')
    $('.battle-log').addClass('show')
    $('.battle-actions').addClass('show')
  }
})
$('#atk-btn').on('click', ()=>{
  gameObj.combatFunction()
  console.log(`${gameObj.characters[gameObj.playerChoice].atkStack} and ${gameObj.characters[gameObj.enemyChoice].healthCurrent}`)
})
