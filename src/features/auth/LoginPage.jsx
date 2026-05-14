import React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { Plane } from "lucide-react"

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulate login
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 p-4"
      >
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Plane className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              OCTFIS
            </CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Let's Fly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="Enter your username" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" required className="h-11" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer text-slate-600">Remember Me</Label>
                </div>
                <Button variant="link" className="text-sm font-medium text-primary hover:underline px-0 h-auto p-0" type="button">
                  Forgot Password?
                </Button>
              </div>
              <Button type="submit" className="w-full h-11 text-base font-semibold shadow-md transition-all hover:shadow-lg mt-6">
                Login
              </Button>
              
              <div className="relative mt-6 mb-4 pt-2">
                <div className="absolute inset-0 flex items-center pt-2">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/80 px-2 text-slate-500 font-semibold tracking-wider">Or continue with</span>
                </div>
              </div>
              
              <Button type="button" variant="outline" className="w-full h-11 bg-white hover:bg-slate-50 border-slate-200 shadow-sm font-semibold text-slate-700 transition-colors" onClick={handleLogin}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="9" height="9" fill="#E21B22"/>
                  <rect x="13" y="3" width="9" height="9" fill="#3D9243"/>
                  <rect x="2" y="13" width="9" height="9" fill="#F89C1E"/>
                  <rect x="13" y="13" width="9" height="9" fill="#0C63A6"/>
                </svg>
                Login with Zoho
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
