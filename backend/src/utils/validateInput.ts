export default function validateInput({
  email,
  password,
}: {
  fname: string;
  lname: string;
  email: string;
  password: string;
}) {
  if (!email || !password) {
    return "All fields are required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
}
