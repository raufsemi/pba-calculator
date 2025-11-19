export function calculatePB(rows, totalPB) {
  if (!rows || rows.length === 0) return 0;

  let totalObtainedMarks = 0;
  let totalFullMarks = 0;

  rows.forEach((row) => {
    const markahDiperolehi =
      parseFloat(row.querySelector(".markah-diperolehi").value) || 0;
    const markahPenuh =
      parseFloat(row.querySelector(".markah-penuh").value) || 0;

    totalObtainedMarks += markahDiperolehi;
    totalFullMarks += markahPenuh;
  });

  if (totalFullMarks === 0) return 0;

  const totalPBObtained = (totalObtainedMarks / totalFullMarks) * totalPB;

  console.log(
    `Total obtained marks: ${totalObtainedMarks}, Total full marks: ${totalFullMarks}, PB: ${totalPBObtained.toFixed(
      2
    )}`
  );

  return totalPBObtained;
}
