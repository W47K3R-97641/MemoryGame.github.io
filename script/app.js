// Select Element
let title = document.querySelector(".welcome-Game .title-hello");
let input_name = document.querySelector(".welcome-Game .name");
let game_container = document.querySelector(".game-container");
let demand = document.querySelector(".welcome-Game .demand");
let place_Btn = document.querySelector(".btn-next-previous");
let time = document.querySelector(".game-info .time-count");
let btn_Dark_Mode = document.querySelector(".dark-mode");
let place_Game = document.querySelector(".welcome-Game");
let btn_Previous = document.getElementById("previous");
let game_Info = document.querySelector(".game-info");
let root_variable = document.querySelector(":root");
let btn_Next = document.getElementById("next");
let loaded = document.querySelector(".loaded");
let btn_Sound = document.querySelector(".sound");

// Set Option
let counterInterval, select, content, selectedCategory;
let audio_Start = new Audio("/audio/start.wav");
let audio_Win_Xp = new Audio("/audio/xp.wav");
let audio_lost_chances = new Audio("/audio/chances.wav");
let audio_click = new Audio("/audio/click.wav");
let audio_dark_mode = new Audio("/audio/night.wav");
let audio_light_mode = new Audio("/audio/Morning.mp3");
let modeSound = true;
let mode_Now = false;
let clicked = [];
let step_Now = 0;
let chances = 10;
let score = 0;

// Disable Or Enable Sound
btn_Sound.onclick = () => toggleSound(modeSound);

// Next Step
btn_Next.onclick = () => checkInputName();

// Return To Previous Step
btn_Previous.onclick = () => checkPreviousStep();

// Active Dark Mode
btn_Dark_Mode.onclick = () => darkMode_LightMode();

(score == 100 || chances) == 0 ? showResult() : "Not End";

function toggleSound() {
  audio_Start.muted = modeSound;
  audio_Win_Xp.muted = modeSound;
  audio_click.muted = modeSound;

  changeIconSound();

  modeSound = modeSound == false ? true : false;
}

function changeIconSound() {
  btn_Sound.firstElementChild.className =
    modeSound == true ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
}

function checkPreviousStep() {
  // Check If Have Previous Step
  step_Now == 1 ? previous_Step(select) : Error("Not Have Previous Step");
}

function checkInputName() {
  step_Now < 1 ? checkIfWriteName() : showGame();
}

function checkIfWriteName() {
  input_name.value !== "" ? next_Step() : alert("Enter Your Name Please 😇");
}

function startPlay() {
  place_Game.onclick = (event) => {
    get_clicked_card(event.target);
    clicked.length == 2 ? check_result() : IfChosenSecondeCard(6000);
  };
}

function IfChosenSecondeCard(duration) {
  setTimeout(() => {
    if (clicked.length == 1) {
      clicked[0].className = "flip-card";
      clicked[0].id = "";
      clicked.length = 0;
    }
  }, duration);
}

function next_Step() {
  // Hidden Children: title + paragraph + input name For Change
  hiddenElement(true);

  // Turn On Loaded For Prepare Next Step Content
  loaded_Turn(true);

  // Replace Content
  next_Form();

  // Get Data
  getData();
}

function loaded_Turn(on) {
  // Add Or Delete Name Animation
  loaded.style.animationName = on ? "loading" : "";

  // Hidden Or Show Loaded In Page After Finished
  loaded.style.display = on ? "block" : "none";
}

function hiddenElement(action) {
  action = action ? "hidden" : "visible";
  for (let child of place_Game.children) {
    child.style.setProperty("visibility", action);
  }
}

function previous_Step(select) {
  // Hidden Element Step Now
  hiddenElement(true);

  // Turn On Loaded
  loaded_Turn(true);

  // Remove Select Element
  clearPlace(place_Game, select);

  // Change Content
  changeContent();

  // Add Input Name In Place Game
  addInPlace(place_Game, input_name);

  // Empty Input_name
  input_name.value = "";

  // Add Attribute Disabled In Button Previous
  disabledButton(btn_Previous, true);

  // Turn Of Loaded
  loaded_Turn(false);

  // Show Content
  hiddenElement(false);

  // Decrement Step_now
  --step_Now;
}

