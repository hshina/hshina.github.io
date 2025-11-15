// Product data with gallery images
const products = {
    1: {
        name: "Mini Pusheen Plush",
        price: "$24.99",
        image: "./img/pusheens.jpg",
        description: "This adorable Mini Pusheen plush is perfect for collectors and cat lovers alike! Super soft and huggable, this little companion brings joy wherever it goes. Made with high-quality materials for lasting cuteness.",
        gallery: [
            "./img/pusheens.jpg",
            "./img/pusheen-gray.jpg",
            "./img/pusheen-pink.jpg",
            "./img/pusheen-blue.jpg",
            "./img/pusheen-yellow.jpg"
        ],
        colors: [
            { 
                name: "Gray", 
                hex: "#9CA3AF", 
                image: "./img/pusheen-gray.jpg",
            },
            { 
                name: "Pink", 
                hex: "#FFC0CB", 
                image: "./img/pusheen-pink.jpg",
            },
            { 
                name: "Blue", 
                hex: "#93C5FD", 
                image: "./img/pusheen-blue.jpg",
            },
            { 
                name: "Yellow", 
                hex: "#fff5c6ff", 
                image: "./img/pusheen-yellow.jpg",
            }
        ]
    },
    2: {
        name: "Colorful Gel Pen Set",
        price: "$15.99",
        image: "./img/color-pens.jpg",
        description: "Bring your notes to life with this vibrant gel pen set! Features 12 smooth-writing pens in assorted colors, perfect for journaling, planning, or adding a pop of color to your everyday writing. Quick-drying ink prevents smudging.",
        gallery: [
            "./img/color-pens.jpg",
            "./img/color-pens1.jpg",
            "./img/color-pens2.jpg"
        ]
    },
    3: {
        name: "Weekly Planner",
        price: "$12.99",
        image: "./img/planner.jpg",
        description: "Stay organized in style with this beautifully designed weekly planner. Features undated pages so you can start anytime, premium paper quality, and inspiring layouts to help you plan your perfect week. Includes goal-setting pages and notes sections.",
        gallery: [
            "./img/planner.jpg",
            "./img/planner1.jpg",
            "./img/planner-blue.jpg",
            "./img/planner-yellow.jpg",
            "./img/planner-green.jpg",
            "./img/planner-pink.jpg"
        ],
        colors: [
            { 
                name: "Blue", 
                hex: "#cadbffff", 
                image: "./img/planner-blue.jpg",
            },
            { 
                name: "Green", 
                hex: "#c3e0ceff", 
                image: "./img/planner-green.jpg",
            },
            { 
                name: "Pink", 
                hex: "#f9dcdcff", 
                image: "./img/planner-pink.jpg",
            },
            { 
                name: "Yellow", 
                hex: "#fffbd1ff", 
                image: "./img/planner-yellow.jpg",
            }
        ],
        
    },
    4: {
        name: "Sanrio Keychains",
        price: "$9.99",
        image: "./img/keychains.png",
        description: "Add some kawaii charm to your keys or bag with these officially licensed Sanrio keychains! Featuring beloved characters in adorable designs. Durable and cute, these make perfect gifts or collectibles for any Sanrio fan.",
        gallery: [
            "./img/keychains.png",
            "./img/kuromi.png",
            "./img/my-melody.png",
            "./img/cinnamoroll.png"
        ],
        colors: [
            { 
                name: "Kuromi", 
                hex: "#E9D5FF", 
                image: "./img/kuromi.png",
            },
            { 
                name: "My Melody", 
                hex: "#ffc1d8ff", 
                image: "./img/my-melody.png",
            },
            { 
                name: "Cinnamoroll", 
                hex: "#c1edffff", 
                image: "./img/cinnamoroll.png",
            }
        ]
        
    }
};

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Current gallery images
let currentGallery = [];

// Function to render gallery
function renderGallery(galleryImages) {
    currentGallery = galleryImages;
    const mainImage = document.getElementById('productMainImage');
    const imageSection = document.querySelector('.productImageSection');
    
    // Check if gallery already exists, if so remove it
    const existingGallery = document.querySelector('.imageGallery');
    if (existingGallery) {
        existingGallery.remove();
    }
    
    // Create gallery HTML
    const galleryHTML = `
        <div class="imageGallery">
            ${galleryImages.map((img, index) => `
                <img src="${img}" 
                     alt="Product view ${index + 1}" 
                     class="galleryThumbnail ${index === 0 ? 'active' : ''}"
                     data-image-index="${index}">
            `).join('')}
        </div>
    `;
    
    // Insert gallery after main image
    mainImage.insertAdjacentHTML('afterend', galleryHTML);
    
    // Add click handlers to thumbnails
    document.querySelectorAll('.galleryThumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            document.querySelectorAll('.galleryThumbnail').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const imageIndex = this.getAttribute('data-image-index');
            mainImage.src = currentGallery[imageIndex];
        });
    });
}

// Load product details
if (productId && products[productId]) {
    const product = products[productId];
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productMainImage').src = product.image;
    document.getElementById('productDesc').textContent = product.description;
    document.title = `${product.name} - Huckberry`;
    
    // Render initial gallery
    if (product.gallery && product.gallery.length > 0) {
        renderGallery(product.gallery);
    }
    
    // Add color selector if product has colors
    if (product.colors && product.colors.length > 0) {
        const colorSelectorHTML = `
            <div class="colorSelector">
                <h3 style="font-size: 20px; font-weight: 600; color: #ff718b; margin-bottom: 15px;">Choose Variant</h3>
                <div class="colorOptions" id="colorOptions">
                    ${product.colors.map((color, index) => `
                        <div class="colorOption ${index === 0 ? 'active' : ''}" data-color-index="${index}">
                            <div class="colorCircle" style="background-color: ${color.hex};"></div>
                            <span class="colorName">${color.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Insert color selector before quantity selector
        const quantityDiv = document.querySelector('.productQuantity');
        quantityDiv.insertAdjacentHTML('beforebegin', colorSelectorHTML);
        
        // Add click handlers for color options
        document.querySelectorAll('.colorOption').forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                document.querySelectorAll('.colorOption').forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update main image and gallery
                const colorIndex = this.getAttribute('data-color-index');
                const selectedColor = product.colors[colorIndex];
                
                // Update main image
                document.getElementById('productMainImage').src = selectedColor.image;
                
                // Update gallery if this color has its own gallery
                if (selectedColor.gallery && selectedColor.gallery.length > 0) {
                    renderGallery(selectedColor.gallery);
                } else {
                    // Otherwise use the main product gallery
                    renderGallery(product.gallery || [selectedColor.image]);
                }
            });
        });
    }
} else {
    // If no valid product ID, redirect to home
    window.location.href = 'index.html';
}