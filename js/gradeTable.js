// Grade boundaries
export const gradeBoundaries = [
  { min: 90, max: 100, grade: "A+" },
  { min: 80, max: 89, grade: "A" },
  { min: 75, max: 79, grade: "A-" },
  { min: 70, max: 74, grade: "B+" },
  { min: 65, max: 69, grade: "B" },
  { min: 60, max: 64, grade: "B-" },
  { min: 55, max: 59, grade: "C+" },
  { min: 50, max: 54, grade: "C" },
  { min: 47, max: 49, grade: "C-" },
  { min: 44, max: 46, grade: "D+" },
  { min: 40, max: 43, grade: "D" },
  { min: 30, max: 39, grade: "E" },
  { min: 20, max: 29, grade: "E-" },
  { min: 0, max: 19, grade: "F" },
];

export function populateGradeTable(totalCA, fe) {
  const gradeTableBody = document.getElementById("gradeTableBody");
  gradeTableBody.innerHTML = "";

  // Filter grades B- and above
  const filteredGrades = gradeBoundaries.filter((g) => g.min >= 60);

  filteredGrades.forEach((g) => {
    const feNeededMin = g.min - totalCA;
    const feNeededMax = g.max - totalCA;

    // Skip impossible grades
    if (feNeededMin > fe) return;

    const tr = document.createElement("tr");

    // Grade badge
    const gradeTd = document.createElement("td");
    gradeTd.innerHTML = `<span class="badge ${
      g.grade === "A+"
        ? "bg-success"
        : g.grade.startsWith("A")
        ? "bg-warning text-dark"
        : "bg-info text-dark"
    }">${g.grade}</span>`;

    // Marks needed (cap max at available FE)
    const marksMin = Math.max(0, feNeededMin.toFixed(2));
    const marksMax = Math.min(feNeededMax, fe).toFixed(2);
    const marksTd = document.createElement("td");
    marksTd.textContent = `${marksMin} - ${marksMax}`;

    // Percentage needed (cap max at 100%)
    const percMin = Math.max(0, (marksMin / fe) * 100).toFixed(1);
    const percMax = Math.min(100, (marksMax / fe) * 100).toFixed(1);
    const percentageTd = document.createElement("td");
    percentageTd.textContent = `${percMin}% - ${percMax}%`;

    tr.appendChild(gradeTd);
    tr.appendChild(marksTd);
    tr.appendChild(percentageTd);

    gradeTableBody.appendChild(tr);
  });
}
