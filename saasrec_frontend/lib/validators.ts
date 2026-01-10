export function isValidPassword(pw: string): boolean {
  // At least 8 chars, at least 1 uppercase, 1 lowercase, 1 digit
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(pw);
}

export function passwordRequirements(pw: string) {
  return {
    length: pw.length >= 8,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    digit: /\d/.test(pw),
  };
}