function disabledButton(target, action) {
  target.disabled = action ? true : false;
  target.className = action ? "of" : "on";
}

function createSelectOptions(content) {
  // Create Select Element For Choose Prefer Content
  select = createSelect();

  // Style Select Element
  styleSelect(select);

  // Create Option Element
  createOptionElement(content, select);

  // Show Element Next Step
  hiddenElement(false);

  // Add Select In place_Game
  addInPlace(place_Game, select);
}

function createSelect() {
  let select = document.createElement("select");
  select.setAttribute("name", "content-prefer");
  return select;
}

function styleSelect(select) {
  select.style.width = "98%";
  select.style.padding = "5px 10px";
}

function createOptionElement(content) {
  for (content of content) {
    // Create Option Element
    let optionElement = document.createElement("option");

    // Set Value  Option Element
    optionElement.setAttribute("value", content.category);

    // Set Inner Html  Of Option Element
    optionElement.innerHTML = `${content.category} ${content.emoji}`;

    // Append Option Element To Select
    select.appendChild(optionElement);
  }
}

function next_Form(bool) {
  // Change Content For Next Step
  changeContent();

  // Remove Input_Name
  clearPlace(place_Game, input_name);

  // Turn Of loaded
  loaded_Turn(false);

  // Increase Step
  step_Now = 1;

  // Delete Disabled For Previous Button
  disabledButton(btn_Previous, false);
}

function changeContent() {
  if (step_Now == 0) {
    title.innerHTML = `Hi👋 <span style="color: var(--special-color);">${input_name.value}</span> 👋`;
    demand.innerHTML = "Select Content Of Game You Prefer 🖤";
  } else {
    title.innerHTML = "Hello World👋";
    demand.innerHTML = "Please Enter Your Name 😇:";
  }
}

function clearPlace(place, target) {
  place.removeChild(target);
}

function addInPlace(place, element) {
  place.appendChild(element);
}

function darkMode_LightMode() {
  mode_Now ? lightMode() : darkMode();
}

function darkMode() {
  toggle("toggle-dark");
  colorDarkMode();
  audio_dark_mode.play();
  mode_Now = true;
}

function toggle(mode) {
  btn_Dark_Mode.children[0].style.animationName = mode;
}

function colorDarkMode() {
  root_variable.style.setProperty("--main-color", "#1f2125");
  root_variable.style.setProperty("--text-color", "white");
  root_variable.style.setProperty("--special-color", "#1f4bd9");
  root_variable.style.setProperty(
    "--shadow-box",
    "var(--special-color) 0px 0px 6px"
  );
  place_Game.parentElement.style.background = "#25262a";
}

function lightMode() {
  toggle("toggle-light");
  colorLightMode();
  audio_light_mode.play();
  mode_Now = false;
}

function colorLightMode() {
  // Change Root Variable Css For Css For Set light-mode
  root_variable.style.setProperty("--main-color", "white");
  root_variable.style.setProperty("--text-color", "black");
  root_variable.style.setProperty("--special-color", "blue");
  place_Game.parentElement.style.background = "var(--main-color)";
}

function random(number_Of_Img) {
  // Empty Array For Push Random Number
  let random_Index = [];

  for (let index = 0; index < number_Of_Img; ) {
    // Get Random Number
    let random = Math.floor(Math.random() * number_Of_Img);

    // Check If Unique Random Index
    if (random_Index.includes(random)) {
      // Skip Random Index If Not Unique
      continue;
    } else {
      // Push Index Random In Array
      random_Index[index] = random;
      index++;
    }
  }

  return random_Index;
}

function preparePlaceGame() {
  // Emptying Place Game + Place Button
  emptyingPlaces();
  // Create name Player + Chances + Point
  createPlayerResult();
}

