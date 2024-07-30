"use client";
import {
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
} from "firebase/auth";
import { auth } from "@/utils/auth";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const router = useRouter();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        e.currentTarget.reset();

        try {
            await setPersistence(auth, browserSessionPersistence);

            await signInWithEmailAndPassword(auth, email, password);

            alert("Signed in successfully! Please click OK to continue.");
            router.push("/accounting");
        } catch (err) {
            console.error("Error signing in: ", err);
        }
    };

    return (
        <>
            <div>
                <h3 className="signin-title">Sign In</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-field-container">
                        <label htmlFor="email">Email：</label>
                        <input type="email" name="email" />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="password">Password：</label>
                        <input type="password" name="password" />
                    </div>
                    <button className="signin-btn" type="submit">
                        SIGN IN
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignIn;
