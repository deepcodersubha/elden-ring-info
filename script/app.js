const menuItemContent = document.querySelector("#menuItem");
const gameContent = document.querySelector("#gameContent");

const BASE_URL = "https://eldenring.fanapis.com/api";

const menu = [
  { title: "Ammos" },
  { title: "Armors" },
  { title: "Ashes of War" },
  { title: "Bosses" },
  { title: "Classes" },
  { title: "Creatures" },
  { title: "Incantations" },
  { title: "Items" },
  { title: "Locations" },
  { title: "NPCs" },
  { title: "Shields" },
  { title: "Sorceries" },
  { title: "Spirits" },
  { title: "Talismans" },
  { title: "Weapons" },
];

for (const menus of menu) {
  menuItemContent.innerHTML += `<li><a>${menus.title}</a></li>`;

  fetch(`${BASE_URL}/${menus.title.toLowerCase()}`)
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        return response.json();
      } else {
        throw new Error("The server returned an error: " + response.status);
      }
    })
    .then((data) => {
      data.data.forEach((items) => {
        const cardHtml = `<div class="card bg-base-100 w-96 shadow-xl">
                <figure class="w-full h-[15rem] object-contain mx-auto">
                    <img class="object-cover" src=${items.image} alt="Item Image" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${items.id }</h2>
                    <p>${items.description}</p>
                </div>
            </div>`;

        const cardElement = document.createElement("div");
        cardElement.innerHTML = cardHtml;
        gameContent.appendChild(cardElement);

        cardElement.querySelector(".card").addEventListener("click", () => {
          console.log(items.id);
        });
      });
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}
