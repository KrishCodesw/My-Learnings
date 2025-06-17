import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'


const authOptions={
    providers:[
        GithubProvider({
            clientId:"dkj3wdj",
            clientSecret:"imnwd"
        }),
        GoogleProvider({
             clientId:"dkj3wdj",
            clientSecret:"imnwd"
        })
    ],
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };