import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/common/Navbar";

import {
  registerUser
} from "../../services/authService";

import { useAuth } from "../../context/AuthContext";


const Register = () => {


  const navigate = useNavigate();

  const { login } = useAuth();



  const [formData,setFormData] = useState({

    name:"",
    email:"",
    password:"",
    password_confirmation:""

  });



  const [error,setError] = useState("");



  const handleChange = (
    e:React.ChangeEvent<HTMLInputElement>
  )=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };



  const handleSubmit = async(
    e:React.FormEvent
  )=>{


    e.preventDefault();


    try{


      const response =
      await registerUser(formData);



      login(

        response.user,

        response.token

      );



      navigate("/");


    }catch(error:any){


      setError(
        error.response?.data?.message ||
        "Registration failed"
      );


    }


  };




  return (

    <>

    <Navbar />


    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      px-5
    ">


      <form

        onSubmit={handleSubmit}

        className="
        bg-white
        p-8
        rounded-xl
        shadow-lg
        w-full
        max-w-md
        "

      >


        <h1 className="
          text-3xl
          font-bold
          mb-6
          text-center
          text-blue-600
        ">
          Create Account
        </h1>



        {
          error &&

          <p className="
          text-red-500
          mb-4
          ">
            {error}
          </p>

        }



        <input

          name="name"

          value={formData.name}

          onChange={handleChange}

          placeholder="Full Name"

          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "

        />



        <input

          name="email"

          type="email"

          value={formData.email}

          onChange={handleChange}

          placeholder="Email"

          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "

        />



        <input

          name="password"

          type="password"

          value={formData.password}

          onChange={handleChange}

          placeholder="Password"

          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "

        />



        <input

          name="password_confirmation"

          type="password"

          value={
            formData.password_confirmation
          }

          onChange={handleChange}

          placeholder="Confirm Password"

          className="
          w-full
          border
          p-3
          rounded
          mb-6
          "

        />



        <button

          type="submit"

          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-lg
          hover:bg-blue-700
          "

        >

          Register

        </button>


      </form>


    </div>


    </>

  );

};


export default Register;