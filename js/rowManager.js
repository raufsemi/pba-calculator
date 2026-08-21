export function addRow(container) {
  const row = document.createElement("div");

  row.className = "pb-row grid grid-cols-[1fr_1fr_auto] gap-3 items-center";

  row.innerHTML = `
    <input
      type="number"
      min="0"
      step="0.01"
      inputmode="decimal"
      class="markah-diperolehi block w-full rounded-[var(--field-radius)] border border-[var(--border)] bg-[var(--field-background)] px-4 py-3 text-sm text-[var(--field-foreground)] outline-none transition placeholder:text-[var(--field-placeholder)] hover:border-[var(--separator)] focus:border-[var(--focus)] focus:ring-4 focus:ring-[var(--focus)]/10"
      placeholder="Diperolehi"
    />

    <input
      type="number"
      min="0"
      step="0.01"
      inputmode="decimal"
      class="markah-penuh block w-full rounded-[var(--field-radius)] border border-[var(--border)] bg-[var(--field-background)] px-4 py-3 text-sm text-[var(--field-foreground)] outline-none transition placeholder:text-[var(--field-placeholder)] hover:border-[var(--separator)] focus:border-[var(--focus)] focus:ring-4 focus:ring-[var(--focus)]/10"
      placeholder="Markah penuh"
    />

    <button
      type="button"
      class="remove-btn rounded-[var(--field-radius)] border border-[var(--border)] bg-[var(--default)] px-3 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--danger)]/10 hover:text-[var(--danger)]"
      aria-label="Buang penilaian"
    >
      ×
    </button>
  `;

  container.appendChild(row);
}

export function setupRemoveListener(container) {
  container.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-btn");

    if (!button) return;

    const row = button.closest(".pb-row");

    if (row) {
      row.remove();
    }
  });
}
