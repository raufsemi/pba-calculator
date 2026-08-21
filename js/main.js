import { calculatePB } from "./caCalculator.js";
import { addRow, setupRemoveListener } from "./rowManager.js";
import { populateGradeTable } from "./gradeTable.js";

const dom = {
  submitBtn: document.getElementById("submitBtn"),
  container: document.getElementById("marksNeededContainer"),
  addBtn: document.getElementById("addMarksNeeded"),
  errorBox: document.getElementById("errorBox"),
  pbInput: document.getElementById("pbMarks"),
  paInput: document.getElementById("paMarks"),
  modalPercentage: document.getElementById("modalPercentage"),
  resultModal: document.getElementById("resultModal"),
  closeResultModal: document.getElementById("closeResultModal"),
  closeResultModalFooter: document.getElementById("closeResultModalFooter"),
  currentYear: document.getElementById("currentYear"),
};

function openModal() {
  dom.resultModal.classList.remove("hidden");
  dom.resultModal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeModal() {
  dom.resultModal.classList.add("hidden");
  dom.resultModal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}

function setupModal() {
  dom.closeResultModal.addEventListener("click", closeModal);

  dom.closeResultModalFooter.addEventListener("click", closeModal);

  dom.resultModal.addEventListener("click", (event) => {
    if (event.target === dom.resultModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function setupAddRow() {
  dom.addBtn.addEventListener("click", () => {
    addRow(dom.container);
  });
}

function setupSubmitButton() {
  dom.submitBtn.addEventListener("click", () => {
    const pb = parseFloat(dom.pbInput.value);
    const pa = parseFloat(dom.paInput.value);

    dom.errorBox.textContent = "";

    if (!Number.isFinite(pb) || !Number.isFinite(pa)) {
      dom.errorBox.textContent = "Masukkan jumlah PB dan PA.";
      return;
    }

    if (pb + pa !== 100) {
      dom.errorBox.textContent = "Pastikan jumlah PB + PA = 100";
      return;
    }

    const rows = dom.container.querySelectorAll(".pb-row");

    if (rows.length === 0) {
      dom.errorBox.textContent = "Tambah sekurang-kurangnya satu penilaian.";
      return;
    }

    const totalPB = calculatePB(rows, pb);

    if (!Number.isFinite(totalPB)) {
      dom.errorBox.textContent = "Markah PB tidak sah.";
      return;
    }

    const percentage = totalPB.toFixed(2);

    populateGradeTable(totalPB, pa);

    dom.modalPercentage.textContent = `${percentage}/${pb}`;

    openModal();
  });
}

function initApp() {
  dom.currentYear.textContent = new Date().getFullYear();

  setupAddRow();
  setupRemoveListener(dom.container);
  setupModal();
  setupSubmitButton();
}

document.addEventListener("DOMContentLoaded", initApp);
