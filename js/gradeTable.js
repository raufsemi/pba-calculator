// Grade boundaries
export const gradeBoundaries = [
  { min: 90, max: 100, grade: "A+" },
  { min: 80, max: 89, grade: "A" },
  { min: 75, max: 79, grade: "A-" },
  { min: 70, max: 74, grade: "B+" },
  { min: 65, max: 69, grade: "B" },
  { min: 60, max: 64, grade: "B-" },
];

export function populateGradeTable(totalPB, fe) {
  const gradeTableBody = document.getElementById("gradeTableBody");
  gradeTableBody.innerHTML = "";

  // Filter grades B- and above
  const filteredGrades = gradeBoundaries.filter((g) => g.min >= 60);

  filteredGrades.forEach((g) => {
    const feNeededMin = g.min - totalPB;
    const feNeededMax = g.max - totalPB;

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

    const marksMin = Math.max(0, Number(feNeededMin.toFixed(2)));

    const percMin = Math.max(0, (marksMin / fe) * 100).toFixed(1);
    const percentageTd = document.createElement("td");
    percentageTd.textContent = `${percMin}%`;

    tr.appendChild(gradeTd);
    tr.appendChild(percentageTd);

    gradeTableBody.appendChild(tr);
  });
}
