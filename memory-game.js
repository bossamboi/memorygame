"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const button = document.querySelector("button");
const gameBoard = document.getElementById("game");
const score = document.getElementById("guesses");
button.addEventListener("click", startGame);
let guesses;

function startGame() {
  button.innerText = "New Game";
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
  const colors = shuffle(COLORS);
  createCards(colors);
  guesses = 0;
  score.innerText = guesses;
}

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  // const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    let card = document.createElement("div");
    card.setAttribute("class", color);
    card.setAttribute("data-status", "unflipped");
    card.addEventListener("click", handleCardClick);
    gameBoard.append(card);
  }

  // gameBoard.addEventListener("click", function (e) {
  //   if (COLORS.indexOf(e.target.getAttribute("class")) >= 0) {
  //     handleCardClick(e);
  //   }
  // });
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = `${card.getAttribute("class")}`;
  card.setAttribute("data-status", "guess");
  card.removeEventListener("click", handleCardClick);

  // console.log(card.style.backgroundColor);
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = "";
  card.setAttribute("data-status", "unflipped");
  card.addEventListener("click", handleCardClick);
}

/** Handle clicking on a card: this could be first-card or second-card. */

let numberFlipped = 0;

function handleCardClick(evt) {
  // ... you need to write this ...
  // console.log(evt.target);
  guesses++;
  score.innerText = guesses;
  let card = evt.target;
  // flip card and reveal color underneath to match div class
  flipCard(card);

  numberFlipped++;
  console.log(numberFlipped);

  // if its the first card...do nothing
  // if its the second card... compare second flip to first flip
  if (numberFlipped === 2) {
    let unflippedCards = document.querySelectorAll(`[data-status*="unflipped"]`);
    let guessCards = document.querySelectorAll(`[data-status*="guess"]`);

    for (let unflippedCard of unflippedCards) {
      unflippedCard.removeEventListener("click", handleCardClick);
    }

    if (guessCards[0].style.backgroundColor !== guessCards[1].style.backgroundColor) {
      for (let guessCard of guessCards) {
        setTimeout(unFlipCard, FOUND_MATCH_WAIT_MSECS, guessCard);
        setTimeout(reactivateClick, FOUND_MATCH_WAIT_MSECS);
      }
    } else {
      for (let guessCard of guessCards) {
        guessCard.setAttribute("data-status", "flipped");
        reactivateClick();
      }
    }
    numberFlipped = 0;

    function reactivateClick() {
      for (let unflippedCard of unflippedCards) {
        unflippedCard.addEventListener("click", handleCardClick);
      }
    }
  }

  // while (numberFlipped === 2) {
  //   for (let unflippedCard of unflippedCards) {
  //     unflippedCard.removeEventListener("click", handleCardClick);
  //   }
  // }

  // if first card class or color is same as second. keep cards face up and make them unclickable
  // if not equal unflip cards.
}
