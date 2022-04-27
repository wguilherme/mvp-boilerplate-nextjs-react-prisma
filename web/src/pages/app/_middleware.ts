import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: 'http://localhost:3002/',
    error: 'http://localhost:3002/',
  }
})