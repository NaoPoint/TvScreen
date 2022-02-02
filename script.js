class Point {
    constructor(horizontal, vertical) {
        this.horizontal = horizontal;
        this.vertical = vertical;
    }
}

let main = new Point(291,541);
let _1 = new Point(292,727);
let _2 = new Point(474,606);
let _3 = new Point(1,1);
let _4 = new Point(1,1);
let _5 = new Point(1,1);

let points = [_1, _2, _3, _4, _5];

var circle = document.createElement("span");
circle.classList.add("main");