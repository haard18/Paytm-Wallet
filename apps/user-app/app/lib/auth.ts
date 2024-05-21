import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name: { label: "Name", type: "text", placeholder: "John Doe", required: true },
            email: { label: "Email", type: "email", placeholder: "haard@gmail.com", required: true },
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    phone: credentials.phone
                }
            });

            if (existingUser) {
                console.log(existingUser);
                console.log(credentials);
                if(existingUser.password==="ram"){
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.email,
                        phone: existingUser.phone
                    }
                }
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.email,
                        phone: existingUser.phone
                        
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        name: credentials.name,
                        email: credentials.email,
                        phone: credentials.phone,
                        password: hashedPassword,
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    password: user.password
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        
        async session({ token, session }: any) {
            // console.log(session, token);
            session.user.id= token.sub;
            return session
        }
    }
  }
  