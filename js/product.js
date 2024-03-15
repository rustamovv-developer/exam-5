const API = "https://dummyjson.com/products";
const info = document.querySelector(".main__info");
const prName = document.querySelector(".pr__name");
const loading = document.querySelector("#loading");

async function fetchData(api) {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");

  let data = await fetch(`${api}/${id}`);
  data
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
    });
}

fetchData(API);

function createCard({
  id,
  category,
  description,
  brand,
  images,
  title,
  price,
}) {
  prName.textContent = title;
  let card = document.createElement("div");
  card.className = "main__card";
  card.innerHTML = `
          <img src="${images[0]}" alt="img" class="main__img" />
          <div class="main__right">
            <h2 class="main__title">
              ${brand} <br />
              ${title}
            </h2>
            <p class="main__text">
              ${description} <br />
              <br />
              Подходит для установки на деревянную/межкомнатную дверь.
            </p>
            <h3 class="main__h3">Цена</h3>
            <div class="main__box">
              <h2 class="main__price">${price}₽</h2>
              <h2 class="main__old">${price + 300}₽</h2>
            </div>
            <button class="main__btn">КОРЗИНКА</button>
          </div>
  `;
  info.appendChild(card);
}