function createCardGame(random, category, content) {
  // Start Create Content Game Lopping
  for (let index in random) {
    // Create Flip Card
    let flip_Card = createFlipCard(random, content, category, index);

    // Create front face
    let front_Face = createFrontFace();

    // Create Back Face
    let back_Face = createBackFace(random, content, category, index);

    // Append Front Face + Back Face To Flip Card
    appendFacesToFlipCard(flip_Card, front_Face, back_Face);

    // Stylish Parent Of Card
    styleParentCards();
  }
}

function startGame() {
  // Rotate Cards
  rotateAllCards();

  // Start Counter
  startCounter(100);

  audio_Start.play();

  // Start Play
  startPlay();
}

function startCounter(duration) {
  let minutes, seconds;

  counterInterval = setInterval(() => {
    minutes = parseInt(duration / 60);
    seconds = parseInt(duration % 60);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    time.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${minutes}:${seconds}`;

    time.style.width = "77px";

    --duration;

    if (duration < 0) {
      clearInterval(counterInterval);
      showResult();
    } else if (duration < 10) {
      time.style.color = "red";
    }
  }, 1000);
}

function showGame() {
  // Turn On Loaded
  loaded_Turn(true);

  // Content Selected
  selectedCategory = select.selectedOptions[0].index;

  // Number Of Content
  let numberOfContent = getNumberOfContent(selectedCategory);

  // Random Index For Sort Image Game
  let randomIndex = getRandomIndex(numberOfContent);

  // Prepare Place Of Game
  preparePlaceGame();

  createCardGame(randomIndex, select.selectedOptions[0], content);

  // Turn Of Loaded
  loaded_Turn(false);

  // Start Game
  setTimeout(() => startGame(), 3000);
}

function getRandomIndex(contentNum) {
  return [
    ...random(contentNum),
    ...random(contentNum),
    ...random(contentNum),
    ...random(contentNum),
  ];
}

function getNumberOfContent(selectedCategory) {
  return content[selectedCategory].image_directory.length;
}

function getData() {
  // Get Data Content Available
  fetch("content/content_Game.json", {
    method: "GET",
  })
    .then((contentData) => {
      // Change Json Data => Content Available To Object Javascript
      return contentData.json();
    })
    .then((contentData) => {
      content = contentData;
      createSelectOptions(content);
    });
}

function createFlipCard(random, content, category, index) {
  let flip_Card = document.createElement("div");
  flip_Card.className = "flipped-card";

  // Get Data Set Values
  flip_Card.dataset.values = getDataSet(random, content, category, index);
  return flip_Card;
}

function getDataSet(random, content, category, index) {
  return content[category.index].image_directory[random[index]];
}

function createFrontFace() {
  let front_Face = document.createElement("div");
  front_Face.className = "front-face";
  front_Face.innerHTML = `<i class="fa-regular fa-circle-question face"></i>`;
  return front_Face;
}

function createBackFace(random, content, category, index) {
  let back_Face = document.createElement("div");
  back_Face.className = "back-face";
  back_Face.innerHTML = `<img src="/image/${category.value}/${
    content[category.index].image_directory[random[index]]
  }.png"  width="50px" height="50px">`;

  return back_Face;
}

function appendFacesToFlipCard(flip_Card, front_Face, back_Face) {
  // Append Front Face + Back Face To Flip card
  flip_Card.appendChild(front_Face);
  flip_Card.appendChild(back_Face);

  // Append Card Game To Game Place
  place_Game.appendChild(flip_Card);
}

function styleParentCards() {
  // Style place_Game For Show Card Game
  place_Game.style.cssText =
    "display: flex; justify-content: center; flex-wrap: wrap; gap: 5px;padding: 15px; height: 100%;  perspective: 700px;";
}

function emptyingPlaces() {
  // Emptying Place Game
  place_Game.innerHTML = "";

  // Emptying Place Button
  place_Btn.innerHTML = "";
}

function createPlayerResult() {
  place_Btn.innerHTML = `
    <div class="player">
    <i class="fa-solid fa-circle-user player"></i>
    ${input_name.value}
    </div>
    <div class="result">
      <i class="fa-solid fa-heart-pulse heart"></i>
      ${chances}
      <i class="fa-solid fa-star"></i>
      ${score} xp
    </div>`;
}

function rotateAllCards() {
  place_Game.childNodes.forEach((element) => {
    element.className = "flip-card";
  });
}

function get_clicked_card(event_ele) {
  // Check Is Clicked In icon
  let element = checkElementTypeClicked(event_ele);

  let data = checkIfHaveData(element);
  // Check Is Clicked Or not
  if (ifNotClicked(element, data)) {
    clicked.push(element);
    element.id = "is-clicked";
    element.className = "flipped-card";
  }

  //Start Audio Click
  audio_click.play();
}

function checkIfHaveData(element) {
  return element.dataset.values == undefined ? false : true;
}

function checkElementTypeClicked(event_ele) {
  return event_ele.tagName == "I"
    ? event_ele.parentElement.parentElement
    : event_ele.parentElement;
}

function ifNotClicked(element, data) {
  return (
    element.id != "is-clicked" &&
    clicked.length < 2 &&
    data == true &&
    element.className != "has-matched"
  );
}

function check_result() {
  setTimeout(() => checkIfRight(), 1000);
}

function checkIfRight(place_scores, place_chances) {
  ifSameValue() ? matched() : notMatched();
}

function ifSameValue() {
  if (clicked.length == 2) {
    return clicked[0].dataset.values === clicked[1].dataset.values;
  }
}

function notMatched() {
  chancesDecrement(place_Btn.lastChild.firstChild.nextSibling.nextSibling);
  addClassCard("flip-card");
  clearClicked();
}

function chancesDecrement(place_chances) {
  if (chances > 0) {
    chances--;
  }

  place_chances.textContent = chances;
  // Play Audio Lost Chances
  audio_lost_chances.play();
  chances == 0 ? showResult() : "chances";
}

function matched() {
  incrementScore(place_Btn.lastChild.lastChild);
  addClassCard("has-matched");
  clearClicked();
}

function incrementScore(place_scores) {
  score = score + 5;
  place_scores.textContent = score + "XP";

  // Play Audio Win Xp
  audio_Win_Xp.play();

  score == 20 ? showResult() : "score";
}

function addClassCard(class_name) {
  clicked.forEach((element) => {
    element.id = "";
    element.className = class_name;
  });
}

function clearClicked() {
  clicked.length = 0;
}

function showResult() {
  preparePlaceResult();

  let divResult = createDivResult();

  let title = createTitleResult();

  let bar_progress = document.createElement("span");

  styleResult();

  createButtonRetry();

  show(title, divResult, bar_progress);
}

function styleResult() {
  root_variable.style.setProperty("--result", score + "%");
  place_Game.style.flexDirection = "column";
}

function createTitleResult() {
  let title = document.createElement("h3");
  title.className = "title-result";
  title.innerHTML = checkScore();
  return title;
}

function checkScore() {
  if (score <= 10) {
    return "Game Over👾";
  } else if (score > 10 && score < 50) {
    return "less than average😔";
  } else if (score >= 50 && score < 70) {
    return "Good Job😇";
  } else if (score >= 70 && score < 95) {
    return "Perfect😘";
  } else if (score >= 95) {
    return "Great🥳";
  }
}

function createDivResult() {
  let div = document.createElement("div");
  div.dataset.result = score + "%";
  div.className = "progress";
  return div;
}

function show(title, divResult, bar_progress) {
  place_Game.appendChild(title);
  divResult.appendChild(bar_progress);
  place_Game.appendChild(divResult);
  bar_progress.style.animationName = "progress";
}

function preparePlaceResult() {
  place_Game.innerHTML = "";

  clearInterval(counterInterval);

  time.remove();
}

function createButtonRetry() {
  let btn_Retry = document.createElement("button");
  btn_Retry.innerHTML = `<i class="fa-solid fa-rotate-right"></i>`;
  place_Btn.children[0].after(btn_Retry);
  btn_Retry.onclick = () => window.location.reload();
}
