import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../api/auth";
import "../styles/LoginForm.css";

const loginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema
	.extend({
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type LoginInputs = z.infer<typeof loginSchema>;
type SignupInputs = z.infer<typeof signupSchema>;

const LoginForm: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<any>({
		resolver: zodResolver(isLogin ? loginSchema : signupSchema),
	});

	const mutation = useMutation({
		mutationFn: async (data: LoginInputs | SignupInputs) => {
			if (isLogin) {
				return await login(data);
			} else {
				return await signup(data);
			}
		},
		onSuccess: (data) => {
			alert(`${isLogin ? "Login" : "Signup"} successful `);
			if (data.token) {
				localStorage.setItem("token", data.token);
			}
			reset();
		},
		onError: (error: any) => {
			alert(error.response?.data?.error || "Something went wrong ");
		},
	});

	const onSubmit = (data: any) => {
		const payload =
			isLogin ?
				{ email: data.email, password: data.password }
			:	{ email: data.email, password: data.password };

		mutation.mutate(payload);
	};

	return (
		<div className='auth-wrapper'>
			<div className='toggle-buttons'>
				<button
					onClick={() => setIsLogin(true)}
					className={isLogin ? "active" : ""}>
					Login
				</button>
				<button
					onClick={() => setIsLogin(false)}
					className={!isLogin ? "active" : ""}>
					Signup
				</button>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='auth-form'>
				<h2 className='loginSigntext'>{isLogin ? "Login" : "Signup"}</h2>

				<input
					type='email'
					placeholder='Email'
					{...register("email")}
				/>
				<p>{(errors as any).email?.message}</p>

				<input
					type='password'
					placeholder='Password'
					{...register("password")}
				/>
				<p>{(errors as any).password?.message}</p>

				{!isLogin && (
					<>
						<input
							type='password'
							placeholder='Confirm Password'
							{...register("confirmPassword")}
						/>
						<p>{(errors as any).confirmPassword?.message}</p>
					</>
				)}

				<button
					type='submit'
					disabled={mutation.isPending}>
					{mutation.isPending ?
						isLogin ?
							"Logging in..."
						:	"Signing up..."
					: isLogin ?
						"Login"
					:	"Sign Up"}
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
