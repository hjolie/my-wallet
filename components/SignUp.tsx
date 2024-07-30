"use client";
import {
    createUserWithEmailAndPassword,
    setPersistence,
    inMemoryPersistence,
} from "firebase/auth";
import { auth } from "@/utils/auth";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const router = useRouter();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        e.currentTarget.reset();

        try {
            await setPersistence(auth, inMemoryPersistence);

            await createUserWithEmailAndPassword(auth, email, password);

            alert("Signed up successfully! Please sign in to continue.");
            router.push("/");
        } catch (err) {
            console.error("Error signing up: ", err);
        }
    };

    return (
        <>
            <div>
                <h3 className="signup-title">Sign Up</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-field-container">
                        <label htmlFor="email">Email：</label>
                        <input type="email" name="email" />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="password">Password：</label>
                        <input type="password" name="password" />
                    </div>
                    <button className="signup-btn" type="submit">
                        SIGN UP
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignUp;
