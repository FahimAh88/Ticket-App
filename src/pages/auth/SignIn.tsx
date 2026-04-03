import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignIn() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
      <Card className="w-full max-w-md border-0 shadow-lg bg-card">
        <CardHeader className="space-y-2 text-center pb-8">
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <Link to="/auth/forgot" className="text-sm text-muted-foreground hover:text-foreground">Forgot password?</Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button className="w-full rounded-md font-semibold mt-6" size="lg">Log in</Button>
        </CardContent>
        <CardFooter className="flex justify-center border-t px-6 py-4 mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <Link to="/auth/signup" className="font-semibold text-foreground hover:underline">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
