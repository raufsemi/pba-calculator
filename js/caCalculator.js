export function calculateScaledCA(rows, totalCA) {
  if (!rows || rows.length === 0) return 0;

  const maxPerAssessment = totalCA / rows.length;
  
  let totalObtained = 0;

  rows.forEach((row) => {
    const obtained =
      parseFloat(row.querySelector(".markah-diperolehi").value) || 0;
    const full = parseFloat(row.querySelector(".markah-penuh").value) || 0;
    if (full > 0) totalObtained += (obtained / full) * maxPerAssessment;
  });

  return totalObtained;
}
