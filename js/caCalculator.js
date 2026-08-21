export function calculatePB(rows, totalPB) {
  if (!rows?.length) return 0;

  let totalObtainedMarks = 0;
  let totalFullMarks = 0;

  rows.forEach((row) => {
    const obtained =
      parseFloat(row.querySelector(".markah-diperolehi")?.value) || 0;

    const full = parseFloat(row.querySelector(".markah-penuh")?.value) || 0;

    totalObtainedMarks += obtained;
    totalFullMarks += full;
  });

  if (totalFullMarks === 0) return 0;

  return (totalObtainedMarks / totalFullMarks) * totalPB;
}
