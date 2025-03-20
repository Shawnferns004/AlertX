import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError("Verification token missing");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/auth/verify-email?token=${token}`);
        setMessage(response.data.message);
        
        // Start countdown timer
        let count = 3;
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              navigate("/login");
            }
            return prev - 1;
          });
        }, 1000);
      } catch (err) {
        setError(err.response?.data?.error || "Verification failed");
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex bg-gradient-to-br justify-center p-4 from-blue-50 items-center min-h-screen to-purple-50 via-indigo-50">
      <div className="w-full max-w-md">
        {/* Logo/Icon Section */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 h-20 justify-center rounded-full w-20 inline-flex items-center mb-4">
            <Mail className="h-10 text-blue-600 w-10" />
          </div>
          <h1 className="text-4xl text-gray-900 font-bold tracking-tight">
            Email Verification
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 border border-white/20 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="text-center">
            {isLoading ? (
              <div className="flex flex-col gap-6 items-center py-8">
                <Loader2 className="h-16 text-blue-600 w-16 animate-spin" />
                <p className="text-gray-700 text-lg font-medium">Verifying your email...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {message && (
                  <div className="flex flex-col gap-4 items-center py-6">
                    <CheckCircle2 className="h-12 text-green-500 w-12" />
                    <p className="text-green-600 text-xl font-semibold">{message}</p>
                    <p className="text-gray-500">Redirecting to login in {countdown} seconds...</p>
                  </div>
                )}
                {error && (
                  <div className="flex flex-col gap-4 items-center py-6">
                    <XCircle className="h-12 text-red-500 w-12" />
                    <p className="text-red-600 text-xl font-semibold">Verification Failed</p>
                    <p className="text-gray-600">{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>Need help? Contact our support team at</p>
          <a href="mailto:support@example.com" className="text-blue-600 font-medium hover:text-blue-700">
            support@example.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
