import * as React from "react";
import { useForm } from "react-hook-form";


export default function App() {
  type FormValues = {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    developer: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  console.log("errors", errors);

  return (

    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >

      <label htmlFor="firstName">*First Name:</label>
      <input
        {...register("firstName", { required: "First name is required" })}
        id="firstName"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label htmlFor="lastName">*Last Name:</label>
      <input
        {...register("lastName", {
          required: "Last name is required",
          pattern: { value: /^[a-zA-Z\s]{3,30}$/, message: "silly buggers" },
          maxLength: { value: 30, message: "Last name must be 30 characters or less" }
        })}
        id="lastName"
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <label htmlFor="age">*Age</label>
      <input
        type="number"
        {...register("age", {
          required: "Age is required",
          max: { value: 120, message: "that's very old" },
          min: { value: 18, message: "that's very young" },
          valueAsNumber: true
        })}
        id="age"
      />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="gender">Gender</label>
      <select {...register("gender")} id="gender">
        <option value="">Select...</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>

      <label htmlFor="developer">Are you a developer?</label>
      <input {...register("developer")} value="yes" type="checkbox" />

      <input type="submit" />
    </form>
  );
}