var focusedList = -1;
var focusedItem = -1;
var catNum = CATS.length;

// set picture
document.getElementById("pic").src = PICS_DIR + PICS[Math.floor(Math.random() * PICS.length)];

var container = document.getElementById("container");

// build categories
for (let i = 1; i <= catNum; i++) {
	let cat = CATS[i-1];

	let catUl = document.createElement("ul");
	catUl.id = `l${i}`;
	// defocus links on category list mousever
	catUl.addEventListener("mouseover", event => {
		focusedItem = -1;
		highlightList();
	});

	let titleLi = document.createElement("li");
	titleLi.id = `l${i}-title`;
	titleLi.textContent = cat.title;

	catUl.append(titleLi);

	for (let link of cat.links) {
		let linkLi = document.createElement("li");
		let linkA = document.createElement("a");
		linkA.textContent = link.text;
		linkA.setAttribute("href", link.url);
		linkLi.append(linkA);
		catUl.append(linkLi);
	}

	container.append(catUl);
}

function highlightList() {
	// defocus item
	focusedLinks = document.getElementsByClassName("focused");
	if (focusedLinks.length > 0)
		focusedLinks[0].className = "";
	// highlight all
	if(focusedList == -1) {
		for (let i = 1; i <= catNum; i++) {
			listEl = document.getElementById("l" + i);
 			listEl.style.opacity = "100%";
			listEl.style.pointerEvents = "all";
		}
		return;
	}
	// highlight focused
	for (let i = 1; i <= catNum; i++) {
		listEl = document.getElementById("l" + i);
		linksEl = listEl.getElementsByTagName("a");
		if (i == focusedList) {
			listEl.style.opacity = "100%";
			listEl.style.pointerEvents = "all";
			if (focusedItem >= 0)
				linksEl[focusedItem].className = "focused";
		}
		else {
			listEl.style.opacity = "50%";
			listEl.style.pointerEvents = "none";	
		}
	}
}

function openLink(linkIndex) {
	let focusedListItems = document.getElementById("l"+focusedList).children;
	if (linkIndex < focusedListItems.length)
		window.open(focusedListItems[linkIndex].children[0].getAttribute("href"), "_self", false);
}

document.onkeydown = function(keydown) {
	let key = keydown.keyCode;
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
		// ESC Q
		else if (key == 27 || key == 81) {
			focusedList = -1;
			focusedItem = -1;
		}
		// left H
		else if (key == 37 || key == 72) {
			focusedList = (focusedList > 1) ? focusedList - 1 : catNum;
			focusedItem = -1;
		}
		// right L
		else if (key == 39 || key == 76) {
			focusedList = (focusedList < catNum) ? focusedList + 1 : 1;
			focusedItem = -1;
		}
		// down J
		else if (key == 40 || key == 74) {
			linksNum = document.getElementById("l"+focusedList).getElementsByTagName("a").length; 
			if (focusedItem == -1 || focusedItem == linksNum - 1)
				focusedItem = 0;
			else
				focusedItem++;
		}
		// up K
		else if (key == 38 || key == 75) {
			linksNum = document.getElementById("l"+focusedList).getElementsByTagName("a").length; 
			if (focusedItem <= 0)
				focusedItem = linksNum - 1;
			else
				focusedItem--;
		}
		// g
		else if (key == 71 && !keydown.shiftKey) {
			focusedItem = 0;
		}
		// G
		else if (key == 71 && keydown.shiftKey) {
			linksNum = document.getElementById("l"+focusedList).getElementsByTagName("a").length; 
			focusedItem = linksNum - 1;
		}
		// 1-9
		else if (key >= 49 && key <= 57) {
			openLink(key - 48);
			focusedList = -1;
		}
		// shift, ctrl, alt, mod
		else if (key >= 16 && key <= 18 || key == 91) {
			return;
		}
		// anything else
		else {
			focusedList = -1;
			focusedItem = -1;
		}

	}
	highlightList();
};
