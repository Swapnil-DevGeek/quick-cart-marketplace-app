
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  
  const { login, register, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from query string
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo === 'checkout' ? '/checkout' : `/${redirectTo}`);
    }
  }, [isAuthenticated, navigate, redirectTo]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <PageLayout>
      <div className="container max-w-md py-12 px-4">
        <div className="bg-card border rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>
          
          {/* Demo account info */}
          {isLogin && (
            <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
              <p className="mb-2 text-center font-medium">Demo Account</p>
              <p><strong>Email:</strong> demo@example.com</p>
              <p><strong>Password:</strong> password</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
