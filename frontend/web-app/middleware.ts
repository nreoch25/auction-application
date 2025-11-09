import { withAuth } from "next-auth/middleware";

const middleware = withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export default middleware;

export const config = {
  matcher: ["/session"],
  pages: {
    signIn: "/api/auth/signin",
  },
};
