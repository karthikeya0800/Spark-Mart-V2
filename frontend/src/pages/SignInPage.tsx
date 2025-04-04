import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { Loader } from "lucide-react";
import { setUser } from "../redux/slices/userSlice";

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginFunction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://spark-mart-backend.vercel.app/api/users/login", {
        username: username,
        password: password,
      })
      .then((resp) => {
        setMessage(resp.data.message);
        dispatch(setUser(resp.data.user));
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
        setUsername("");
        setPassword("");
      });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Modal for Messages */}
      {message !== "" && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-background/50 backdrop-blur-sm transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-card text-foreground shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-primary px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <h3
                        className="text-lg font-semibold leading-6 text-primary-foreground"
                        id="modal-title"
                      >
                        {message}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-card px-4 py-3 flex flex-col sm:flex-row sm:justify-center gap-3 sm:px-6">
                  {message.toLowerCase().includes("not registered") && (
                    <Link
                      to="/signup"
                      className="inline-flex w-full justify-center rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-sm hover:bg-secondary/80 sm:w-auto transition"
                    >
                      Register
                    </Link>
                  )}
                  {message.toLowerCase().includes("logged in") ? (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 sm:w-auto transition"
                      onClick={() => {
                        setMessage("");
                        navigate("/");
                      }}
                    >
                      Okay
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground shadow-sm hover:bg-muted/80 sm:w-auto transition"
                      onClick={() => {
                        setMessage("");
                        setIsLoading(false);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="h-screen overflow-hidden flex justify-center items-center">
          <Loader className="animate-spin h-12 w-12 text-primary" />
        </div>
      ) : (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 pt-20">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-16 w-auto bg-primary rounded-sm"
              src="/images/sparkmart-logo.svg"
              alt="Spark Mart Logo"
            />
            <h2 className="text-center mt-6 text-2xl md:text-3xl font-bold leading-9 tracking-tight">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-card py-8 px-6 shadow-lg rounded-lg border border-border">
              <form className="space-y-6" onSubmit={loginFunction}>
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={username}
                      onChange={handleUsername}
                      required
                      className="block w-full rounded-md border border-border p-2.5 text-foreground bg-background shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm sm:leading-6 placeholder:text-muted-foreground"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handlePassword}
                      required
                      className="block w-full rounded-md border border-border p-2.5 text-foreground bg-background shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm sm:leading-6 placeholder:text-muted-foreground"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold leading-6 text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              {/* Sign Up Link */}
              <p className="mt-6 text-center text-sm">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold leading-6 text-primary hover:text-primary/80 transition"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
