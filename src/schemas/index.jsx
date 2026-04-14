import * as Yup from "yup"

export const RegSchemas = Yup.object({
    Name:Yup.string().required("*"),
    Email:Yup.string().email("Invalid email format").required("*"),
    Password:Yup.string().min(4).max(10).required("*")
})

export const LoginSchemas = Yup.object({
     Email:Yup.string().email("Invalid email format").required("*"),
     Password:Yup.string().min(4).required("*")
})

export const TaskSchemas = Yup.object({
    text:Yup.string().required("*"),
    completed:Yup.string().required("*"),
    date:Yup.string().required("*")
})