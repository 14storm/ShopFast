const toggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;


(function () {
    const saved = localStorage.getItem('shopmate-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
})();


function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'green' ? 'ti ti-moon' : 'ti ti-sun';
    localStorage.setItem('shopmate-theme', theme);
}

const savedTheme = localStorage.getItem('shopmate-theme') || 'light';
applyTheme(savedTheme);

toggle.addEventListener('click', () => {
    const isLight = html.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'green' : 'light');
});

let cartCount = 0;

function showPopup(message) {
    const popup = document.getElementById('cartPopup');
    popup.textContent = message;
    popup.classList.add('show');

    // automatically hide after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

function addToCart() {


    cartCount += 1;
    document.querySelector('.cart-badge').textContent = cartCount;

    if (cartCount > 0) {
        showPopup(`${cartCount} product added ✅`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    async function getAllProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const productData = await response.json();

            const display = document.getElementById('display');

            productData.forEach((product) => {
                const { image, title, price } = product;

                const displayCard = document.createElement('div');
                displayCard.className = 'card';

                displayCard.innerHTML = `
                    <div class="card-img-wrap">
                        <img src="${image}" alt="${title}">
                    </div>
                    <div class="card-body">
                        <h3>${title}</h3>
                        <div class="progress-bar-wrap">
                            <div class="price-now">&#8358; ${(price * 1500).toLocaleString()}</div>
                            <select name="cart-num" id="slct">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <div onclick="addToCart()"><i class="ti ti-shopping-cart"></i></div>
                        </div>
                    </div>
                `;

                display.appendChild(displayCard);
            });

        } catch (error) {
            console.log(error);
        }
    }

    getAllProducts();
});