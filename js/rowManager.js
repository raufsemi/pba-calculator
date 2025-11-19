export function addRow(container) {
  const row = document.createElement("div");
  row.classList.add("row", "g-2", "align-items-center", "mb-2", "pb-row");

  row.innerHTML = `
    <div class="col-6">
      <input
        type="number"
        class="form-control markah-diperolehi"
        placeholder="Markah diperolehi"
      />
    </div>
    <div class="col-6 d-flex">
      <input
        type="number"
        class="form-control me-2 markah-penuh"
        placeholder="Markah Penuh"
      />
      <button type="button" class="btn btn-outline-secondary remove-btn">
        Remove
      </button>
    </div>
  `;

  container.appendChild(row);
}

export function setupRemoveListener(container) {
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      e.target.closest(".pb-row").remove(); // works with pb-row
    }
  });
}
