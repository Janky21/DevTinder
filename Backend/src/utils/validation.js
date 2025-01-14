import validator from "validator";

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Please enter correct email id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

export const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastname",
    "photoUrl",
    "age",
    "gender",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

export const validatePassword = (req) => {
  const allowedFields = ["currentPassword", "password"];

  const isPassAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );

  return isPassAllowed;
};

export default validateSignUpData;
