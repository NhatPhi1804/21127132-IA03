import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import illustration from "../../assets/login.png";
import * as yup from "yup";
import { useState } from "react";
import useAuthStore from "../../stores/authStore";
import useMsgStore from "../../stores/msgStore";

type ICreateUserData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .required("Email field is required.")
    .email("Please enter a valid e-mail."),
  password: yup.string().required("Password field is required."),
});

export default function SignIn() {
  const navigate = useNavigate();
  const { login, setEmail } = useAuthStore();
  const { msg, setMsg } = useMsgStore();

  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit: onSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<ICreateUserData>({ resolver: yupResolver(schema) });

  const handleSubmit = async (data: any) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }), // Ensure this matches your DTO
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
      login();
      setEmail(data.email);
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) setErrorMsg(error.message);
    }
  };
  const onHandleSubmit = () => {
    // console.log("Click");
  };

  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <img
        src={illustration}
        alt="left-financial"
        className=" bg-cover w-[30vw] h-[80vh] object-cover"
      />
      <div className="flex w-[30vw] h-[80vh] bg-white justify-center items-center">
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col justify-center outline-none"
        >
          <h1 className="font-bold text-left text-4xl mb-3 text-[#0C0667]">
            Welcome Back
          </h1>
          <p className="mb-20 font-medium text-gray-500">
            Sign in to continue the journey 🚀
          </p>
          {msg && <span className="text-green-500 mb-4">{msg}</span>}
          {errorMsg && <span className="text-red-500 mb-4">{errorMsg}</span>}
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={
              errors.email
                ? "block peer rounded-[5px] w-[25rem]  mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]"
                : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] mt-5 focus:outline-none focus:ring-1"
            }
          />
          <span className="place-self-start text-[14px] text-[#C93B32]">
            {errors.email?.message}
          </span>

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={
              errors.password
                ? "block peer rounded-[5px] w-[25rem] mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]"
                : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] mt-5 focus:outline-none focus:ring-1"
            }
          />
          <span className="place-self-start text-[14px] text-[#C93B32]">
            {errors.password?.message}
          </span>

          <button
            type="submit"
            className={`rounded-md bg-[#362DD2] text-white w-[25rem] p-3 mt-10 hover:bg-[#1A0F9A] mb-5`}
            onClick={onHandleSubmit}
          >
            LOG IN
          </button>
          <div className="flex mt-5">
            <span className="text-gray-500">Don't have an account?</span>
            <Link to="/register" className="hover:underline">
              <p className="text-[#5473E3] ms-1 font-medium mb-5">Sign up</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
