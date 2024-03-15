const API = "https://dummyjson.com/products";
const row = document.querySelector(".products__box");
const productsText = document.querySelector(".products__start__text");
const loading = document.querySelector("#loading");

// get raiting
function getRating(rating) {
  let res = "";
  let star_count = 0;
  let full_star = parseInt(rating);
  let rest_star = rating - full_star;
  star_count = full_star;
  res = Array(full_star)
    .fill("<img  src='./assets/images/full-star.svg'>")
    .join("");
  if (0.25 <= rest_star && rest_star <= 0.5) {
    star_count++;
    res += "<img src='./assets/images/half-star.svg'>";
  }
  if (0.5 < rest_star) {
    star_count++;
    res += "<img src='./assets/images/full-star.svg'>";
  }
  free_star = 5 - star_count;
  res += Array(free_star)
    .fill("<img src='./assets/images/free-star.svg'>")
    .join("");
  return res;
}

async function fetchData(api) {
  let data = await fetch(api);
  data
    .json()
    .then((res) => createCard(res.products))
    .catch((err) => console.log(err))
    .finally(() => {
        loading.style.display = "none";
    });
}

fetchData(API);

function createCard(data) {
  productsText.textContent = `(${data.length})`;
  data.forEach(
    ({
      id,
      category,
      images,
      title,
      price,
      rating,
      description,
      brand,
      stock,
    }) => {
      let card = document.createElement("div");
      card.className = "products__card";
      card.innerHTML = `
              <div class="products__exam">
                <h2 class="products__exam__title"><i class="fa-solid fa-xmark products__exit"></i> Нет в наличии</h2>
                <p class="products__exam__text"><i class="fa-solid fa-gift products__gift"></i> Подарок</p>
              </div>
              <h2 class="products__sale">${brand}</h2>
              <img
                src="${images[0]}"
                alt="${brand}"
                class="products__img"
              />
              <div class="products__center">
                <div class="products__stars">
                  ${getRating(rating)}
                </div>
                <p class="products__center__text">(${rating}) отзывов</p>
              </div>
              <p class="products__text">
                ${description}
              </p>
              <div class="products__prices">
                <h2 class="products__new__price">${price}₽</h2>
                <h2 class="products__old__price">${price + 200}₽</h2>
              </div>
    `;
      card.addEventListener("click", () => singleRoute(id));
      row.appendChild(card);
    }
  );
}

function singleRoute(id) {
  window.open(`./pages/product.html?id=${id}`, "_self");
}
