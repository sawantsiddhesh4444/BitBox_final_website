
/*

console.log("BitBox JavaScript is working !")
let resturantName = "BiteBox";


alert("Welcome to "+ resturantName + "! Enjoy your meal");
 

let customerName = prompt("Please enter your name:");

alert("Hello, "+ customerName + "! Thank you for visiting " + resturantName + ".");

let exploreMenu=confirm("would you like to explore our menu");
if (exploreMenu)
{
    alert("Great ! Lets explore our menus");

}
else{
    alert("no worries ! yo can explore menus later");
}
 let choice=prompt("select your menu :\n"+ "1.Pizza\n"+"2.Burger\n"+"3.Pasta\n"+"4.sandwitch\n");

 switch(choice)
 {
   
     case "1": alert(" You have selected Pizza");
    break;
     case "2": alert(" You have selected Burger");
    break;
     case "3": alert(" You have selected Pasta");
    break;
     case "4": alert(" You have selected Sandwitch");
    break;
    default:alert("invalid choice")

 }
var order=prompt("Enter how many order you want to place");
alert("You have placed " + order + " orders. Thank you for your order!");
for(let i=1;i <= order;i++)
{

let food=prompt("enter your food item1"+i)
let qty=prompt("enter your quantity"+food)
console.log("Food item: " + food + ", Quantity: " + qty); 
}
*/
 

 
 

 function calculatetotalprice(price,quantity)
    {
        return price*quantity;
    }

let resturantName = "BiteBox";
if(document.getElementById("menu-search-form")){
let customerName =prompt("Welcome to " +resturantName +"!\n\nWhat is your name ? "); 

let cartRows=document.querySelectorAll("#shopping-card tbody tr"); 
alert("Hello, " + customerName + "! Thank you for visiting ");
let exploreMenu=confirm("Would you like to explore our menu?");
}
function calculatesubtotal()
{
    let subtotal=0.0;
    let cartRows=document.querySelectorAll("#shopping-card tbody tr"); 
 
    

    

cartRows.forEach(function (row) {

        let priceText = row.children[1].textContent;

        let price = parseFloat(priceText.replace("₹", ""));

        let quantityText = row.children[2].querySelector("span").textContent;

        let quantity = parseInt(quantityText);

        let itemTotal = calculatetotalprice(price, quantity);
        row.children[3].textContent = "₹" + itemTotal.toFixed(2);
        subtotal += itemTotal;

    });

    return subtotal;
}
function calculateDeliveryCharge(subtotal) {
    if (subtotal === 0) {
        return 0;
    }
    return 40;
}


function calculatePackagingCharge(subtotal) {
    if (subtotal === 0) {
        return 0;
    }
    return 20;
}


function calculateDiscount(subtotal) {
    if (subtotal > 500) {
        return subtotal * 0.10;
    }
    return 0;
}


function calculateTotal(subtotal, deliveryCharge, packagingCharge, discount) {
    return subtotal + deliveryCharge + packagingCharge - discount;
}

const cartSection = document.getElementById("shopping-card");
if (cartSection) {
    cartSection.addEventListener("click", function (event) {
        const button = event.target.closest("button");
        if (!button) {
            return;
        }

        const row = button.closest("tr");
        const quantityElement = row && row.children[2].querySelector("span");
        if (!quantityElement) {
            return;
        }

        const quantity = parseInt(quantityElement.textContent, 10);
        if (button.textContent.trim() === "+") {
            quantityElement.textContent = quantity + 1;
        } else if (button.textContent.trim() === "-") {
            quantityElement.textContent = Math.max(1, quantity - 1);
        } else {
            return;
        }

        updateOrderSummary();
    });
}

