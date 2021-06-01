// onmouseenter for pc 
if (window.screen.width > "838") {
    let mouse = document.querySelectorAll(".nav ul li");
    for (let i = 0; i < mouse.length; i++) {
        // --menui ashxatanq (hover), slaqneri animacia
        mouse[i].onmouseenter = function () {
            if (mouse[i].querySelector("ul") != null) {
                mouse[i].querySelector("ul").style.display = "block";
            }
            if (mouse[i].querySelector(".arrow-down") != null) {
                mouse[i].querySelector(".arrow-down").style = "transform: rotate(180deg);"
                    + "transition: all 0.3s ease;" + "border-top: 5px solid rgb(63,76,107);";
                mouse[i].querySelector("a").classList.add("pc__activ__menu");
            }
        }
        mouse[i].onmouseleave = function () {
            if (mouse[i].querySelector("ul") != null) {
                mouse[i].querySelector("ul").style.display = "none";
            }
            if (mouse[i].querySelector(".arrow-down") != null) {
                mouse[i].querySelector(".arrow-down").style = "transform: rotate(0deg);"
                    + "transition: all 0.3s ease;" + "border-top: 5px solid rgb(183, 183, 184);";
                mouse[i].querySelector("a").classList.remove("pc__activ__menu");
            }
        }
    }
}
// select lenguages
let checked__select = document.querySelector(".checked__select");
let select__body = document.querySelector(".select__body");
let select__item = document.querySelectorAll(".select__item");

document.querySelector(".wrapper").addEventListener("click", function (event) {
    if (event.target.parentNode.classList.contains("checked__select")) {
        select__body.classList.toggle("active__select");
    } else {
        document.querySelector(".select__body").classList.remove("active__select");
    }
});

for (let i = 0; i < select__item.length; i++) {
    if (select__item[i].classList.contains("defolt")) {
        checked__select.innerHTML = select__item[i].innerHTML;
    }
    select__item[i].addEventListener("click", function () {
        for (let i = 0; i < select__item.length; i++) {
            select__item[i].classList.remove("defolt");
        }
        checked__select.innerHTML = select__item[i].innerHTML;
        select__body.classList.remove("active__select");
    });
}
// ------------

// location
let checked__location = document.querySelector(".checked__location");
let location__body = document.querySelector(".location__body");
let location__item = document.querySelectorAll(".location__item");

document.querySelector(".wrapper").addEventListener("click", function (event) {
    if (event.target.parentNode.classList.contains("checked__location")) {
        location__body.classList.toggle("active__location");
    } else {
        location__body.classList.remove("active__location");
    }
});

for (let i = 0; i < location__item.length; i++) {
    if (location__item[i].classList.contains("defolt")) {
        checked__location.innerHTML = location__item[i].innerHTML;
    }
    location__item[i].addEventListener("click", function () {
        for (let i = 0; i < location__item.length; i++) {
            location__item[i].classList.remove("defolt");
        }
        checked__location.innerHTML = location__item[i].innerHTML;
        location__body.classList.remove("active__location");
    });
}
// --------------

// ----search----
let search = document.querySelector("#search");
let img__loupe = document.querySelector("[alt = loupe]");

document.querySelector(".wrapper").addEventListener("click", function (event) {
    if (event.target == search || event.target == img__loupe) {
        search.setAttribute("style", "transform: scale(1)");
    } else if (search.value == "") {
        search.setAttribute("style", "transform: scale(0)");
    }
})
// -----live search------
document.querySelector(".loupe").addEventListener("click", searching);
document.querySelector("#search").addEventListener("change", searching);

function searching() {
    clearSearch(); // skzbic zroiacnum enq search@
    let search__value = search.value.toLowerCase().trim(); //toLowerCase() ov sax sarcum enq poqratar, trim() ov skzbum kam verjum ete probel drvac lini hani
    let products__items = document.querySelectorAll(".products__item");
    let products__names = document.querySelectorAll(".products__item .model");
    let count = 0; // count@ nra hamara vor imananq searchi arcunqum qani hat apranqa hide exel, ete count@ hamnkni @ndhanur aprancneri canaki het uremn vochmi apranq chi gtel, "gri tenc apranq chka"
    if (search__value != "") {
        products__names.forEach(function (model, index) {
            if (model.innerText.toLowerCase().search(search__value) == -1) {
                products__items[index].classList.add("hide"); // vor@ chgtav hide enq anum
                document.querySelectorAll(".category").forEach(style => style.classList.add("hide")); // searchi depcum categorianer@ pakum enq
                // -----------------Title search results--------------------
                document.querySelector(".TitleResultSearch").innerText = "Search results: " + search__value;
                document.querySelector(".TitleResultSearch").removeAttribute("style"); // display:none cancel enq anum
                // ---------------------------------------------------------
                count++;
                if (products__items.length == count) {
                    document.querySelector(".products").setAttribute("style", "display:none");
                } else { document.querySelector(".products").removeAttribute("style"); }
            }
        });
    }

    search.oninput = function () { // inputi cankacac popoxutiun@ stugum enq, ete input@ lriv datarka kataruma ifi mechin@
        if (search.value == "") { // stugum enq search@ datarka te che
            clearSearch();
            document.querySelector(".products").removeAttribute("style"); // display:none cancel enq anum
            document.querySelector(".TitleResultSearch").setAttribute("style", "display:none");
            document.querySelectorAll(".category").forEach(style => style.classList.remove("hide")); // apranqneri categorianer@ bacum enq
        }
    }
}

