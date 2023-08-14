import { validUserType } from "../types";

import userTemplateCopy from "../schema/userSchema";

const addUserService = async (user: validUserType) => {
  const resData = await userTemplateCopy.create(user);
  return resData;
};

const isInValid = (data: validUserType) => {
  console.log(data);

  return !(
    data.name &&
    data.mobile_no &&
    data.email &&
    data.password &&
    data.emp_code
  );
};

const checkUser = async (id: String) => {
  const user = await userTemplateCopy.findById(id);
  if (user) return true;
  return false;
};

export { addUserService, isInValid, checkUser };
