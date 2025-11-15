// All products data
const allProducts = [
    {
        id: 1,
        name: "Mini Pusheen Plush",
        price: 24.99,
        image: "./img/pusheens.jpg",
        category: "gifts",
        colors: [
            { name: "Gray", hex: "#9CA3AF", image: "./img/pusheen-gray.jpg" },
            { name: "Pink", hex: "#FFC0CB", image: "./img/pusheen-pink.jpg" },
            { name: "Blue", hex: "#93C5FD", image: "./img/pusheen-blue.jpg" },
            { name: "Yellow", hex: "#fff5c6ff", image: "./img/pusheen-yellow.jpg" }
        ]
    },
    {
        id: 2,
        name: "Colorful Gel Pen Set",
        price: 15.99,
        image: "./img/color-pens.jpg",
        category: "stationery"
    },
    {
        id: 3,
        name: "Weekly Planner",
        price: 12.99,
        image: "./img/planner.jpg",
        category: "stationery",
        colors: [
            { name: "Blue", hex: "#cadbffff", image: "./img/planner-blue.jpg" },
            { name: "Green", hex: "#c3e0ceff", image: "./img/planner-green.jpg" },
            { name: "Pink", hex: "#f9dcdcff", image: "./img/planner-pink.jpg" },
            { name: "Yellow", hex: "#fffbd1ff", image: "./img/planner-yellow.jpg" }
        ]
    },
    {
        id: 4,
        name: "Sanrio Keychains",
        price: 9.99,
        image: "./img/keychains.png",
        category: "gifts",
        colors: [
            { name: "Kuromi", hex: "#E9D5FF", image: "./img/planner-blue.jpg" },
            { name: "My Melody", hex: "#ffc1d8ff", image: "./img/planner-green.jpg" },
            { name: "Cinnamoroll", hex: "#c1edffff", image: "./img/planner-pink.jpg" },
        ]
    }
];

let currentFilters = {
    categories: ['all'],
    prices: ['all']
};

// Render products
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    const countElement = document.getElementById('productCount');
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="noProducts">No products found matching your filters.</div>';
        countElement.textContent = '0';
        return;
    }
    
    countElement.textContent = products.length;
    
    grid.innerHTML = products.map(product => `
        <div class="shopProductCard" onclick="window.location.href='product.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}" class="shopProductImage">
            <p class="shopProductCategory">${product.category === 'stationery' ? 'Stationery' : 'Gifts & Collectibles'}</p>
            <h3 class="shopProductName">${product.name}</h3>
            <p class="shopProductPrice">$${product.price.toFixed(2)}</p>
            ${product.colors ? `
                <div class="colorVariants">
                    ${product.colors.map(color => `
                        <div class="colorDot" style="background-color: ${color.hex};" title="${color.name}"></div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Filter products
function filterProducts() {
    let filtered = allProducts;
    
    // Category filter
    if (!currentFilters.categories.includes('all')) {
        filtered = filtered.filter(p => currentFilters.categories.includes(p.category));
    }
    
    // Price filter
    if (!currentFilters.prices.includes('all')) {
        filtered = filtered.filter(p => {
            return currentFilters.prices.some(range => {
                if (range === '0-10') return p.price < 10;
                if (range === '10-20') return p.price >= 10 && p.price < 20;
                if (range === '20-30') return p.price >= 20 && p.price < 30;
                if (range === '30+') return p.price >= 30;
                return false;
            });
        });
    }
    
    renderProducts(filtered);
}

// Handle category filter
document.querySelectorAll('.categoryFilter').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const value = e.target.value;
        
        if (value === 'all') {
            if (e.target.checked) {
                currentFilters.categories = ['all'];
                document.querySelectorAll('.categoryFilter').forEach(cb => {
                    cb.checked = cb.value === 'all';
                });
            }
        } else {
            document.querySelector('.categoryFilter[value="all"]').checked = false;
            currentFilters.categories = Array.from(document.querySelectorAll('.categoryFilter:checked'))
                .map(cb => cb.value)
                .filter(v => v !== 'all');
            
            if (currentFilters.categories.length === 0) {
                currentFilters.categories = ['all'];
                document.querySelector('.categoryFilter[value="all"]').checked = true;
            }
        }
        
        filterProducts();
    });
});

// Handle price filter
document.querySelectorAll('.priceFilter').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const value = e.target.value;
        
        if (value === 'all') {
            if (e.target.checked) {
                currentFilters.prices = ['all'];
                document.querySelectorAll('.priceFilter').forEach(cb => {
                    cb.checked = cb.value === 'all';
                });
            }
        } else {
            document.querySelector('.priceFilter[value="all"]').checked = false;
            currentFilters.prices = Array.from(document.querySelectorAll('.priceFilter:checked'))
                .map(cb => cb.value)
                .filter(v => v !== 'all');
            
            if (currentFilters.prices.length === 0) {
                currentFilters.prices = ['all'];
                document.querySelector('.priceFilter[value="all"]').checked = true;
            }
        }
        
        filterProducts();
    });
});

// Clear all filters
document.querySelector('.clearFilters').addEventListener('click', () => {
    currentFilters = {
        categories: ['all'],
        prices: ['all']
    };
    
    document.querySelectorAll('.categoryFilter, .priceFilter').forEach(cb => {
        cb.checked = cb.value === 'all';
    });
    
    filterProducts();
});

// Initial render
renderProducts(allProducts);