export const rules = [
  {
    label: "At least 6 characters",
    test: (val: string) => val.length >= 6,
  },
  {
    label: "At least one uppercase letter",
    test: (val: string) => /[A-Z]/.test(val),
  },
  {
    label: "At least one lowercase letter",
    test: (val: string) => /[a-z]/.test(val),
  },
  {
    label: "At least one number",
    test: (val: string) => /[0-9]/.test(val),
  },
  {
    label: "At least one special character",
    test: (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
  },
];
