var picsDir = "img/";
var pics = ["FgBmapfVIAAK0RG", "Fk6t4aoXgAAt9-8", "FkqvMPHXwAAZRdS"];

var focusedList = -1;
var focusedItem = -1;
var catNum = document.getElementById("container").children.length;

// set picture
document.getElementById("pic").src = picsDir + pics[Math.floor(Math.random() * pics.length)];

function highlightList(listIdNum) {
	// highlight all
	if(listIdNum == -1) {
		for (var i = 1; i <= catNum; i++) {
 			document.getElementById("l" + i).style.opacity = "100%";
		}
		return;
	}
	// highlight focused
	for (var i = 1; i <= catNum; i++) {
		document.getElementById("l" + i).style.opacity = (i != listIdNum) ? "50%" : "100%";
	}
}

function openLink(linkIndex) {
	var focusedListItems = document.getElementById("l"+focusedList).children;
	if (linkIndex < focusedListItems.length)
		window.open(focusedListItems[linkIndex].children[0].getAttribute("href"), "_self", false);
}

document.onkeydown = function(keydown) {
	var key = keydown.keyCode;
	// no list focused
	if (focusedList < 0) {
		// left
		if (key == 37 || key == 72) {
			focusedList = catNum;		
		}
		// right
		else if (key == 39 || key == 76) {
			focusedList = 1;		
		}
		// 1-9
		else if (key >= 49 && key <= 57) {
			focusedList = (key - 48 > catNum) ? catNum : key - 48;
		}
		else
			return;
	}
	// list focused 
	else if (focusedList > 0) {
		// ESC
		if (key == 27) {
			focusedList = -1;		
		}
		// left
		else if (key == 37 || key == 72) {
			focusedList = (focusedList > 1) ? focusedList - 1 : catNum;
		}
		// right
		else if (key == 39 || key == 76) {
			focusedList = (focusedList < catNum) ? focusedList + 1 : 1;
		}
		// 1-9
		else if (key >= 49 && key <= 57) {
			openLink(key - 48);
			focusedList = -1;
		}
		// anything else
		else {
			focusedList = -1;
		}
	}

	highlightList(focusedList);
}
