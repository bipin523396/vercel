const API_URL = "https://vercel-r8dliudn8-bipin523396s-projects.vercel.app"; // change to your hosted backend

// Add worker
document.getElementById("workerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const role = document.getElementById("role").value;

  const res = await fetch(`${API_URL}/add-worker`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, role })
  });

  const data = await res.json();
  if (data.success) {
    alert("Worker Added ✅");
    loadWorkers();
  } else {
    alert("Error: " + data.message);
  }
});

// Load workers
async function loadWorkers() {
  const res = await fetch(`${API_URL}/workers`);
  const workers = await res.json();

  const list = document.getElementById("workerList");
  list.innerHTML = "";
  if (Array.isArray(workers)) {
    workers.forEach(w => {
      const li = document.createElement("li");
      li.textContent = `${w.name} (${w.age}) - ${w.role}`;
      list.appendChild(li);
    });
  } else {
    // Show error message if workers is not an array
    const li = document.createElement("li");
    li.textContent = `Error loading workers: ${workers.message || "Unknown error"}`;
    li.style.color = "red";
    list.appendChild(li);
  }
}

// Initial load
loadWorkers();
