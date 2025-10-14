import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate, setUser, setIsOwner } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        // Store token - AppContext will automatically fetch user data
        localStorage.setItem("token", data.token);
        setToken(data.token);
        
        setShowLogin(false);
        toast.success(state === "login" ? "Login successful!" : "Account created successfully!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = () => {
    // Close the login modal before redirecting
    setShowLogin(false);
    // Redirect to backend Google OAuth route
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md"
    >
      <AnimatePresence mode="wait">
        <motion.form
          key={state}
          onSubmit={onSubmitHandler}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-600 
                     rounded-3xl shadow-2xl border border-gray-200/60 
                     bg-white/80 backdrop-blur-xl"
        >
          <motion.p
            className="text-2xl font-semibold m-auto text-gray-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-primary">User</span>{" "}
            {state === "login" ? "Login" : "Sign Up"}
          </motion.p>

          {/* Google Login Button */}
          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 
                       hover:border-gray-400 hover:shadow-md transition-all py-2.5 px-4 rounded-xl"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </motion.button>

          {/* Divider */}
          <div className="w-full flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <AnimatePresence>
            {state === "register" && (
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-medium text-gray-700">Name</p>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Type here"
                  className="border border-gray-200 rounded-xl w-full p-2 mt-1 outline-primary bg-white/70 backdrop-blur-sm"
                  type="text"
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full">
            <p className="text-sm font-medium text-gray-700">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Type here"
              className="border border-gray-200 rounded-xl w-full p-2 mt-1 outline-primary bg-white/70 backdrop-blur-sm"
              type="email"
              required
            />
          </div>

          <div className="w-full">
            <p className="text-sm font-medium text-gray-700">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Type here"
              className="border border-gray-200 rounded-xl w-full p-2 mt-1 outline-primary bg-white/70 backdrop-blur-sm"
              type="password"
              required
            />
          </div>

          {state === "register" ? (
            <p className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="text-sm">
              Create an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="bg-primary hover:bg-green-800 transition-all text-white w-full py-2 rounded-xl shadow-md"
          >
            {state === "register" ? "Create Account" : "Login"}
          </motion.button>
        </motion.form>
      </AnimatePresence>
    </div>
  );
};

export default Login;

