// Base elements
const menuItemContent = document.querySelector("#menuItem");
const gameContent = document.querySelector("#gameContent");

const BASE_URL = "https://eldenring.fanapis.com/api";

// Menu array
const menu = [
  // { title: "All" },
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

// Function to fetch data from the API
const fetchData = async (endpoint) => {
  try {
    let url = `${BASE_URL}/${endpoint}`;
    const response = await fetch(url);
    if (response.status <= 200 && response.status >= 300) {
      throw new Error(`The server returned an error: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

// Function to generate HTML for each menu item and set event listeners
const generateMenu = () => {
  menu.forEach((menuItem) => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="menuItems">${menuItem.title}</a>`;
    menuItemContent.appendChild(li);

    li.querySelector(".menuItems").addEventListener("click", async () => {
      endpoint = menuItem.title.split(" ")[0].toLowerCase();
      await displayItems(endpoint);
    });
  });
};

// Function to display items in gameContent
const displayItems = async (endpoint) => {
  gameContent.innerHTML = ""; // Clear previous content
  const items = await fetchData(endpoint);

  if (items && items.length) {
    items.forEach((item) => {
      const readMore = "<a class='readMore text-blue-500'>...Read More</a>";

      const shortenedDescription =
        item.description?.length > 100
          ? item.description.substring(0, 100) + readMore
          : item.description;

      const cardHtml = `
        <div class="card bg-base-100 w-96 h-[400px] shadow-xl">
          <figure>
            <img class="h-[200px] w-full object-contain" 
              src="${
                item.image ||
                "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              }" 
              alt="Item Image" />
          </figure>
          <div class="card-body h-20">
            <h2 class="card-title">${item.name}</h2>
            <p>${shortenedDescription || "Description Not available"}</p>
          </div>
        </div>`;

      const cardElement = document.createElement("div");
      cardElement.innerHTML = cardHtml;
      gameContent.appendChild(cardElement);

      cardElement.querySelector(".card").addEventListener("click", () => {
        console.log(item.id);
      });
    });
  } else {
    gameContent.innerHTML = "<p>No items found</p>";
  }
};

// Initialize the menu
generateMenu();
