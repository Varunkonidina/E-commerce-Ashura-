import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import AshuraLogo from '../assets/AshuraLogo.png'
import axios from 'axios'
import SearchResults from './SearchResults'

const Header = () => {
  const [types, setTypes] = useState({})
  const [openCategory, setOpenCategory] = useState(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const navigate = useNavigate()
  const headerRef = useRef(null)
  const role = localStorage.getItem("role")

  const categories = [
    { id: 1, name: "Men" },
    { id: 2, name: "Kids" },
    { id: 3, name: "Watches" },
    { id: 4, name: "Shoes" }
  ]

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const fetchTypes = async (categoryId) => {
    if (types[categoryId]) return
    try {
      const res = await axios.get(
        `http://localhost:8080/products/types-by-category/${categoryId}`
      )
      setTypes(prev => ({ ...prev, [categoryId]: res.data }))
    } catch (err) {
      console.error(err)
    }
  }

  const handleTypeClick = (categoryId, type) => {
    navigate(`/products/${categoryId}/${encodeURIComponent(type)}`)
    setOpenCategory(null)
  }

  const toggleCategory = (categoryId) => {
    if (openCategory === categoryId) {
      setOpenCategory(null)
    } else {
      setOpenCategory(categoryId)
      fetchTypes(categoryId)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setIsLoggedIn(false)
    navigate('/login')
  }

  const handleSearchChange = async (e) => {
    const value = e.target.value
    setSearch(value)

    if (value.length < 2) {
      setSuggestions([])
      return
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/products/search-suggestions?query=${value}`
      )
      setSuggestions(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!search.trim()) return
    setSuggestions([])
    navigate(`/products/search?search=${encodeURIComponent(search)}`)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenCategory(null)
        setUserDropdownOpen(false)
        setSuggestions([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={headerRef}>
      <div className="Header">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">

            <img src={AshuraLogo} alt="Logo" height="40" />
            <div style={{justifyContent:"center"}}> 
            <h1>ASHURA</h1>
            <p style={{fontWeight:"700"}}>HONOR & CRAFT</p>
            </div>

            {categories.map((cat) => (
              <div className="btn-group nav-hover" key={cat.id}>
                <button
                  type="button"
                  className="btn nav-btn"
                  onMouseEnter={() => fetchTypes(cat.id)}
                  onClick={() => toggleCategory(cat.id)}
                >
                  {cat.name}
                </button>

                <ul className={`dropdown-menu ${openCategory === cat.id ? 'show' : ''}`}>
                  {(types[cat.id] || []).map((type, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handleTypeClick(cat.id, type)
                        }}
                      >
                        {type}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <form className="d-flex position-relative" style={{alignSelf:"center"}}onSubmit={handleSearchSubmit}>
              <input
                className="form-control mt-3"
                type="search"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" style={{height:"50px",alignSelf:"center"}} type="submit">
                Search
              </button>

              {suggestions.length > 0 && (
                <ul className="search-dropdown">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setSearch(s)
                        setSuggestions([])
                        navigate(`/products/search?search=${encodeURIComponent(s)}`)
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </form>

            <div className="d-flex align-items-center gap-4 ms-3">
              <FaHeart
                className="icons"
                size={22}
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/favorites')}
              />

              <FaShoppingCart
                className="icons"
                size={22}
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/cart')}
              />

              <div style={{ position: "relative" }}>
                <FaUser
                  className="icons"
                  size={22}
                  style={{ cursor: "pointer" }}
                  onClick={() => setUserDropdownOpen(prev => !prev)}
                />

                {userDropdownOpen && (
                  <ul
                    className="dropdown-menu show"
                    style={{ position: "absolute", right: 0, top: "30px" }}
                  >
                    {!isLoggedIn && (
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            navigate('/login')
                          }}
                        >
                          Login
                        </a>
                      </li>
                    )}

                    {isLoggedIn && (
                      <>
                        {role === "ADMIN" && (
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                navigate('/admin/products')
                              }}
                            >
                              Admin Dashboard
                            </a>
                          </li>
                        )}

                        {role !== "ADMIN" && (
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                navigate('/profile')
                              }}
                            >
                              Profile
                            </a>
                          </li>
                        )}

                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (role === "ADMIN") {
                                navigate('/admin/orders')
                              } else {
                                navigate('/orders')
                              }
                            }}
                          >
                            Orders
                          </a>
                        </li>

                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              handleLogout()
                            }}
                          >
                            Logout
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </div>
            </div>

          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header