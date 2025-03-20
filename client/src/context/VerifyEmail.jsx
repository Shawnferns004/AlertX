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
        const response = await axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Icon Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
            <Mail className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Email Verification
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-white/20">
          <div className="text-center">
            {isLoading ? (
              <div className="flex flex-col items-center gap-6 py-8">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                <p className="text-lg font-medium text-gray-700">Verifying your email...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {message && (
                  <div className="flex flex-col items-center gap-4 py-6">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                    <p className="text-green-600 text-xl font-semibold">{message}</p>
                    <p className="text-gray-500">Redirecting to login in {countdown} seconds...</p>
                  </div>
                )}
                {error && (
                  <div className="flex flex-col items-center gap-4 py-6">
                    <XCircle className="w-12 h-12 text-red-500" />
                    <p className="text-red-600 text-xl font-semibold">Verification Failed</p>
                    <p className="text-gray-600">{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at</p>
          <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700 font-medium">
            support@example.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
