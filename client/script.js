var leftNums = [];
var rightNums = [];
var right = 0;
const boxCount = 81 + 1;
const incrementCount = 9;
var defaultColor = `#2f2f2f`;
var score = 0;
var audio = new Audio("./collectSound.wav");
function removeAttributes(element, ...attrs) {
  attrs.forEach((attr) => element.removeAttribute(attr));
}
for (let left = 1; left < boxCount; left += incrementCount) {
  leftNums.push(left);
  rightNums.push((right += incrementCount));
}
let colors = [
  `#a09c3e`,
  `#aa6124`,
  `#063d90`,
  `#ffb422`,
  `#39c8c8`,
  `#659ed0`,
  `#3ba40a`,
  `#2760a1`,
  `#180682`,
  `#a6130d`,
];
let cu3 = 0;
function randomColor(index) {
  cu3++;
  loopBool = true;
  while (loopBool) {
    var num = Math.floor(Math.random() * colors.length);
    var color = colors[num];
    let cu1;
    let cu2 = $(`div[index=${index}]`);
    if (num) {
      cu1 = $(`div[index=${index - 1}]`).attr("color");
      cu2 = $(`div[index=${index - 9}]`).attr("color");
      if (rightNums.includes(index)) {
        cu1 = $(`div[index=${index - 1}]`).attr("color");
        cu2 = $(`div[index=${index - 9}]`).attr("color");
      } else if (leftNums.includes(index)) {
        cu1 = $(`div[index=${index + 1}]`).attr("color");
        cu2 = $(`div[index=${index - 9}]`).attr("color");
      }

      if (cu1 != color && cu2 != color) {
        loopBool = false;

        return color;
      }
    }
  }
}
var container = document.querySelector(".container");
for (let i = 1; i < 82; i++) {
  let el = document.createElement("div");

  if (i != 41) {
    el.className = `full`;
    let color = randomColor(i);
    el.setAttribute("color", color);
    el.style.backgroundColor = color;
  }
  el.setAttribute("index", i);
  el.innerHTML = i;
  el.addEventListener("click", () => {
    moveBall(el, null);
  });
  container.append(el);
}
function hasClass(target, className) {
  return new RegExp("(\\s|^)" + className + "(\\s|$)").test(target.className);
}
function isPossible(selected, target) {
  let sel = Number(selected.getAttribute("index"));
  let tar = Number(target.getAttribute("index"));
  if (!sel || !tar || sel == tar) {
    return false;
  } else {
    if (Math.abs(sel - tar) > incrementCount + 1) {
      console.log(`sadece 1 kare hareket edebilirsin`);
      return false;
    }
    if (rightNums.includes(sel)) {
      //? selected at right or left side
      console.log(`sadece 1 kare hareket edebilirsin`);
      console.log(`selected at right or left side`);
      let condition = sel + 1 == tar || sel + 10 == tar || sel - 8 == tar;
      if (condition) {
        return false;
      }
      return true;
      //
    } else if (leftNums.includes(sel)) {
      //? exceptions
      let condition = sel - 1 == tar || sel - 10 == tar || sel + 8 == tar;
      if (condition) {
        return false;
      }
      return true;
    } else {
      //? possible move
      moveBall(selected, target);

      selected = ``;
      return true;
    }
  }
}

var selected = ``;
function moveBall(el, target) {
  $(`.selected[index!=${el.getAttribute("index")}]`).removeClass("selected");
  let className = "full";
  let isFull = el.classList.contains(className);
  if (!isFull && selected) {
    let res = isPossible(selected, el);
    if (!res) return;
    let color = selected.getAttribute("color");
    el.classList.add(className);
    el.style.backgroundColor = color;
    el.setAttribute("color", color);
    selected.classList.remove(className);
    selected.classList.remove(`selected`);
    removeAttributes(selected, "color", "style", "class");
    selected = ``;
    checkBalls(el);
  }
  let didSelected = hasClass(el, `selected`);
  if (!didSelected && isFull) {
    selected = el;
    el.classList.add("selected");
  }
}

function checkBalls(el) {
  let index = el.getAttribute("index");
  index = Number(index);
  let color = el.getAttribute("color");
  var nearBalls = [];

  if (rightNums.includes(index)) {
    nearBalls.push($(`div[index="${index - 10}"]`).attr("index"));
    nearBalls.push($(`div[index="${index - 9}"]`).attr("index"));
    nearBalls.push($(`div[index="${index - 1}"]`).attr("index"));
    nearBalls.push($(`div[index="${index + 8}"]`).attr("index"));
    nearBalls.push($(`div[index="${index + 9}"]`).attr("index"));
  } else if (leftNums.includes(index)) {
    nearBalls.push($(`div[index="${index - 9}"]`).attr("index"));
    nearBalls.push($(`div[index="${index - 8}"]`).attr("index"));
    nearBalls.push($(`div[index="${index + 1}"]`).attr("index"));
    nearBalls.push($(`div[index="${index + 9}"]`).attr("index"));
    nearBalls.push($(`div[index="${index + 10}"]`).attr("index"));
  } else {
    nearBalls.push($(`div[index="${index - 10}"]`).attr("index"));
    nearBalls.push($(`div[index="${index - 9}"]`).attr("index"));
    nearBalls.push($(`div[index="${index - 8}"]`).attr("index"));
    nearBalls.push($(`div[index="${index - 1}"]`).attr("index"));
    nearBalls.push($(`div[index="${index + 1}"]`).attr("index"));
    nearBalls.push($(`div[index="${index + 8}"]`).attr("index"));
    nearBalls.push($(`div[index="${index + 9}"]`).attr("index"));
    nearBalls.push($(`div[index="${index + 10}"]`).attr("index"));
  }
  for (let i = 0; i < nearBalls.length; i++) {
    const ballIndex = nearBalls[i];
    let condition = $(`div[index="${ballIndex}"]`).attr("color") == color;
    if (condition) {
      let cu1 = $(`div[index="${index}"]`).addClass("goingHome");
      let cu2 = $(`div[index="${ballIndex}"]`).addClass("goingHome");
      audio.play();
      setTimeout(() => {
        removeAttributes(
          $(`div[index="${ballIndex}"]`)[0],
          "color",
          "style",
          "class"
        );
        removeAttributes(
          $(`div[index="${index}"]`)[0],
          "color",
          "style",
          "class"
        );
        $(`.score`).html(++score);
      }, 300);
      break;
    } else {
      continue;
    }
  }
}
