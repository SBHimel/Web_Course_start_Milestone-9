"use client";
import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";

const NewProducts = () => {

  const onSubmit = async (event) => {
    // page reload বন্ধ করে
    event.preventDefault();
    // form এর সব data collect করে
    const formData = new FormData(event.target);

    // formData কে object এ convert করে
        // example:
        // {name: "Himel", email: "himel@gmail.com"}
        const newProduct = Object.fromEntries(formData.entries());
        console.log('new user data', newProduct);

         // =========================
        // backend এ POST request
        // =========================

        const req = await fetch('http://localhost:7000/products',{

            // নতুন data create/send করা হচ্ছে
            method: 'POST',

            // backend কে বলা হচ্ছে JSON পাঠানো হচ্ছে
            headers:{
                'Content-Type': 'application/json'
            },

            // object কে JSON string বানানো হচ্ছে
            body: JSON.stringify(newProduct)

        })

          // backend response কে JSON এ convert
        const res = await req.json();

        // যদি successfully user create হয়
        if(res.success){
        alert('product created successfully');
        redirect('/products');
       }
        

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <div className="w-full max-w-md bg-white border shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Add User
        </h2>

        <p className="text-gray-500 mb-6">
          Enter user information below
        </p>

        <Form className="space-y-5" onSubmit={onSubmit}>

          {/* Name */}
          <TextField isRequired name="name">
            <Label className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              placeholder="e.g. John Doe"
              className="mt-1"
            />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField isRequired name="email" type="email">
            <Label className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              placeholder="e.g. john@example.com"
              className="mt-1"
            />
            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">

            <Button
              type="submit"
              className="w-full bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              Save User
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="w-full"
            >
              Reset
            </Button>

          </div>

        </Form>

      </div>

    </div>


  );
};

export default NewProducts;