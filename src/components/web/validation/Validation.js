
import  * as yup from'yup';

export const registerSchema =yup.object({
    userName:yup.string().required("username is requried").min(3,"must be at least 3 char").max(30,"max is 30 char"),
    email:yup.string().required("email is requried").email(),
   password:yup.string().required("password is requried").min(3,"must be at least 3 char").max(30,"max is 30 char"),
})