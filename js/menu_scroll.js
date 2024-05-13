let sectionAnchors = [...document.querySelectorAll("section")].map(s => s.getBoundingClientRect().top);
let navigation = [...document.querySelectorAll(".nav-link")]


function markActive(element, state) {
    if(state) {
        if(!element.classList.contains("active")) {
            element.classList.add("active");
        }
    }
    else {
        if(element.classList.contains("active")) {
            element.classList.remove("active");
        }
    }
}


function setActiveSection() {
    let posY = this.scrollY;
    
    if(posY >= sectionAnchors[0] && posY < sectionAnchors[1]) {
        navigation.forEach(l => markActive(l, false));
        markActive(navigation[0], true);
    }
    else if(posY >= sectionAnchors[1] && posY < sectionAnchors[2]) {
        navigation.forEach(l => markActive(l, false));
        markActive(navigation[1], true);
    }
    else if(posY >= sectionAnchors[2] && posY < sectionAnchors[3]) {
        navigation.forEach(l => markActive(l, false));
        markActive(navigation[2], true);
    }
    else if(posY >= sectionAnchors[3] && posY < sectionAnchors[4]) {
        navigation.forEach(l => markActive(l, false));
        markActive(navigation[3], true);
    }
    else if(posY >= sectionAnchors[4] && posY < sectionAnchors[5]) {
        navigation.forEach(l => markActive(l, false));
        markActive(navigation[4], true);
    }
    else if(posY >= sectionAnchors[5] && posY < sectionAnchors[6]) {
        navigation.forEach(l => markActive(l, false));
        markActive(navigation[5], true);
    }
    else if(posY >= sectionAnchors[6]) {
        navigation.forEach(l => markActive(l, false));
        markActive(navigation[6], true);
    }
    
}

setActiveSection();
window.addEventListener("scroll", setActiveSection, false);