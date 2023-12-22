import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
// import { Toast } from "react-toastify/dist/components";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SingupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState(false);

  const show= async(e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Name", name);
    console.log("Email", email);
    console.log("passworld", password);
    console.log("confirmpassword", confirmPassword);

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password == confirmPassword) {
      try{ 
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          
        // Signed in
        const user = userCredential.user;
        console.log("User>>> ", user);
        toast.success("User Created!");
        setLoading(false);
        navigate("/dashboard");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        createDoc(user);
            // ...
          }
          catch(error)  {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          };
      } else {
        toast.error("password and confirmpassword must be same!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  function LoginUsingEmailPassword() {
    if (email !== "" && password !== "") {
      setLoading(true);
      console.log("Email>>> ", email);
      console.log("password>>> ", password);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          setLoading(false);
          navigate("/dashboard");
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("Doc Created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists!");
      setLoading(false);
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createDoc(user);
      toast.success("User Authenticated Successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  };

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="signup-heading">
            Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>

          <Input
            placeholder={"vishlbharti@123"}
            label={"Email"}
            type="email"
            state={email}
            setState={setEmail}
          />
          <Input
            placeholder={"password"}
            label={"Password"}
            type={"password"}
            state={password}
            setState={setPassword}
          />

          <Button
            disabled={loading}
            text={loading ? "Loading..." : "Login Using Email"}
            onClick={LoginUsingEmailPassword}
          />
          <p style={{ textAlign: "center", margin: 0 }}>or</p>

          <Button
            onClick={signInWithGoogle}
            disabled={loading}
            text={loading ? "Loading..." : "Login Using Google"}
            blue={true}
          />

          <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
            Or don't have any Account? Click here
          </p>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="signup-heading">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form onSubmit={show}>
          <Input
            placeholder={"John Doe"}
            label={"Full Name"}
            type="text"
            state={name}
            setState={setName}
          />
          <Input
            placeholder={"vishlbharti@123"}
            label={"Email"}
            type="email"
            state={email}
            setState={setEmail}
          />
          <Input
            placeholder={"password"}
            label={"Password"}
            type={"password"}
            state={password}
            setState={setPassword}
          />
          <Input
            placeholder={"confirm-password"}
            label={"Confirm Password"}
            type={"password"}
            state={confirmPassword}
            setState={setConfirmPassword}
          />

          <Button
            disabled={loading}
            text={loading ? "Loading..." : "Sign Up Using Email"}
            type={true}
          />
          </form>
          <p style={{ textAlign: "center", margin: 0 }}>or</p>

          <Button
            onClick={signInWithGoogle}
            disabled={loading}
            text={loading ? "Loading..." : "Sign Up Using Google"}
            blue={true}
          />

          <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
            Or Allready have a Account? Click here
          </p>
        </div>
      )}
    </>
  );
}

export default SingupSigninComponent;