function updateOrderSummary() {

    let subtotal = calculatesubtotal();

    let deliveryCharge = calculateDeliveryCharge(subtotal);

    let packagingCharge = calculatePackagingCharge(subtotal);

    let discount = calculateDiscount(subtotal);

    let totalAmount = calculateTotal(subtotal,deliveryCharge,packagingCharge,discount);
     document.getElementById("subtotal-amount").textContent = "₹ " + subtotal.toFixed(2);

    document.getElementById("delivery-amount").textContent = "₹" + deliveryCharge.toFixed(2);

    document.getElementById("packaging-amount").textContent = "₹" + packagingCharge.toFixed(2);

    document.getElementById("discount-amount").textContent = "-₹" + discount.toFixed(2);

    document.getElementById("total-amount").textContent ="₹" + totalAmount.toFixed(2);

}
{
    if( document.getElementById("shopping-card")&&document.getElementById("subtotal-amount"))
       
updateOrderSummary();
}

 
let menuCards = document.querySelectorAll("#menu-items article");
let searchInput = document.getElementById("menu-search");
let searchForm = document.getElementById("menu-search-form");

function searchMenu(searchText) {
    let searchTextLower = searchText.trim().toLowerCase();

    menuCards.forEach(function (card) {
        let cardName = card.querySelector("h3").textContent.trim().toLowerCase();
        card.style.display = cardName.includes(searchTextLower) ? "" : "none";
    });
}

if (searchForm && searchInput) {
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        searchMenu(searchInput.value);
    });

    searchInput.addEventListener("input", function () {
        searchMenu(searchInput.value);
    });
}
/* Theme toggle */
const themeButton = document.getElementById("theme-toggle");

function updateThemeButton(isDarkTheme) {
    if (!themeButton) {
        return;
    }

    const themeIcon = themeButton.querySelector(".theme-icon");
    const themeText = themeButton.querySelector(".theme-text");

    if (themeIcon) {
        themeIcon.textContent = isDarkTheme ? String.fromCharCode(9790) : String.fromCharCode(9728);
    }
    if (themeText) {
        themeText.textContent = isDarkTheme ? "Light Mode" : "Dark Mode";
    }

    themeButton.setAttribute("aria-pressed", String(isDarkTheme));
    themeButton.setAttribute(
        "aria-label",
        isDarkTheme ? "switch to light mode" : "switch to dark mode"
    );
}

function toggleTheme() {
    const isDarkTheme = !document.body.classList.contains("dark-mode");
    document.body.classList.toggle("dark-mode", isDarkTheme);
    localStorage.setItem("bitebox-theme", isDarkTheme ? "dark" : "light");
    updateThemeButton(isDarkTheme);
}

function loadTheme() {
    document.body.classList.add("theme-loading");
    const isDarkTheme = localStorage.getItem("bitebox-theme") === "dark";
    document.body.classList.toggle("dark-mode", isDarkTheme);
    updateThemeButton(isDarkTheme);

    if (themeButton) {
        themeButton.addEventListener("click", toggleTheme);
    }

    window.requestAnimationFrame(function () {
        document.body.classList.remove("theme-loading");
    });
}

loadTheme();

// 1. MockAPI URL
const API_URL = "https://6a86d1d070fbbd308f9857a5.mockapi.io/menu/menu";

// 2. Get HTML Elements
const menuContainer = document.getElementById("menu-container");
const menuForm = document.getElementById("menu-form");
const menuModal = document.getElementById("menu-modal");
const addMenuBtn = document.getElementById("add-menu-btn");

