import { calculateScaledCA } from "./caCalculator.js";
import { addRow, setupRemoveListener } from "./rowManager.js";

import { populateGradeTable } from "./gradeTable.js";

const submitBtn = document.getElementById("submitBtn");
const container = document.getElementById("marksNeededContainer");
const addBtn = document.getElementById("addMarksNeeded");
const errorBox = document.getElementById("errorBox");

// setup row add/remove
addBtn.addEventListener("click", () => addRow(container));
setupRemoveListener(container);

// handle submit
submitBtn.addEventListener("click", () => {
  const ca = parseFloat(document.getElementById("caMarks").value) || 0;
  const fe = parseFloat(document.getElementById("feMarks").value) || 0;
  errorBox.textContent = "";

  if (ca + fe !== 100) {
    errorBox.textContent = "CA + FE must equal 100.";
    return;
  }

  const rows = container.querySelectorAll(".assessment-row");
  if (rows.length === 0) {
    errorBox.textContent = "Add at least one assessment row.";
    return;
  }

  const totalCAObtained = calculateScaledCA(rows, ca);
  const percentage = `${totalCAObtained.toFixed(2)}`;
  populateGradeTable(totalCAObtained, fe);

  document.getElementById("modalMarks").textContent = `${ca}`;
  document.getElementById(
    "modalPercentage"
  ).textContent = `${percentage}/${ca}`;
  const courseName = document.getElementById("courseName").value.trim();
  document.getElementById("modalCourse").textContent = courseName || "Course";

  const modal = new bootstrap.Modal(document.getElementById("resultModal"));
  modal.show();
});
