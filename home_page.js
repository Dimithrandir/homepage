var picsDir = "img/";
var pics = ["FgBmapfVIAAK0RG", "Fk6t4aoXgAAt9-8", "FkqvMPHXwAAZRdS"];

var focusedList = -1;
var focusedItem = -1;
var catNum = document.getElementById("container").children.length;

// set picture
document.getElementById("pic").src = picsDir + pics[Math.floor(Math.random() * pics.length)];

// defocus links on category list mousever
for (var i = 1; i <= catNum; i++) {
	listEl = document.getElementById("l" + i);
	listEl.addEventListener("mouseover", event => {
		focusedItem = -1;
		highlightList();
	});
}

function highlightList() {
	// defocus item
	focusedLinks = document.getElementsByClassName("focused");
	if (focusedLinks.length > 0)
		focusedLinks[0].className = "";
	// highlight all
	if(focusedList == -1) {
		for (var i = 1; i <= catNum; i++)
 			document.getElementById("l" + i).style.opacity = "100%";
		return;
	}
	// highlight focused
	for (var i = 1; i <= catNum; i++) {
		listEl = document.getElementById("l" + i);
		linksEl = listEl.getElementsByTagName("a");
		if (i == focusedList) {
			listEl.style.opacity = "100%";
			if (focusedItem >= 0)
				linksEl[focusedItem].className = "focused";
		}
		else
			listEl.style.opacity = "50%";
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
		if (key == 37 || key == 72)
			focusedList = catNum;		
		// right
		else if (key == 39 || key == 76)
			focusedList = 1;		
		// 1-9
		else if (key >= 49 && key <= 57)
			focusedList = (key - 48 > catNum) ? catNum : key - 48;
		else
			return;
	}
	// list focused 
	else if (focusedList > 0) {
		// Enter
		if (key == 13 && focusedItem > -1) {
			openLink(focusedItem + 1);
			focusedList = -1;
			focusedItem = -1;
		}
		// ESC
		else if (key == 27) {
			focusedList = -1;
			focusedItem = -1;
		}
		// left
		else if (key == 37 || key == 72) {
			focusedList = (focusedList > 1) ? focusedList - 1 : catNum;
			focusedItem = -1;
		}
		// right
		else if (key == 39 || key == 76) {
			focusedList = (focusedList < catNum) ? focusedList + 1 : 1;
			focusedItem = -1;
		}
		// down
		else if (key == 40 || key == 74) {
			linksNum = document.getElementById("l"+focusedList).getElementsByTagName("a").length; 
			if (focusedItem == -1 || focusedItem == linksNum - 1)
				focusedItem = 0;
			else
				focusedItem++;
		}
		// up
		else if (key == 38 || key == 75) {
			linksNum = document.getElementById("l"+focusedList).getElementsByTagName("a").length; 
			if (focusedItem <= 0)
				focusedItem = linksNum - 1;
			else
				focusedItem--;
		}
		// 1-9
		else if (key >= 49 && key <= 57) {
			openLink(key - 48);
			focusedList = -1;
		}
		// anything else
		else {
			focusedList = -1;
			focusedItem = -1;
		}
	}
	highlightList();
}
