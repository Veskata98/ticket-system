import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const encrypt = async (payload: any) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1 day')
        .sign(secret);
};

export const decrypt = async (jwt: any) => {
    return await jwtVerify(jwt, secret, { algorithms: ['HS256'] });
};

export const signIn = async ({ username, password }: { username: string; password: string }) => {
    // console.log(username, password);

    const jwt = new SignJWT().setProtectedHeader({ alg: 'HS256' });
    // console.log(jwt);

    cookies().set('cookie', JSON.stringify({ username, password }), { httpOnly: true });
};
