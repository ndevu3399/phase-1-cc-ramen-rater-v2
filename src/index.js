// src/index.js
export function displayRamens() {
  fetch("http://localhost:3000/ramens") // Assuming you have a JSON server running
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.getElementById("ramen-menu");
      ramenMenu.innerHTML = ""; // Clear previous content

      ramens.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
    })
    .catch((error) => console.error("Error fetching ramens:", error));
}

export function handleClick(ramen) {
  const detailImg = document.getElementById("ramen-detail-image");
  const detailName = document.getElementById("ramen-detail-name");
  const detailRestaurant = document.getElementById("ramen-detail-restaurant");
  const detailRating = document.getElementById("ramen-detail-rating");
  const detailComment = document.getElementById("ramen-detail-comment");

  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = `Rating: ${ramen.rating}`;
  detailComment.textContent = `Comment: ${ramen.comment}`;
}

export function addSubmitListener() {
  const form = document.getElementById("new-ramen");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newRamen = {
      name: form.name.value,
      restaurant: form.restaurant.value,
      image: form.image.value,
      rating: form.rating.value,
      comment: form.comment.value,
    };

    // Add new ramen to menu
    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener("click", () => handleClick(newRamen));
    document.getElementById("ramen-menu").appendChild(img);

    form.reset();
  });
}
