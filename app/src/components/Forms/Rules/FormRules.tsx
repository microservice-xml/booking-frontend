import ValidationPatterns from "./ValidationPatterns";

const FormRules = {
  required: {
    required: { value: true, message: "This field is required" },
  },
  name: {
    required: { value: true, message: "Username is required" },
  },
  firstName: {
    required: { value: true, message: "First Name is required" },
  },
  lastName: {
    required: { value: true, message: "Last Name is required" },
  },
  email: {
    required: { value: true, message: "Email is required" },
    pattern: {
      value: ValidationPatterns.EMAIL,
      message: "Please enter valid email: example@gmail.com",
    },
  },
  password: {
    required: { value: true, message: "Password is required" },
    pattern: {
      value: ValidationPatterns.PASSWORD,
      message: "Please enter valid password",
    },
  },
  phoneNumber: {
    required: { value: true, message: "Phone number is required" },
    pattern: {
      value: ValidationPatterns.PHONE,
      message: "Phone number must consist of numbers only",
    },
  },
  passportNumber: {
    required: { value: true, message: "Passport number is required" },
    pattern: {
      value: ValidationPatterns.PHONE,
      message: "Passport number must consist of numbers only",
    },
  },
  jmbg: {
    required: { value: true, message: "Jmbg is required" },
    pattern: {
      value: ValidationPatterns.NUMERIC,
      message: "JMBG must contain only numbers",
    },
    minLength: {
      value: 13,
      message: "JMBG must be 13 characters long",
    },
    maxLength: {
      value: 13,
      message: "JMBG must be 13 characters long",
    },
  },
};

export default FormRules;
