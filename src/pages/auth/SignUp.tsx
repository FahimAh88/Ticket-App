import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUp() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
      <Card className="w-full max-w-md border-0 shadow-lg bg-card">
        <CardHeader className="space-y-2 text-center pb-8">
          <CardTitle className="text-3xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>Enter your details to sign up for AuraTickets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="firstName">First name</label>
                <Input id="firstName" required />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
                <Input id="lastName" required />
             </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <Input id="password" type="password" required />
          </div>
          <Button className="w-full rounded-md font-semibold mt-6" size="lg">Create account</Button>
        </CardContent>
        <CardFooter className="flex justify-center border-t px-6 py-4 mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link to="/auth/signin" className="font-semibold text-foreground hover:underline">Log in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
