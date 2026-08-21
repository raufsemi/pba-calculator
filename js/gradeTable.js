// Grade boundaries
export const gradeBoundaries = [
  { min: 90, max: 100, grade: "A+" },
  { min: 80, max: 89, grade: "A" },
  { min: 75, max: 79, grade: "A-" },
  { min: 70, max: 74, grade: "B+" },
  { min: 65, max: 69, grade: "B" },
  { min: 60, max: 64, grade: "B-" },
];

export function populateGradeTable(totalPB, pa) {
  const gradeTableBody = document.getElementById("gradeTableBody");

  gradeTableBody.innerHTML = "";

  // Make sure the values are valid numbers
  if (!Number.isFinite(totalPB) || !Number.isFinite(pa) || pa <= 0) {
    console.error("Invalid grade table values:", {
      totalPB,
      pa,
    });

    return;
  }

  gradeBoundaries.forEach((grade) => {
    const paNeeded = grade.min - totalPB;

    // Skip grades that cannot be achieved with the available PA marks
    if (paNeeded > pa) {
      return;
    }

    // If PB already satisfies the grade, PA needed is 0
    const marksNeeded = Math.max(0, paNeeded);

    // Convert required PA marks into percentage of PA
    const percentage = ((marksNeeded / pa) * 100).toFixed(1);

    const row = document.createElement("tr");

    // Grade
    const gradeCell = document.createElement("td");
    gradeCell.className = "px-4 py-3";

    const badge = document.createElement("span");

    const badgeClass =
      grade.grade === "A+"
        ? "bg-green-100 text-green-700"
        : grade.grade.startsWith("A")
          ? "bg-yellow-100 text-yellow-700"
          : "bg-blue-100 text-blue-700";

    badge.className = `
      inline-flex
      items-center
      rounded-md
      px-2.5
      py-1
      text-xs
      font-semibold
      ${badgeClass}
    `;

    badge.textContent = grade.grade;

    gradeCell.appendChild(badge);

    // Required percentage
    const requiredCell = document.createElement("td");

    requiredCell.className = "px-4 py-3 font-medium text-gray-700";

    requiredCell.textContent = `${percentage}%`;

    row.appendChild(gradeCell);
    row.appendChild(requiredCell);

    gradeTableBody.appendChild(row);
  });
}
