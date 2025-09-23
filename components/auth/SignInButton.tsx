"use server";

import { signIn } from "@/auth";
async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const response = await signIn("credentials", {
                ...Object.fromEntries(formData),
                redirect: false,
            });

            if (response?.error) {
                console.log("Invalid credentials");
                return;
            }

            // router.push("/");
            // router.refresh();
        } catch (error) {
            // setError("An error occurred during login");
            console.error("Login error:", error);
        }
    }

export default function SignInButton() 