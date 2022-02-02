//single point on the map:
class Point {
    constructor(horizontal, vertical) {	//percentage coordinates
        this.horizontal = horizontal;
        this.vertical = vertical;
    }
}

points = setPoints();	//set points inside mapdata.js

//point marker:
for (const point of points) {
	let marker = document.createElement("span");	//virtual element
	marker.classList.add("marker");	//for css

	//set marker position (already absolute)
	marker.style.left = point.horizontal + "%";
	marker.style.top = point.vertical + "%";

	document.body.appendChild(marker);	//assign virtual element to body
}
