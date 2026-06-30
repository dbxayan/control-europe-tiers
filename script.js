// Master data lineup for Control Europe
const initialLineup = [
    { name: "shuljo", logo: "rebellion.png" },
    { name: "foreverpawani", logo: "valhalla.png" },
    { name: "mmishi", logo: "valhalla.png" },
    { name: "mattie", logo: "valhalla.png" },
    { name: "Percy", logo: "rebellion.png" },
    { name: "Bonekoko", logo: "valhalla.png" },
    { name: "Aion", logo: "valhalla.png" },
    { name: "ryan", logo: "rebellion.png" },
    { name: "rastaclat", logo: "valhalla.png" },
    { name: "poney", logo: "valhalla.png" },
    { name: "sin", logo: "valhalla.png" },
    { name: "Bondt", logo: "valhalla.png" },
    { name: "Sinan", logo: "valhalla.png" },
    { name: "Ananas", logo: "rebellion.png" },
    { name: "imesium", logo: "valhalla.png" },
    { name: "Fshy", logo: "valhalla.png" },
    { name: "Rimu", logo: "valhalla.png" },
    { name: "babatunde", logo: "valhalla.png" },
    { name: "Jayden", logo: "rebellion.png" },
    { name: "Ayden ahmed", logo: null }
];

document.addEventListener("DOMContentLoaded", () => {
    const ranksContainer = document.getElementById("ranks-container");
    ranksContainer.innerHTML = ""; // Clear placeholders

    // Build the 20 official leaderboard slots
    initialLineup.forEach((player, index) => {
        const rankNum = index + 1;

        // Create the individual grid slot structure
        const slot = document.createElement("div");
        slot.className = "rank-slot";

        const numDiv = document.createElement("div");
        numDiv.className = "rank-number";
        numDiv.textContent = `#${rankNum}`;
        slot.appendChild(numDiv);

        // Create the moveable player asset
        const playerCard = document.createElement("div");
        playerCard.className = "drag-item";
        playerCard.draggable = true;
        playerCard.id = `player-card-${rankNum}`;

        // Insert logo if assigning one
        let logoImg = "";
        if (player.logo) {
            logoImg = `<img src="${player.logo}" class="player-logo" alt="Logo">`;
        }

        playerCard.innerHTML = `${logoImg}<span>${player.name}</span>`;

        // Load drag triggers
        attachDragAndDropHandlers(playerCard);

        slot.appendChild(playerCard);
        ranksContainer.appendChild(slot);
    });

    // Handle dropping elements anywhere on grid slots or list zones
    document.querySelectorAll(".rank-slot, .tier-dropzone").forEach(zone => {
        zone.addEventListener("dragover", e => e.preventDefault());

        zone.addEventListener("drop", e => {
            e.preventDefault();
            const elementId = e.dataTransfer.getData("text/plain");
            const draggedCard = document.getElementById(elementId);
            if (!draggedCard) return;

            if (zone.classList.contains("rank-slot")) {
                const targetCard = zone.querySelector(".drag-item");
                if (targetCard) {
                    const incomingParent = draggedCard.parentElement;
                    incomingParent.appendChild(targetCard);
                }
                zone.appendChild(draggedCard);
            } else {
                zone.appendChild(draggedCard);
            }
        });
    });
});

function attachDragAndDropHandlers(item) {
    item.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", item.id);
        setTimeout(() => item.classList.add("dragging"), 0);
    });

    item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
    });
}
