function loadStats() {
    const statsTableBody = document.querySelector("#statsTable tbody");
    statsTableBody.innerHTML = "";

    const games = JSON.parse(localStorage.getItem('games'));

    for (const game of games) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${game.email}</td>
            <td>${game.age}</td>
            <td>${game.difficulty}</td>
            <td>${game.faults}</td> <!-- javítva -->
            <td>${game.time}</td>   <!-- javítva -->
            <td>${game.date}</td>
        `;
        statsTableBody.appendChild(row);
    }
}

function filterStats() {
    const emailFilter = document.getElementById("emailFilter").value.toLowerCase();
    const statsTableBody = document.querySelector("#statsTable tbody");
    statsTableBody.innerHTML = "";

    const games = JSON.parse(localStorage.getItem('games'));

    for (const game of games) {
        if (game.email.toLowerCase().includes(emailFilter)) {
            const row = document.createElement("tr");
            row.innerHTML =` 
                <td>${game.email}</td>
                <td>${game.age}</td>
                <td>${game.difficulty}</td>
                <td>${game.faults}</td> <!-- javítva -->
                <td>${game.time}</td>   <!-- javítva -->
                <td>${game.date}</td>
            `;
            statsTableBody.appendChild(row);
        }
    }
}

window.onload = loadStats;