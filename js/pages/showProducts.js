import { products } from "./products.js";
import { phone, TV, PC, notebook } from "./products.js";
//==============eji bacveluc heto =======
window.onload = function () {
    showProducts(TV); // glxavor ejum cucadrum enq bolor TV
    showProducts(PC);
    showProducts(notebook);
    showProducts(phone);
    checkCart(); // stugum enq zambjxum unenq avelacrac apranqne te che
    addToLocalStorage(); // @ntrac product@ uxarkum enq localStorageum pahelu
    index__cart(); // zambiuxi arka apranqnei qanak@ cucadrim enq zambiuxi vra
}

function showProducts(product__type) {
    let category_name = ""; // apranqneri blocki anvanman hamar(TVS, Phones...)
    let products__body = document.createElement("div");
    products__body.className = "products__body";
    document.querySelector(".products").prepend(products__body);
    for (let key in product__type) {
        let products__item = document.createElement("div");
        products__item.className = "products__item";
        products__body.prepend(products__item);
        // ---nkari texadrum-----
        let img = document.createElement("img");
        img.className = "item__img";
        img.src = product__type[key]["img"];
        products__item.prepend(img);
        // ---modeli anvanum---
        let model = document.createElement("p");
        model.className = "model";
        model.append(product__type[key]["model"]);
        products__item.append(model);
        // ----gin---
        let cost = document.createElement("p");
        cost.className = "cost";
        cost.append(product__type[key]["cost"].toLocaleString('ru') + " AMD");
        products__item.append(cost);
        // ---button buy---
        let buy = document.createElement("button");
        buy.className = "buy";
        // ----datain kcum enq apranqi artikl@ vor imananq vor apranq@ uxarkenq zambjux---
        buy.setAttribute("data-articl", key);
        // ---buttni mech dnu enq zambjuxi nkar u Buy----
        let cart = document.createElement('img');
        cart.src = "./img/icon/buy__cart.svg";
        buy.append(cart);
        let span__buy = document.createElement("span");
        span__buy.append("Buy");
        buy.append(span__buy);
        products__item.append(buy);
        category_name = product__type[key]["category"]; // apranqneri tesak@ poxancum enq category_name mech (TV, PC..)
    }
    let category = document.createElement("div");
    category.className = "category";
    category.append(category_name);
    document.querySelector(".products").prepend(category); // Products divi mech nerarum enq apranqneri kategorianeri anvanumner@
}
// ---------------------apranqner@ avelacnum enq zambiuxi mech------------------------
// ----karzinai hamar nor object enq sarqum vor @ntrac apranqner@ nerarenq dra mech-----
let cart__elements = {};
function addToLocalStorage() {
    let articl = {};
    // -------click buy knopkin-------
    let arr = document.querySelectorAll(".products .buy");
    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener("click", function (event) {
            // ---erku depq enq ditarkum, ete henc buttnin enq sxmum u ete battni mechi elementnerin, petka amen depqum stananq buttni articul@----
            if (event.target.parentNode.className == "buy") {
                articl = (event.target.parentNode.dataset.articl);
            } else if (event.target.className == "buy") {
                articl = (event.target.dataset.articl);
            }
            // -----stugum enq ete zambiuxi mech chka tvjal apranq@ avelacnum enq isk ete ka countn enq avelacnum----
            if (cart__elements[articl] == undefined) {
                // ------stugum enq cart__elenents mech ka avelacrac et apran@ te che-----
                cart__elements[articl] = 1;
            } else {
                cart__elements[articl]++;
            }
            // ----qani vor cart__elements@ hamarvum e object, iran petka sarqenq string JSON mech nor tanq lacalStoragin-------
            localStorage.setItem("cart", JSON.stringify(cart__elements));
            index__cart__click();
        })
    }
}

// ------stugum enq localStorigum unenq naxkinum avelacrac aprancner te che, vor nor@ avelacneluc ch@zroiacni hner@-----
function checkCart() {
    if (JSON.parse(localStorage.getItem("cart")) != null) //--stugum enq vor null chlini teche cart__elementi mech berelu null@ baga arachacnelu
        cart__elements = JSON.parse(localStorage.getItem("cart"));
    else { localStorage.setItem("cart", JSON.stringify(cart__elements)); } // ete null avelacnum enq localStoragi mech datari object@ cart__elementi vor cart.ja => cartStatus() ashxati
}
// ------------------------------------------------------------------------------------

// ----- zambiuxi vra artahanum enq @ntrac apranqneri qanak@----
let count = 0;
function index__cart() {
    for (let key in cart__elements) {
        count += cart__elements[key];
    }
    document.querySelector(".count").innerHTML = count;
}
function index__cart__click() {
    count++;
    document.querySelector(".count").innerHTML = count;
}
// -------------------------------------------------------------------------------
