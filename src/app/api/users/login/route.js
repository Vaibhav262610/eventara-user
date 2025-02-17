import { connectDb } from '@/db/db';
import User from '@/models/user.models.js';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDb();

export async function POST(request) {
    try {
        // Check if a user is already logged in (i.e., token is present in cookies)
        const token = request.cookies.get('token')?.value;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
                return NextResponse.json(
                    { message: 'USER ALREADY LOGGED IN', success: false },
                    { status: 403 }
                );
            } catch (err) {
                // Token is invalid or expired; continue with login process
            }
        }

        // Parse request body
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: 'USER DOES NOT EXIST' },
                { status: 404 }
            );
        }

        // Validate password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: 'INVALID CREDENTIALS' },
                { status: 401 }
            );
        }

        // Create token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const newToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: '1d',
        });

        // Send response with token in cookies
        return new NextResponse(
            JSON.stringify({
                message: 'LOGGED IN SUCCESS',
                success: true,
            }),
            {
                status: 200,
                headers: {
                    'Set-Cookie': `token=${newToken}; HttpOnly; Path=/; Max-Age=86400; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
