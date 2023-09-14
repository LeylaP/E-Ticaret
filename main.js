//Importlar

import { renderCategories, renderProducts, renderBasketItem } from "./ui.js";

// HTML in yuklenme anini izle
document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  fetchProducts();
});
/*
Kategori bilgileri icin:
1- API ye istek at
2- gelen veriyi fetch / json ile isle
3- gelen veriyi ekrana basajan fonksionu yaz
*/
const baseURL = "https://api.escuelajs.co/api/v1";

function fetchCategories() {
  fetch(`${baseURL}/categories`)
    // egerki veri gelirse calisir
    .then((res) => res.json())
    .then((data) => renderCategories(data))

    // hata olusursa calisir
    .catch((err) => console.log(err));
}
//-----------------------------

// Products verisini Apiden cek burada async await kullandik

let globalData = [];

// Urunler verisini cek
async function fetchProducts() {
  try {
    const res = await fetch(`${baseURL}/products `); // istek et API ye
    const data = await res.json(); // Veriyi isle

    globalData = data; // veriyi butun dosya tarafindan erisilebilir yapma

    renderProducts(data); // gelen veriyi ekrana bas
  } catch {
    console.log(err);
  }
}

// ------Sepet Islemleri-----

let basket = []; // sepette bulunan elemanlar
let total = 0; // sepette bulunanlatin toplam fiyati

const sepetBtn = document.querySelector(".sepet-btn");
const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal-wrapper");
const basketList = document.querySelector(".list");
const modalInfo = document.querySelector(".total-span");

sepetBtn.addEventListener("click", () => {
  modal.classList.add("active"); // modali gorunur yapma

  addList(); // modalin icerisinde sepetteki urunleri listeleme
});

//==========================

// Carpi buttonuna basma olayini izleme
closeBtn.addEventListener("click", () => {
  //modali ortadan kaldirdik
  modal.classList.remove("active");
  // sepetin icindeki HTML i temizle
  basketList.innerHTML = "";
  modalInfo.textContent = "0";
  total = 0;
});

// modal disinda bir yere tiklanma olayini izleme
document.addEventListener("click", (e) => {
  var clickedEl = e.target;
  if (clickedEl.classList.contains("modal-wrapper")) {
    modal.classList.remove("active");
    // sepetin icindeki HTML i temizle
    basketList.innerHTML = "";
    modalInfo.textContent = "0";
    total = 0;
  }
});

// Uygulamadaki butun tiklanma olaylarini izleme

document.body.addEventListener("click", findItem);

function findItem(e) {
  const ele = e.target;
  if (ele.id === "add-btn") {
    // hangi elementi sepete ekleyecegimizi biliyoruz
    // console.dir(ele.dataset.id);

    const selected = globalData.find((product) => product.id == ele.dataset.id);

    if (!selected.amount) {
      // eger sepetteki urunun miktari sifir sa
      selected.amount = 1; // amountuna 1 ekle
    }
    addToBasket(selected);
  }
  //tiklanilan eleman sepetteki sil ise
  if (ele.id == "del-button") {
    //buttonun kapsaycisini html den kaldir
    ele.parentElement.remove();

    // elemani dizi icerisinde bulma
    const selected = globalData.find((i) => i.id == ele.dataset.id);

    // console.dir(ele);
    // diziden elemani silmek icin bu fonksionu chalistir
    deleteItem(selected);
  }
}

function deleteItem(deletingItem) {
  const filtredData = basket.filter((item) => item.id !== deletingItem.id);
  //sepet dizisini guncelleme
  basket = filtredData;

  //toplam fiati guncelleme
  total -= deletingItem.price * deletingItem.amount;

  modalInfo.textContent = total;
}
console.log(basket);

//------------------------------

// Urunleri sepete gonderecek fonksion

// let basket=[] i en ustte tanimledik

function addToBasket(product) {
  // product == selected bilgisi findItem fonksionundan gelecek
  const foundItem = basket.find((item) => item.id == product.id);

  if (foundItem) {
    foundItem.amount++; // urun sepette varsa miktarini arttir
  } else {
    basket.push(product); // urun sepette yoksa ekle
  }
}

// urunleri sepete aktarma fonksionu

function addList() {
  basket.forEach((product) => {
    // urunu ekrana basmamiza yarayan fonksion
    renderBasketItem(product);

    // toplam fiyati guncelle
    total += product.price * product.amount;
  });

  modalInfo.textContent = total;
  console.log(total);
}

// ------------Osman Bey-------------
// Sepetteki urunlerin miktarini toplayan fonksion

// function totalPrice(){
//   let totalPrice=0;
//   for(let i=0; i<basket.length; i++){
//     totalPrice += basket[i].price * basket[i].amount;
//   }
//   return totalPrice
// }
// console.log(totalPrice())
