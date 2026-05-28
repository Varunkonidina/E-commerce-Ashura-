import React, { useState } from "react"
import axios from "axios"
import "./Auth.css"
import { useNavigate } from "react-router-dom"

const Auth = () => {

  const [isLogin, setIsLogin] = useState(true)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    mobile: ""
  })

  const [otp, setOtp] = useState("")

  const [otpSent, setOtpSent] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const sendOtp = async () => {

    try {

      await axios.post(
        "http://localhost:8080/otp/send",
        {
          email: form.email
        }
      )

      alert("OTP Sent Successfully")

      setOtpSent(true)

    } catch (err) {

      console.error(err)

      alert("Failed to send OTP")
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (isLogin) {

        const res = await axios.post(
          "http://localhost:8080/user/login",
          {
            email: form.email,
            password: form.password
          }
        )

        localStorage.setItem(
          "token",
          res.data.token
        )

        localStorage.setItem(
          "role",
          res.data.role
        )

        localStorage.setItem(
          "email",
          res.data.email
        )

        localStorage.setItem(
          "name",
          res.data.name
        )

        navigate("/")

      } else {

        if (!otpSent) {

          alert("Please verify OTP first")

          return
        }

        const otpRes = await axios.post(
          "http://localhost:8080/otp/verify",
          {
            email: form.email,
            otp: otp
          }
        )

        if (
          otpRes.data !== "OTP Verified"
        ) {

          alert("Invalid OTP")

          return
        }

        await axios.post(
          "http://localhost:8080/user/register",
          {
            name: form.name,
            email: form.email,
            password: form.password,
            address: form.address,
            mobile: form.mobile,
            role: "USER"
          }
        )

        alert("Registration Successful")

        setIsLogin(true)

        setOtp("")
        setOtpSent(false)

        setForm({
          name: "",
          email: "",
          password: "",
          address: "",
          mobile: ""
        })
      }

    } catch (err) {

      console.error(err)

      alert("Something went wrong")
    }
  }

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h2>
          {isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>

          {!isLogin && (

            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {!isLogin && (

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "15px"
              }}
            >

              <button
                type="button"
                onClick={sendOtp}
              >
                Send OTP
              </button>

              {otpSent && (

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value)
                  }
                  required
                />
              )}
            </div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">

            {isLogin
              ? "Login"
              : "Sign Up"}

          </button>
        </form>

        <p
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="toggle"
        >

          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}

        </p>
      </div>
    </div>
  )
}

export default Auth