function clearSearch() {
    document.querySelectorAll(".products__item").forEach(item => {
        if (item.classList.contains("hide")) {
            item.classList.remove("hide");
        }
    });
}
// --------------------------------------------------------------------------

// -------------------------Scroll--------------------------------
window.onscroll = function () {
    let scrolled = pageYOffset;
    // -------menu fixed---------
    if (scrolled > 25) {
        document.querySelector(".menu").classList.add("fixed");
    } else {
        document.querySelector(".menu").classList.remove("fixed");
    }
    // ------------Button scroll to top--------------
    if (scrolled > 1200) {
        let btnScrollToTop = document.querySelector(".btnScrollToTop");
        btnScrollToTop.setAttribute("style", "display:block");
        btnScrollToTop.onclick = ToTop;
    } else {
        document.querySelector(".btnScrollToTop").removeAttribute("style");
    };
    let timer;
    function ToTop() {
        if (scrolled > 0) {
            window.scrollTo(0, scrolled);
            scrolled -= 50;
            timer = setTimeout(ToTop, 10);
        } else {
            clearTimeout(timer);
            window.scrollTo(0, 0);
        }
    };
}
// --------------------------------------------------------------------

// ----burger----
let isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

if (isMobile.any() && window.screen.width <= "838") {
    document.querySelector(".burger").onclick = function () {
        let add__class = document.querySelectorAll(".burger, .burger__list, .shadow");
        for (let i = 0; i < add__class.length; i++) {
            add__class[i].classList.toggle("active");
            // bac meui jamanak vor scroll chani
            document.body.classList.toggle("lock");
        }
    }
    let burger__list = document.querySelector(".burger__list");
    let login__content = document.querySelector(".login__content");
    let select__lenguages = document.querySelector(".select__lenguages");
    let cart = document.querySelector(".cart");
    let nav = document.querySelector(".nav");
    // ---------
    let miniMenu__header = document.createElement("div");
    miniMenu__header.className = "miniMenu__header";
    burger__list.prepend(miniMenu__header);
    miniMenu__header.prepend(login__content);
    miniMenu__header.append(select__lenguages);
    // ---------
    burger__list.append(cart);
    burger__list.append(nav);
    // ---------------------------------------------------------------------
    // ---sxmelu knopka products
    let li = document.querySelectorAll(".nav>ul>li>a");
    let menu__burger = document.querySelector(".menu__burger");
    menu__burger.onclick = function (event) {
        for (let i = 0; i < li.length; i++) {
            // ----&nox dasi erexeqin sxmeluc tanuma &nox dasi vra
            if (event.target.parentNode == li[i] || event.target == li[i]) {
                // stugel li harevan uni te che
                if (li[i].nextElementSibling != null) {
                    li[i].nextElementSibling.classList.toggle("open");
                    // li[i].querySelector(".arrow-down").classList.toggle("rotate");
                    li[i].parentElement.classList.toggle("active__color");
                }
                // ---else if paiman: petka unena harevan ev tvial harevan@ petka unena atriboot class
            } else if (li[i].nextElementSibling != null && li[i].nextElementSibling.hasAttribute("class")) {
                li[i].nextElementSibling.classList.remove("open");
                // li[i].querySelector(".arrow-down").classList.remove("rotate");
                li[i].parentElement.classList.remove("active__color");
            }
        }
    }
    // -----------------------------------------------------------------

    // Minch JS faili zagruzken vor CSS@ burgeri mechi componentner@ ch@cucadri, cssi mech bolorin tvel enq display none, hima jsic noric het enq berum display block------
    document.querySelector(".login__content").style.display = "flex";
    document.querySelector(".cart").style.display = "block";
    document.querySelector(".nav").style.display = "block";

    // -------slider swiper mobile settings---------
    let mobile_video_slide = document.querySelectorAll(".swiper-slide video");
    for (let i = 0; i < mobile_video_slide.length; i++) {
        mobile_video_slide[i].setAttribute("src", "./img/slider/mobile/" + [i + 1] + ".mp4"); // i = 0, videoner u nkarneri anunner@ 1 ica sksvum + 1
    }

    // ---- slideri nkarner@ mobili poxeluc heto nor nerqevum miacnum enq slaidner@-----
    let mobile_img_slide = document.querySelectorAll(".swiper-container img")
    for (let i = 0; i < mobile_img_slide.length; i++) {
        mobile_img_slide[i].setAttribute("src", "./img/slider/mobile/" + [i + 1] + ".png");
    }
    // ---------------------------------------------------------------------------------------------
}

// ----slider swiper initial-----
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    grabCursor: true,
    longSwipesRatio: 0.1,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    loop: true,
    speed: 1000,
});


