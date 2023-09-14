// Arayuz islemlerini bu dosyada tutacaz

// Categories Section
const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");

const basketList = document.querySelector(".list");

export function renderCategories(categories) {
  // API den gelen her bir kategori verisi icin ekrana kart basma
  categories.forEach((categories) => {
    //element olusturuyoruz
    const categoryDiv = document.createElement("div");
    // elementin classina clas ismini ekliyoruz
    categoryDiv.classList.add("category");
    //elementin  icine diger elementleri ekliyoruz
    categoryDiv.innerHTML = `
    <img src="${categories.image}" alt="" />
    <span>${categories.name}</span>`;

    // doldurulmus elementi html divine ekliyoruz
    categoryList.appendChild(categoryDiv);
  });
}

// Products Section

export function renderProducts(products) {
  products.slice(0, 40).forEach((product) => {
    const productCard = document.createElement("div"); //div olusturuyoruz

    productCard.className = "product";

    productCard.innerHTML = `
            <img src="${product.images[0]}" />
            <p>${product.title}</p>
            <p>${product.category.name}</p>
            <div class="product-info">
              <p>${product.price} $</p>
              <button id="add-btn" data-id=${product.id}>Sepete Ekle</button>
            </div>
    `;
    //elemani HTML e gonderme

    productList.appendChild(productCard);
  });
}

// urunu moduleda ekrana basan fonksion
export function renderBasketItem(product) {
  console.log(product);
  const basketItem = document.createElement("div");

  basketItem.classList.add("list-item");
  basketItem.innerHTML = `
              <img src="${product.images[0]}"/>
              <h2>${product.title}</h2>
              <h2>${product.price}</h2>
              <p>${product.amount}</p>
              <button id="del-button" data-id="${product.id}">Sil</button>
  `;

  basketList.appendChild(basketItem);
}