if (menuContainer && menuForm && menuModal && addMenuBtn) {
let updateMenuId = null;

// 3. Open and Close Modal
addMenuBtn.addEventListener("click", () => {
    updateMenuId = null;
    menuForm.reset();
    document.getElementById("modal-title").textContent = "Add Menu Item";
    menuModal.classList.add("show");
});

document.getElementById("cancel-menu-form").addEventListener("click", () => {
    menuModal.classList.remove("show");
});

// 4. Display Menu Cards
function displayMenuItems(items) {
    items.forEach(item => {
        const card = document.createElement("article");

        card.className = "api-menu-card";
        card.dataset.id = item.id;
        card.dataset.category = item.category;

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p class="rating">${item.rating}
                <small>(${item.reviews})</small>
            </p>
            <p class="price">₹${item.price}</p>

            <div class="menu-actions">
                <button type="button" class="update-menu-btn">Edit</button>
                <button type="button" class="delete-menu-btn">Delete</button>
            </div>

            <button type="button" class="add-to-cart">
                Add to Cart
            </button>
        `;

        menuContainer.appendChild(card);
    });
}

// 5. GET - Fetch Menu Items
async function fetchMenuItems() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Fetch failed");

        const items = await response.json();

        menuContainer.querySelectorAll(".api-menu-card")
            .forEach(card => card.remove());

        displayMenuItems(items);
        applyFilters();

    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

// 6. POST / PUT - Add or Update Menu Item
menuForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const menuItem = {
        name: document.getElementById("menu-name").value,
        price: document.getElementById("menu-price").value,
        category: document.getElementById("menu-category").value,
        rating: document.getElementById("menu-rating").value,
        reviews: document.getElementById("menu-reviews").value,
        image: document.getElementById("menu-image").value
    };

    try {
        const isUpdate = updateMenuId !== null;

        const response = await fetch(
            isUpdate ? `${API_URL}/${updateMenuId}` : API_URL,
            {
                method: isUpdate ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(menuItem)
            }
        );

        if (!response.ok) throw new Error("Save failed");

        await response.json();

        menuForm.reset();
        menuModal.classList.remove("show");
        updateMenuId = null;

        fetchMenuItems();

    } catch (error) {
        console.error("Save Error:", error);
    }
});

// 7. UPDATE / DELETE - Event Delegation
menuContainer.addEventListener("click", async (event) => {

    const card = event.target.closest(".api-menu-card");
    if (!card) return;

    const id = card.dataset.id;

    // UPDATE
    if (event.target.closest(".update-menu-btn")) {

        updateMenuId = id;

        document.getElementById("menu-name").value =
            card.querySelector("h3").textContent;

        document.getElementById("menu-price").value =
            card.querySelector(".price").textContent.replace("₹", "");

        document.getElementById("menu-category").value =
            card.dataset.category;

        document.getElementById("menu-rating").value =
            card.querySelector(".rating").childNodes[0].textContent.trim();

        document.getElementById("menu-reviews").value =
            card.querySelector(".rating small").textContent.replace(/[()]/g, "");

        document.getElementById("menu-image").value =
            card.querySelector("img").getAttribute("src");

        document.getElementById("modal-title").textContent =
            "Update Menu Item";

        menuModal.classList.add("show");
    }

    // DELETE
    if (event.target.closest(".delete-menu-btn")) {

        if (!confirm("Delete this menu item?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Delete failed");

            card.remove();

        } catch (error) {
            console.error("Delete Error:", error);
        }
    }
});

// 8. SEARCH AND CATEGORY FILTER
let searchText = "";
let selectedCategory = "all";

function applyFilters() {
    menuContainer.querySelectorAll("article").forEach(card => {

        const name = card.querySelector("h3").textContent.toLowerCase();
        const category = (card.dataset.category || "").toLowerCase();

        card.style.display =
            name.includes(searchText) &&
            (selectedCategory === "all" || category === selectedCategory)
                ? ""
                : "none";
    });
}

// Search
const menuSearchInput = document.getElementById("menu-search");
if (menuSearchInput) {
    menuSearchInput.addEventListener("input", (event) => {
        searchText = event.target.value.trim().toLowerCase();
        applyFilters();
    });
}

// Category Filter
function filterMenu(category) {
    selectedCategory = category.toLowerCase();
    applyFilters();
}

// 9. Load Menu When Page Opens
fetchMenuItems();
}
/* Scroll reveal animation */
const revealElements = document.querySelectorAll(".reveal");
if (revealElements.length) {
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }
}
