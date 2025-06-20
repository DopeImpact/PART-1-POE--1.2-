const products = [
    {
        id: "product1",
        name: "PHONE CALL & WIFI ACCESS",
        description: "Vulnerable people, including migrants, can make a free 3-minute national or international phone call to a relative or friend. Thirty-minutes of free Wi-Fi is also offered for people to use to contact relatives.",
        imageSrc: "Pictures/MOVEMENT.webp",
        altText: "PHONE CALL & WIFI ACCESS"
    },
    {
        id: "product2",
        name: "RED CROSS MESSAGES",
        description: "If the enquirer does not know the phone number of the sought person, but they have their address or approximate location, they can send a Red Cross Messages.",
        imageSrc: "Pictures/MESSAGES.webp",
        altText: "RED CROSS MESSAGES"
    },
    {        id: "product3",
        name: "TRACING REQUEST",
        description: "The purpose of tracing requests is to inform the enquirer of the whereabouts of a family member, restore contact and to locate the most vulnerable individuals in order to assist and protect them.",
        imageSrc: "Pictures/REQUEST.webp",
        altText: "TRACING REQUEST"
    },
    {
        id: "product4",
        name: "TRACE THE FACE",
        description: "Once a tracing request has been opened for you, SARCS can add your photo to the Trace the Face website, with your consent.",
        imageSrc: "Pictures/FACE.webp",
        altText: "TRACE THE FACE"
    }
];

function renderProducts(filteredProducts) {
    const container = document.querySelector(".container");
    // Remove existing tabcontent divs
    const existingContents = container.querySelectorAll(".tabcontent");
    existingContents.forEach(el => el.remove());

    filteredProducts.forEach((product, index) => {
        const div = document.createElement("div");
        div.id = product.id;
        div.className = "tabcontent";
        div.style.display = index === 0 ? "block" : "none";

        const h3 = document.createElement("h3");
        h3.textContent = product.name;
        div.appendChild(h3);

        const a = document.createElement("a");
        a.href = "#";
        a.className = "lightbox";
        a.addEventListener("click", (e) => {
            e.preventDefault();
            const lightbox = document.getElementById("lightbox");
            lightbox.style.display = "flex";
            lightbox.querySelector("img").src = product.imageSrc;
            lightbox.querySelector("img").alt = product.altText;
        });

        const img = document.createElement("img");
        img.src = product.imageSrc;
        img.alt = product.altText;        img.style.width = "250px";
        img.style.border = "1px solid #ccc";

        a.appendChild(img);
        div.appendChild(a);

        const p = document.createElement("p");
        p.innerHTML = "<big>" + product.description + "</big>";
        div.appendChild(p);

        container.appendChild(div);
    });
}

function showProduct(productId) {
    const contents = document.querySelectorAll(".tabcontent");
    contents.forEach(content => {
        content.style.display = content.id === productId ? "block" : "none";
    });
}

function setActiveTab(tabName) {
    const tabs = document.querySelectorAll(".tablinks");
    tabs.forEach(tab => {
        if (tab.textContent === tabName) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });
}

function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}

function setupSearch() {
    const searchInput = document.getElementById("productSearch");
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = products.filter(product =>            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        if (filtered.length > 0) {
            renderTabs(filtered);
            renderProducts(filtered);
            showProduct(filtered[0].id);
            setActiveTab(filtered[0].name);
        } else {
            // If no products match, clear tabs and content
            document.querySelector(".tab").innerHTML = "<p>No products found.</p>";
            const container = document.querySelector(".container");
            const existingContents = container.querySelectorAll(".tabcontent");
            existingContents.forEach(el => el.remove());
        }
    });
}
function renderTabs(products) {
    const tabContainer = document.querySelector(".tab");
    // Clear existing tabs
    tabContainer.innerHTML = '';

    products.forEach(product => {
        const button = document.createElement("button");
        button.className = "tablinks";
        button.dataset.tab = product.id;
        button.textContent = product.name;

        button.addEventListener("click", () => {
            showProduct(product.id);            setActiveTab(product.name);
        });

        tabContainer.appendChild(button);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    renderTabs(products);
    renderProducts(products);
    setupLightbox();
    setupSearch();

    // Set the first tab as active by default
    if (products.length > 0) {
        showProduct(products[0].id);
        setActiveTab(products[0].name);
    }
});
