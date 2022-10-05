const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

const selectRandomChosenButton = (id) => $(`#${id}`);

const playSound = (name) => {
  new Audio(`/sounds/${name}.mp3`).play();
};

const animatePress = (currentColour) => {
  const div = $(`#${currentColour}`);
  div.addClass("pressed");
  setTimeout(() => {
    div.removeClass("pressed");
  }, 100);
};

const changeH1Text = (value) => {
  $(`#level-title`).html(`${value}`);
};

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  const selectedButton = selectRandomChosenButton(randomChosenColour);
  selectedButton.fadeIn().fadeOut().fadeIn();
  playSound(randomChosenColour);

  if (level && level > 0) {
    changeH1Text(`Level ${level}`);
  }
};

const startOver = () => {
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
};

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Correct");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    changeH1Text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

$(document).keypress((evt) => {
  if (!started) {
    changeH1Text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$('[type="button"]').click((evt) => {
  const userChoosenColour = evt.currentTarget.id;
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
