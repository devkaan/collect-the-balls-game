var leftNums = [];
var rightNums = [];
var right = 0;
const boxCount = 81 + 1;
const incrementCount = 9;
for (let left = 1; left < boxCount; left += incrementCount) {
  leftNums.push(left);
  rightNums.push((right += incrementCount));
}
let colors = [
  `#a09c3e`,
  `#aa6124`,
  `#063d90`,
  `#950d00`,
  `#ffb422`,
  `#7d9d9d`,
  `#659ed0`,
  `#0aa48f`,
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
      console.log(index, `=>`, cu1, cu2, color);
      if (cu1 != color && cu2 != color) {
        // console.log(cu3);
        loopBool = false;
        return color;
      }
    }
  }
}
console.log(leftNums);
console.log(rightNums);
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
    moveBall(el);
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
    console.log("hata");
    return { error: 1, message: `Bir hata olustu.` };
  } else {
    // // console.log(
    // //   `sel ${sel}`,
    // //   `rightNums.indexOf(sel) ${rightNums.indexOf(sel)}`,
    // //   `leftNums.indexOf(sel) ${leftNums.indexOf(sel)}`
    // // );
    if (Math.abs(sel - tar) > 8) {
      console.log(`sadece 1 kare hareket edebilirsin`);
      return { error: 1, message: `Bir hata olustu.` };
    }
    if (rightNums.includes(sel)) {
      //? selected at right side
      console.log(`selected at right side`);
      //
    } else if (leftNums.includes(sel)) {
      //? selected at left side
      console.log(`selected at left side`);
      //
    }
  }
  selected = ``;
}

var selected = ``;
function moveBall(el) {
  $(`.selected[index!=${el.getAttribute("index")}]`).removeClass("selected");
  let className = "full";
  let isFull = el.classList.contains(className);

  /* if (isFull && selected) {
    // var nullDivs = document.querySelectorAll(".container div:not(.full)");
    console.log(`cannot do this`);
  } else */ if (!isFull && selected) {
    let res = isPossible(selected, el);
    if (res && typeof res != `object`) {
      el.classList.add(className);
      el.innerHTML = `movedhere`;
      selected = ``;
    } else if (typeof res == `object`) {
      console.log();
    }
  }
  let didSelected = hasClass(el, `selected`);
  if (!didSelected && isFull) {
    selected = el;
    el.classList.add("selected");
  }
}
