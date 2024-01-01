import { authMiddleware } from "@clerk/nextjs";
 

 export default authMiddleware({
   publicRoutes: ["/"]                       //set public routes if need
}); 
 
   export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}  