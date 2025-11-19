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
};

function initPopovers(selector = '[data-bs-toggle="popover"]') {
  const popoverTriggerList = document.querySelectorAll(selector);
  popoverTriggerList.forEach((el) => new bootstrap.Popover(el));
}

function setupAddRow() {
  dom.addBtn.addEventListener("click", () => addRow(dom.container));
}

function setupSubmitButton() {
  dom.submitBtn.addEventListener("click", () => {
    const pb = parseFloat(dom.pbInput.value) || 0;
    const fa = parseFloat(dom.paInput.value) || 0;

    dom.errorBox.textContent = "";

    if (pb + fa !== 100) {
      dom.errorBox.textContent = "Pastikan jumlah PB + PA = 100";
      return;
    }

    const rows = dom.container.querySelectorAll(".pb-row");
    if (rows.length === 0) {
      dom.errorBox.textContent = "Add at least one assessment row.";
      return;
    }

    const totalPB = calculatePB(rows, pb);
    const percentage = totalPB.toFixed(2);

    populateGradeTable(totalPB, fa);

    dom.modalPercentage.textContent = `${percentage}/${pb}`;
    const modal = new bootstrap.Modal(dom.resultModal);
    modal.show();
  });
}

function initApp() {
  setupAddRow();
  setupRemoveListener(dom.container);
  initPopovers();
  setupSubmitButton();
}

document.addEventListener("DOMContentLoaded", initApp);
