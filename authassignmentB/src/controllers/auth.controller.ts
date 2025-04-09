import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";

export const signup: RequestHandler = async (req, res) => {
	try {
		const { email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: { email, password: hashedPassword },
		});
		res.status(201).json({ message: "User created", user });
	} catch (err) {
		res.status(500).json({ error: "Signup failed" });
	}
};

export const login: RequestHandler = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			res.status(401).json({ error: "User not found" });
			return;
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET as string,
			{ expiresIn: "1h" }
		);

		res.status(200).json({ token });
	} catch (err) {
		res.status(500).json({ error: "Login failed" });
	}
};
