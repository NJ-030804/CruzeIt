import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);
  const [isModerator, setIsModerator] = useState(false)
  // Handle Google OAuth token from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleToken = urlParams.get('token');
    
    if (googleToken) {
      console.log('Google token received:', googleToken);
      localStorage.setItem('token', googleToken);
      setToken(googleToken);
      toast.success('Successfully logged in with Google!');
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // check if user is logged in
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        console.log('User fetched successfully:', data.user);
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
        setIsModerator(data.user.role === "moderator");
      } else {
        console.log('Failed to fetch user:', data.message);
        setUser(null);
        setIsOwner(false);
        setIsModerator(false);
      }
    } catch (error) {
      console.error('Fetch user error:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        setIsModerator(false);
      }
    }
  };

  // fetch all cars
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      console.error('Fetch cars error:', error.message);
    }
  };

  // logout
  const logout = async () => {
    try {
      await axios.get("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setIsOwner(false);
      setIsModerator(false);
      delete axios.defaults.headers.common["Authorization"];
      toast.success("Logout successful");
      navigate("/");
    }
  };

  // load token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log('Token found in storage:', storedToken);
      setToken(storedToken);
    }
    fetchCars();
  }, []);

  // fetch user when token is available
  useEffect(() => {
    if (token) {
      console.log('Setting authorization header with token');
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      console.log('No token, removing authorization header');
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    isModerator,  
    setIsModerator,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
