// import React from "react";

import { useState } from "react";
import TopCategory from "../Components/UI/TopCategory";
import FLogin from "../assets/FLogin.png";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, db } from "../firebase/firebaseConfig";
import { Zoom, toast } from "react-toastify";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/Features/userSlice";

const SignUpPage = () => {
  const [page, setPage] = useState("signUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setErrors] = useState({});
  let isValid = true;
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkForErrors = () => {
    isValid = true;
    setErrors({});
    if (password.length < 6) {
      setErrors({ ...error, password: "password must be of at least 6 char" });
      isValid = false;
    }
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
      setErrors({ ...error, email: "Email is invalid" });
      isValid = false;
    }
    if (page === "signUp" && !name.trim()) {
      setErrors({ ...error, name: "Name cannot be empty" });
      isValid = false;
    } else if (page === "signUp" && /[^\w\s]/.test(name)) {
      setErrors({ ...error, name: "Name cannot have special characters" });
      isValid = false;
    }
  };
  const handleUserSignUp = async (e) => {
    e.preventDefault();
    checkForErrors();
    if (isValid) {
      try {
        if (page === "signUp") {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential?.user;
          console.log(userCredential.user);
          if (user) {
            const userRef = collection(db, "users");
            // setting the firestore with the information of user
            await setDoc(doc(userRef, user.uid), {
              name: name,
              email: email,
              wishList: [],
              cartItems: [],
              cartLength: 0,
            });
            toast.success("sign up successful now login", { transition: Zoom });
            setPage("login");
          }
        }
        if (page === "login") {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          if (user) {
            fetchUserData(); // after successful login fetching user details from firestore
            toast.success("login Successful", { transition: Zoom });
            localStorage.setItem("token", user.accessToken); // setting the access token to local storage
            localStorage.setItem("uid", user.uid); // setting the user id to local storage
            navigate("/");
          }
        }
      } catch (error) {
        toast.error(`${error.message}`, { transition: Zoom });
      }
    }
  };
  // function to fetch user data from firestore
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data()) {
          dispatch(addUser(docSnap.data()));
        }
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopCategory />
      {page === "signUp" ? (
        <div className="md:w-[60%] mx-auto flex h-[calc(100vw/2.2)] lg:h-[480px] mt-4">
          <div className="bg-fBlue flex flex-col w-[40%] p-6 gap-4">
            <span className="text-white font-medium text-3xl">
              {`Looks like you're new here!`}
            </span>
            <span className="text-gray-300 text-xl">
              Sign up with your Email to get started
            </span>
            <span className="grow"></span>
            <div className="w-full">
              <img src={FLogin} alt="login" className="object-contain" />
            </div>
          </div>
          <div className="w-[60%] flex flex-col bg-white p-10 gap-6">
            {/* <form className="flex flex-col bg-white p-10 gap-6"> */}
            <div className="flex flex-col gap-6">
              <label className="w-full relative ">
                <input
                  type="text"
                  name="name"
                  value={name}
                  required
                  autoFocus={true}
                  onChange={(e) => setName(e?.target?.value)}
                  className="outline-none border-b-[1px] border-gray-300 focus:border-fBlue w-full peer h-6"
                />
                <span className="absolute left-0 top-0 text-base text-gray-400  peer-valid:text-xs peer-valid:-translate-y-3 peer-focus:text-xs peer-focus:-translate-y-3 duration-200">
                  Enter Name
                </span>
                {error && error?.name && (
                  <span className="text-xs text-red-400">{error?.name}</span>
                )}
              </label>
              <label className="w-full relative ">
                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e?.target?.value)}
                  className="outline-none  border-b-[1px] border-gray-300 focus:border-fBlue w-full peer h-6"
                />
                <span className="absolute left-0 top-0 text-base text-gray-400 peer-invalid:text-xs peer-invalid:-translate-y-3 peer-valid:text-xs peer-valid:-translate-y-3 peer-focus:text-xs peer-focus:-translate-y-3 duration-200">
                  Enter Email
                </span>
                {error?.email && (
                  <span className="text-xs text-red-400">{error?.email}</span>
                )}
              </label>
              <label className="w-full relative ">
                <input
                  type="password"
                  name="password"
                  value={password}
                  required
                  placeholder=" "
                  onChange={(e) => setPassword(e?.target?.value)}
                  className="outline-none border-b-[1px] border-gray-300 focus:border-fBlue w-full peer h-6"
                />
                <span className="absolute left-0 top-0 text-base text-gray-400 peer-invalid:text-xs peer-invalid:-translate-y-3 peer-valid:text-xs peer-valid:-translate-y-3 peer-focus:text-xs peer-focus:-translate-y-3 duration-200">
                  Enter password
                </span>
                {error?.password && (
                  <span className="text-xs text-red-400">
                    {error?.password}
                  </span>
                )}
              </label>
            </div>
            <span className="text-xs text-gray-400 ">
              {`By continuing, you agree to Flipkart's`}
              <span className="text-fBlue">Terms of Use</span> and{" "}
              <span className="text-fBlue">Privacy</span>
              Policy.
            </span>
            <button
              className="w-full bg-[#FB641B] text-white font-medium text-lg h-10 rounded-sm"
              onClick={handleUserSignUp}
            >
              CONTINUE
            </button>
            <button
              className="w-full bg-white text-fBlue font-medium text-lg h-10 border-x-2 border-b-2 shadow-md rounded-sm"
              onClick={() => setPage("login")}
            >
              Existing User? Log in
            </button>
            {/* </form> */}
          </div>
        </div>
      ) : (
        <div className="md:w-[60%] mx-auto flex h-[calc(100vw/2.2)] lg:h-[480px] mt-4">
          <div className="bg-fBlue flex flex-col w-[40%] p-6 gap-4">
            <span className="text-white font-medium text-3xl">Login</span>
            <span className="text-gray-300 text-xl">
              Get access to your Orders, Wishlist and Recommendations
            </span>
            <span className="grow"></span>
            <div className="w-full">
              <img src={FLogin} alt="login" className="object-contain" />
            </div>
          </div>
          <div className="w-[60%] flex flex-col bg-white p-10 gap-6">
            <div className="flex flex-col gap-4">
              <label className="w-full relative ">
                <input
                  type="email"
                  value={email}
                  required
                  pattern="/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/"
                  onChange={(e) => setEmail(e?.target?.value)}
                  className="outline-none  border-b-[1px] border-gray-300 focus:border-fBlue w-full peer h-6"
                />
                <span className="absolute left-0 top-0 text-base text-gray-400 peer-invalid:text-xs peer-invalid:-translate-y-3 peer-valid:text-xs peer-valid:-translate-y-3 peer-focus:text-xs peer-focus:-translate-y-3 duration-200">
                  Enter Email
                </span>
                {error?.email && (
                  <span className="text-xs text-red-400">{error?.email}</span>
                )}
              </label>
              <label className="w-full relative ">
                <input
                  type="password"
                  value={password}
                  required
                  minLength={3}
                  maxLength={10}
                  onChange={(e) => setPassword(e?.target?.value)}
                  className="outline-none border-b-[1px] border-gray-300 focus:border-fBlue w-full peer h-6"
                />
                <span className="absolute left-0 top-0 text-base text-gray-400 peer-invalid:text-xs peer-invalid:-translate-y-3 peer-valid:text-xs peer-valid:-translate-y-3 peer-focus:text-xs peer-focus:-translate-y-3 duration-200">
                  Enter password
                </span>
                {error?.password && (
                  <span className="text-xs text-red-400">
                    {error?.password}
                  </span>
                )}
              </label>
            </div>
            <span className="text-xs text-gray-400 ">
              {`By continuing, you agree to Flipkart's`}
              <span className="text-fBlue">Terms of Use</span> and
              <span className="text-fBlue">Privacy</span>
              Policy.
            </span>
            <button
              className="w-full bg-[#FB641B] text-white font-medium text-lg h-10 rounded-sm"
              onClick={handleUserSignUp}
            >
              CONTINUE
            </button>
            <button
              className="w-full bg-white text-fBlue font-medium text-lg h-10 border-x-2 border-b-2 shadow-md rounded-sm"
              onClick={() => setPage("signUp")}
            >
              New to Flipkart? Create an account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
