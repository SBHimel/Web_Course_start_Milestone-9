"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";


import { Card } from '@heroui/react';
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image
        })

        console.log({ data, error });

        if (data) {
            toast.success("Account created successfully 🎉");

            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        }

        if (error) {
            toast.error(error.message || "Signup failed!");
        }

    };

     const handleGoogleSignin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log(data);
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-2 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
                    Create Account
                </h1>

                <p className="text-sm sm:text-base text-gray-500">
                    Start your adventure with Wanderlust ✈️
                </p>
            </div>
            <Card className="border rounded-none"> <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
                <TextField
                    isRequired
                    name="name"
                    type="text"

                >
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    name="image"
                    type="url"

                >
                    <Label>Image URL</Label>
                    <Input placeholder="Image url" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex justify-center gap-2">
                    <Button className={'rounded-none w-full bg-cyan-500'} type="submit">

                        Creat Account
                    </Button>

                </div>
            </Form>
                <div className="flex items-center gap-3 my-4">
                    <Separator className="flex-1" />
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                        Or sign up with
                    </span>
                    <Separator className="flex-1" />
                </div>
                <div>
                    <Button onClick={handleGoogleSignin} variant="outline" className={'w-full rounded-none'}><FcGoogle />  Sign in with Google</Button>
                </div>
            </Card>
        </div>
    );
};

export default SignUpPage;