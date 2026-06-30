document.addEventListener('DOMContentLoaded', () => {
    // 1. GENERATE THE 1-20 RANKS GRID SLOTS AUTOMATICALLY
    const ranksContainer = document.getElementById('ranks-container');
    if (ranksContainer) {
        for (let i = 1; i <= 20; i++) {
            const card = document.createElement('div');
            card.className = 'rank-card';
            card.innerHTML = `
                <div class="rank-number">#${i}</div>
                <div class="rank-slot" id="rank-slot-${i}"></div>
            `;
            ranksContainer.appendChild(card);
        }
    }

    // 2. DRAG AND DROP ENGINE SETUP
    setupDragAndDrop();
});

// NAVIGATION MENU SWITCH TAB MECHANICAL LOGIC
function switchTab(tabName) {
    // Remove active statuses from pages and buttons
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active-page'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    // Activate the page and button the user clicked
    document.getElementById(`${tabName}-page`).classList.add('active-page');
    
    // Highlight the active button
    const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(btn => btn.innerText.toLowerCase().includes(tabName));
    if (activeBtn) activeBtn.classList.add('active');
}

// THE ENGINE BEHIND MOVING CARDS
function setupDragAndDrop() {
    const items = document.querySelectorAll('.drag-item');
    const dropzones = document.querySelectorAll('.tier-dropzone, .rank-slot, .item-bank');

    items.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.id);
        });
    });

    dropzones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Tells browser it's legal to drop items here
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(id);
            
            if (draggedElement) {
                // If dropping into a 1-20 Rank Card slot, limit it to 1 player per spot
                if (zone.classList.contains('rank-slot') && zone.children.length > 0) {
                    alert("This rank spot is occupied! Move that player out first.");
                    return;
                }
                zone.appendChild(draggedElement);
            }
        });
    });
}
