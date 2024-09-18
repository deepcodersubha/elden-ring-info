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
  let endpoint = menus.title.split(" ")[0].toLowerCase();

  menuItemContent.innerHTML += `<li><a class="menuItems">${menus.title}</a></li>`;

  const menuItems = document.querySelectorAll(".menuItems");

  menuItems.forEach((element) => {
    element.addEventListener("click", () => {
      console.log(element.textContent);
    });
  });

  fetch(`${BASE_URL}/${endpoint}`)
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        return response.json();
      } else {
        throw new Error("The server returned an error: " + response.status);
      }
    })
    .then((data) => {
      data.data.forEach((items) => {
        const readMore = "<a class='readMore text-blue-500'>...Read More</a>";

        const shortenedDescription =
          items.description?.length > 100
            ? items.description.substring(0, 100) + readMore
            : items.description;

        const cardHtml = `<div class="card bg-base-100 w-96 h-[400px] shadow-xl">
                <figure>
                    <img class="h-[200px] w-full object-contain" src=${
                      items.image
                        ? items.image
                        : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    } alt="Item Image" />
                </figure>
                <div class="card-body h-20">
                    <h2 class="card-title">${items.name}</h2>
                    <p>${shortenedDescription}</p>
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
