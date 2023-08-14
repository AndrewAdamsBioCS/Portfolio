window.onload = function () {
    // Add event listeners for navigation menu clicks
    var headerLinks = document.getElementsByClassName("header-nav-link");
    var sbLinks = document.getElementsByClassName("sb-nav-link");

    for (var i = 0; i < headerLinks.length; i++) {
        headerLinks[i].addEventListener('click', switchActive);
    }

    for (var i = 0; i < sbLinks.length; i++) {
        sbLinks[i].addEventListener('click', switchActive);
    }

    function switchActive(e) {
        console.log("switchactive");
        var menu;
        if (this.classList.contains("header-nav-link")) {
            menu = headerLinks;
        } else if (this.classList.contains("sb-nav-link")) {
            menu = sbLinks;
        }

        for (var i = 0; i < menu.length; i++) {
            if (menu[i].classList.contains("active")) {
                menu[i].classList.toggle("active")
            }
        }

        this.classList.add("active");
    }
}

// Set active tab of header menu to current page
var activePage = window.location.pathname;
activePage = activePage.slice(1, activePage.indexOf(".php"));

if (activePage == "") {
    var thisPage = document.getElementById("about");
} else if (activePage == "invaders" || activePage == "algPuzzleSolver") {
    thisPage = document.getElementById("projects");
} else {
    thisPage = document.getElementById(activePage);
}

thisPage.classList.add("active");

// Define function to toggle work experience divs on menu click
var workDivs = document.getElementsByClassName("work-div");
function toggleWorkDiv(selectedDiv) {
    for (var i = 0; i < workDivs.length; i++) {
        if (workDivs[i].id == selectedDiv) {
            workDivs[i].style.display = "block";
        } else {
            workDivs[i].style.display = "none";
        }
    }
}



