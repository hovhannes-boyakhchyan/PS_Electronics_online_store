import { products } from "./products.js";
window.onload = function () {
    exportToCart(); // localic texapoxum enq carti mech, bacelov amboxch nkaragir@ ejum cucadrelu hamar
    showCart(); // eji vra cucadrum e carti aprancner@
    remove__count(); // - count +
    cartStatus(); // ziambjuxi datark kam liq@ linel@ eji vra
    // calc__total__sum();
}
let cart = {}; // stex bacum enq @ndhanur apranqi nkaragir@, saved_articlsic stacat atikulneri mijocov
let saved_articals = JSON.parse(localStorage.getItem("cart")); //localStorage mechic nerbernum enq artikul@ u count@ 
function exportToCart() {
    // ---imnch carti mech aprancner avelacnel@ inch ka jnjum enq carti mechic---
    for (let key in cart) {
        delete cart[key];
    }
    for (let key in saved_articals) {
        cart[key] = (products[key]);
        cart[key]["count"] = (saved_articals[key]);
    }
}
function showCart() {
    // --cart__send petk e avelacnenq innerhtml ov vor chkrknapatki amen anqam showCart() funkcian kancheluc (creatElement@ avelacnelov hin sarqac@ chi jnjum)
    let cart__send = '<div class = "cart__send"></div> ';
    let cart__container = document.querySelector(".cart__container");
    cart__container.innerHTML = cart__send;
    // ----------------------------------------------------------------------
    for (let key in cart) {
        // ----bolor apranqner@ texadrum enq cart__item blockneri mech----
        let cart__item = document.createElement("div");
        cart__item.className = "cart__item";
        document.querySelector(".cart__send").prepend(cart__item);
        // -----------------------------------------------------------------
        let product__info = document.createElement("div");
        product__info.className = "product__info";
        cart__item.prepend(product__info);
        // ---------------------------------------------------------
        let img__model = document.createElement("img");
        img__model.className = "img__model";
        img__model.src = "." + cart[key]["img"];
        product__info.append(img__model);
        // ----------------------------------------------------
        let product__model = document.createElement("div");
        product__model.className = "product__model";
        product__model.append(cart[key]["model"]);
        product__info.append(product__model);
        // ---------------------------------------------------
        let block__count = document.createElement("div");
        block__count.className = "block__count";
        cart__item.append(block__count);
        // ---------------------------------------------------
        let minus = document.createElement("button");
        minus.className = "minus";
        minus.setAttribute("data-articl", key);
        minus.append("‒");
        block__count.prepend(minus);
        // ---------------------------------------------------
        let count = document.createElement("span");
        count.className = "count";
        count.append(cart[key]["count"]);
        block__count.append(count);
        // ---------------------------------------------------
        let plus = document.createElement("button");
        plus.className = "plus";
        plus.setAttribute("data-articl", key);
        plus.append("+");
        block__count.append(plus);
        // -----------------------------------------------------
        let total__block = document.createElement("div");
        total__block.className = "total__block";
        cart__item.append(total__block);
        // ------------------------------------------------
        let total__cost = document.createElement("span");
        total__cost.className = "total__cost";
        let total = (cart[key]["cost"] * cart[key]["count"]);
        total__cost.append(total.toLocaleString('ru') + " AMD");
        total__block.append(total__cost);
        // ------------------------------------------------
        let remove = document.createElement("div");
        remove.className = "remove";
        remove.setAttribute("data-articl", key);
        remove.append("Remove ✘");
        total__block.append(remove);
        // ------------------------------------------------
    }
}
function remove__count() {
    let minus = document.querySelectorAll(".minus");
    for (let i = 0; i < minus.length; i++) {
        minus[i].onclick = function (event) {
            let articl = (event.target.dataset.articl); //stanum enq knopken vorin sxmel enq dast-artikulov-----
            if (saved_articals[articl] > 1) { // qanak@ 1ic mec linelu depcum nor ijecni count@---
                saved_articals[articl]--;
            }
            localStorage.setItem("cart", JSON.stringify(saved_articals)); //qanak@ poxeluc heto petka noric pahpanenq localStorage tvial pahi drutiamb ---
            exportToCart(); // noric kardum enq inch unenq pahpanac (123465:3) vor bacenq et artikulov ev uxarkenq carti mech
            showCart(); // popoxutiunneric heto noric artacenq carti mechi apranqner@ eji vra
            remove__count(); //-- remove__count funkcian kanchum enq vorpezi showCart funkcian katareluc heto noric aktivana mer knopkeq@---
        }
    }
    let plus = document.querySelectorAll(".plus");
    for (let i = 0; i < plus.length; i++) {
        plus[i].onclick = function (event) {
            let articl = (event.target.dataset.articl);
            if (saved_articals[articl] >= 1) {
                saved_articals[articl]++;
            }
            localStorage.setItem("cart", JSON.stringify(saved_articals));
            exportToCart();
            showCart();
            remove__count();
        }
    }
    let remove = document.querySelectorAll(".remove");
    for (let i = 0; i < remove.length; i++) {
        remove[i].onclick = function (event) {
            let articl = (event.target.dataset.articl);
            delete (saved_articals[articl]);
            localStorage.setItem("cart", JSON.stringify(saved_articals));
            exportToCart();
            showCart();
            remove__count();
            cartStatus();
        }
    }
    calc__total__sum(); // canaki popoxutiunic heto verahashvarkum e @ndhanum sum@
}
function cartStatus() {
    if (Object.keys(saved_articals).length === 0) {
        document.querySelector(".cart__status").innerHTML = "Empty Cart";
        document.querySelector(".cart__body").style.display = "none";
    } else {
        document.querySelector(".cart__status").innerHTML = "Basket";
    }
}

// ---------------------------------Paymont--------------------------------------------
let total_sum_text = document.createElement("span");
total_sum_text.append("Total");
document.querySelector(".block_total_cost").prepend(total_sum_text);
// -------
let total__sum = document.createElement("span");
total__sum.className = "total__sum";
document.querySelector(".block_total_cost").append(total__sum);
// ----------
function calc__total__sum() { // @ndhanur gumari hashvark
    let value = 0;
    for (let key in cart) {
        value += (cart[key]["cost"] * cart[key]["count"]);
    }
    total__sum.innerHTML = (value.toLocaleString('ru') + " AMD");
}
//-----------------------------------------------------------------
