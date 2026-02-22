import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsLoading(false);
    toast.success('Password reset link sent!');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-grid-white py-20 px-4">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.22) 0%, rgba(0,0,0,0) 65%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan" />
            </div>
            <span className="text-2xl font-bold text-white">AdBlock Pro</span>
          </Link>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl border border-white/10 bg-navy-200/90 backdrop-blur-xl shadow-card">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">Forgot password?</h1>
                <p className="text-text-secondary">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-navy-100/50 border-white/10 text-white placeholder:text-text-secondary focus:border-cyan focus:ring-cyan/20 rounded-xl h-12"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-cyan hover:bg-cyan-600 text-navy font-semibold rounded-xl h-12 transition-all duration-300 hover:shadow-glow"
                >
                  {isLoading ? 'Sending...' : 'Send reset link'}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-cyan/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-cyan" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Check your email</h2>
              <p className="text-text-secondary mb-6">
                We've sent a password reset link to <strong className="text-white">{email}</strong>
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 rounded-xl"
              >
                Didn't receive it? Try again
              </Button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-white/10">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-text-secondary hover:text-cyan transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
