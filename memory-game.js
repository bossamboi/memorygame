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

const colors = shuffle(COLORS);

createCards(colors);

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
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    let card = document.createElement("div");
    card.setAttribute("class", color);
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
  card.classList.add("flipped");
  card.removeEventListener("click", handleCardClick);

  // console.log(card.style.backgroundColor);
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = "";
  card.classList.remove("flipped");
  card.addEventListener("click", handleCardClick);
}

/** Handle clicking on a card: this could be first-card or second-card. */

let numberFlipped = 0;

function handleCardClick(evt) {
  // ... you need to write this ...
  // console.log(evt.target);
  let card = evt.target;
  // flip card and reveal color underneath to match div class
  flipCard(card);

  numberFlipped++;
  console.log(numberFlipped);

  // if its the first card...do nothing
  // if its the second card... compare second flip to first flip
  if (numberFlipped === 2) {
    let flippedCards = document.querySelectorAll(".flipped");
    if (flippedCards[0].style.backgroundColor !== flippedCards[1].style.backgroundColor) {
      for (let flippedCard of flippedCards) {
        setTimeout(unFlipCard, 1000, flippedCard);
      }
    } else {
      for (let flippedCard of flippedCards) {
        flippedCard.classList.remove("flipped");
      }
    }

    numberFlipped = 0;
  }

  // if first card class or color is same as second. keep cards face up and make them unclickable
  // if not equal unflip cards.
}
