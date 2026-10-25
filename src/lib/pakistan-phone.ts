export function normalizePakistanMobile(input: string): string | null {
  const cleaned = input.replace(/[\s-]/g, "");
  const match = /^(?:0|92|\+92)(3[0-9]{9})$/.exec(cleaned);
  return match ? `+92${match[1]}` : null;
}
