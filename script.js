

let productDiv = document.querySelector(".product");
let filterDiv = document.querySelector(".filterbtn");
let allCat = [];

let displayProducts = async (selectedCategories = []) => {
    productDiv.innerHTML = '';

    try {
        // Fetch data from the API
        let response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');

        // Parse the JSON response
        let data = await response.json();

        // Iterate over each category
        data.categories.forEach(category => {
            if (!allCat.includes(category.category_name)) {
                // Add category buttons to filterDiv
                filterDiv.innerHTML += `<button onclick="categoryFilter('${category.category_name}')">${category.category_name}</button>`;
                allCat.push(category.category_name);
            }
            
            // Check if the category is selected, if not, do not display products
            if (selectedCategories.length === 0 || selectedCategories.includes(category.category_name)) {
                // Iterate over each product in the category
                category.category_products.forEach(product => {
                    // Display product
                    productDiv.innerHTML += `<div class="productItems">
                        <img src="${product.image}" alt="productImg">
                        <h3>${product.title}</h3>
                        <p>${product.vendor}</p>
                        <h6>Rs ${product.price}.00</h6>
                        <h4>50% Off</h4>
                        <strike>${product.compare_at_price}.00</strike>
                        </br>
                        <button>Add to Cart</button>
                    </div>`;
                });
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call the function to display products from Men category initially
displayProducts(["Men"]);

// Function to filter products by category
let categoryFilter = (categoryName) => {
    // Call displayProducts with selected category name
    displayProducts([categoryName]);
};

