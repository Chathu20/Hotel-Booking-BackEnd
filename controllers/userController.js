import User from '../models/user.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function postUsers(req, res) {
    try {
        const user = req.body;

        const password = user.password;

        const passwordHash = bcrypt.hashSync(password, 10);
        user.password = passwordHash;

        const newUser = new User(user);

        newUser.save()
            .then(() => {
                res.json({
                    message: "User created successfully"
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: "User creation failed",
                    error: error.message
                });
            });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

export function loginUser(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email })
        .then((user) => {
            if (user == null) {
                return res.status(403).json({
                    message: "User not found"
                });
            }

            const isPasswordCorrect = bcrypt.compareSync(
                credentials.password,
                user.password
            );

            if (!isPasswordCorrect) {
                return res.status(403).json({
                    message: "Invalid password"
                });
            }

            const payload = {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                type: user.type,
            };

            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "48h" });

            res.json({
                message: "Login successful",
                user: user,
                token: token
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Login failed",
                error: error.message
            });
        });
} 