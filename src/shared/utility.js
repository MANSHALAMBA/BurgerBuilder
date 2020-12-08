function phonenumber(pnumber) {
  var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  if (pnumber.match(phoneno)) return true;

  return false;
}

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  return false;
}

export const checkValidity = (value, rules) => {
  // rules --> isRequired, minLength ,maxLength, phoneNumber , email
  let valid = true;
  let message = "";

  if (rules.isRequired) {
    valid = value.trim() && valid;
    if (!valid) {
      message = "is Required";
      return [valid, message];
    }
  }

  if (rules.minLength) {
    valid = value.length >= rules.minLength && valid;
    if (!valid) {
      message = "should be longer";
      return [valid, message];
    }
  }
  if (rules.maxLength) {
    valid = value.length <= rules.maxLength && valid;
    if (!valid) {
      message = "exceeds the maximum length";
      return [valid, message];
    }
  }
  if (rules.phoneNumber) {
    valid = phonenumber(value) && valid;
    if (!valid) {
      message = "is not a valid phone number";
      return [valid, message];
    }
  }

  if (rules.email) {
    valid = ValidateEmail(value) && valid;
    if (!valid) {
      message = "is not a valid email";
      return [valid, message];
    }
  }
  return [valid, message];
};
