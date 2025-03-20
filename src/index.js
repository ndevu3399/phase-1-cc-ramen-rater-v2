document.addEventListener("DOMContentLoaded", main);

function main() {
    displayRamens();
    addSubmitListener();
}

function displayRamens() {
    fetch("http://localhost:3000/ramens")
        .then(response => response.json())
        .then(ramens => {
            const menu = document.getElementById("ramen-menu");
            menu.innerHTML = ""; 
            ramens.forEach(ramen => {
                const img = document.createElement("img");
                img.src = ramen.image;
                img.alt = ramen.name;
                img.addEventListener("click", () => handleClick(ramen));
                menu.appendChild(img);
            });
            if (ramens.length > 0) handleClick(ramens[0]); 
        });
}

function handleClick(ramen) {
    document.querySelector("#ramen-detail .detail-image").src = ramen.image;
    document.querySelector("#ramen-detail .name").textContent = ramen.name;
    document.querySelector("#ramen-detail .restaurant").textContent = ramen.restaurant;
    document.querySelector("#rating-display").textContent = ramen.rating;
    document.querySelector("#comment-display").textContent = ramen.comment;
}

function addSubmitListener() {
    document.getElementById("new-ramen").addEventListener("submit", function (event) {
        event.preventDefault();
        const newRamen = {
            name: this.name.value,
            restaurant: this.restaurant.value,
            image: this.image.value,
            rating: this.rating.value,
            comment: this.comment.value,
        };
        addRamenToMenu(newRamen);
        this.reset();
    });
}

function addRamenToMenu(ramen) {
    const menu = document.getElementById("ramen-menu");
    const img = document.createElement("img");
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener("click", () => handleClick(ramen));
    menu.appendChild(img);
}

// Update Ramen Details
const editForm = document.getElementById("edit-ramen");
editForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const updatedRating = document.getElementById("new-rating").value;
    const updatedComment = document.getElementById("new-comment").value;
    
    const currentRamen = document.querySelector("#ramen-detail .name").textContent;
    fetch("http://localhost:3000/ramens")
        .then(response => response.json())
        .then(ramens => {
            const ramen = ramens.find(r => r.name === currentRamen);
            if (ramen) {
                fetch(`http://localhost:3000/ramens/${ramen.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ rating: updatedRating, comment: updatedComment })
                })
                .then(() => {
                    document.querySelector("#rating-display").textContent = updatedRating;
                    document.querySelector("#comment-display").textContent = updatedComment;
                });
            }
        });
});

// Delete Ramen
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.addEventListener("click", function () {
    const currentRamen = document.querySelector("#ramen-detail .name").textContent;
    fetch("http://localhost:3000/ramens")
        .then(response => response.json())
        .then(ramens => {
            const ramen = ramens.find(r => r.name === currentRamen);
            if (ramen) {
                fetch(`http://localhost:3000/ramens/${ramen.id}`, { method: "DELETE" })
                .then(() => {
                    displayRamens(); 
                    document.querySelector("#ramen-detail .detail-image").src = "";
                    document.querySelector("#ramen-detail .name").textContent = "";
                    document.querySelector("#ramen-detail .restaurant").textContent = "";
                    document.querySelector("#rating-display").textContent = "";
                    document.querySelector("#comment-display").textContent = "";
                });
            }
        });
});
document.getElementById("ramen-detail").appendChild(deleteBtn);
