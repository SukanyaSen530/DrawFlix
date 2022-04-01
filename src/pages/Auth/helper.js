export const validateInputs = (values) => {
  const errors = {};

  const pwdRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!values.fullName) {
    errors.fullName = "Full name is required!";
  }

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter a valid email!";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (!pwdRegex.test(values.password.trim())) {
    errors.password =
      "Password must be 6 characters long and contain atleast 1 letter , 1 digit & 1 special character!";
  }

  if (!values.confirmPassword || values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match!";
  }

  return errors;
};

export const testCredentials = {
  email: "test@gmail.com",
  password: "tesT@123",
};

export const initialFormValues = {
  email: "",
  password: "",
  fullName: "",
  confirmPassword: "",
};
