
import  * as yup from'yup';

export const registerSchema =yup.object({
    userName:yup.string().required("username is requried").min(3,"must be at least 3 char").max(30,"max is 30 char"),
    email:yup.string().required("email is requried").email(),
   password:yup.string().required("password is requried").min(3,"must be at least 3 char").max(30,"max is 30 char"),
})

export const loginSchema =yup.object({
    email:yup.string().required("email is requried").email(),
   password:yup.string().required("password is requried").min(3,"must be at least 3 char").max(30,"max is 30 char"),
})
export const forgetPasswordSchema = yup.object({
    email: yup.string().email().required("email is requried ").email(),
    password: yup .string().required("password is requried ").min(5, "must be at least 5 char") .max(18, "max is 18 char"),
    code: yup.string().required("code is required ").min(4, "must be at least 4 char").max(4," must be 4 char")
  });