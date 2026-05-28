import React, { useEffect, useState } from "react"
import axios from "axios"
import "./UserProfile.css"
import Header from "./Header"
import Footer from "./Footer"
import { FaUserCircle } from "react-icons/fa"
const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [newAddress, setNewAddress] = useState("")
    const [newMobile, setNewMobile] = useState("")
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get("http://localhost:8080/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setUser(res.data)
                setNewAddress(res.data.address || "")
                setNewMobile(res.data.mobile || "")
            })
            .catch(err => console.error(err))
    }, [])

    const updateAddress = async () => {
        try {
            const res = await axios.put(
                "http://localhost:8080/user/address",
                null,
                {
                    params: { address: newAddress },
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            setUser(res.data)
            alert("Address updated")
        } catch (err) {
            console.error(err)
            alert("Update failed")
        }
    }

    const updateMobile = async () => {
        try {
            const res = await axios.put(
                "http://localhost:8080/user/mobile",
                null,
                {
                    params: { mobile: newMobile },
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            setUser(res.data)
            alert("Mobile updated")
        } catch (err) {
            console.error(err)
            alert("Update failed")
        }
    }

    if (!user) return <p>Loading...</p>

    return (
        <>
            <Header />
            <div style={{ marginTop: "2em", padding: "20px" }}>
                <div className="profile-container">
                    <div className="profile-header">
                        <FaUserCircle className="profile-icon" />
                        <h2>User Profile</h2>
                    </div>

                    <div className="profile-row">
                        <label>Name</label>
                        <div className="profile-value">{user.name}</div>
                    </div>

                    <div className="profile-row">
                        <label>Email</label>
                        <div className="profile-value">{user.email}</div>
                    </div>

                    <div className="profile-section">
                        <label>Mobile</label>
                        <div className="profile-input-group">
                            <input
                                type="text"
                                value={newMobile}
                                onChange={(e) => setNewMobile(e.target.value)}
                            />
                            <button onClick={updateMobile}>Update</button>
                        </div>
                    </div>
                    <div className="profile-section">
                        <label>Address</label>
                        <div className="profile-input-group">
                            <input
                                type="text"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                            />
                            <button onClick={updateAddress}>Update</button>
                        </div>
                    </div>


                </div>

            </div>
            <Footer />
        </>
    )
}

export default UserProfile