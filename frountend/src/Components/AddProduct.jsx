import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import './AddProduct.css'

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    isTrending: false,
    isLatest: false,
    productType: "",
    brand: "",
    images: [{ file: null, isPrimary: true }]
  })

  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    axios.get("http://localhost:8080/products/categories")
      .then(res => setCategories(res.data))
    axios.get("http://localhost:8080/products/brands")
      .then(res => setBrands(res.data))
  }, [token])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProduct(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleFileChange = (index, e) => {
    const file = e.target.files[0]
    const newImages = [...product.images]
    newImages[index].file = file
    setProduct(prev => ({ ...prev, images: newImages }))
  }

  const addImageField = () => {
    setProduct(prev => ({
      ...prev,
      images: [...prev.images, { file: null, isPrimary: false }]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("name", product.name)
    formData.append("description", product.description)
    formData.append("price", product.price)
    formData.append("categoryId", product.categoryId)
    formData.append("brand", product.brand)
    formData.append("isTrending", product.isTrending.toString())
    formData.append("isLatest", product.isLatest.toString())
    formData.append("productType", product.productType)

    product.images.forEach((img) => {
      if (img.file) {
        formData.append("images", img.file)
        formData.append("isPrimary", img.isPrimary.toString())
      }
    })

    try {
      await axios.post("http://localhost:8080/admin/products/addproduct", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      alert("Product added successfully")
    } catch (err) {
      console.error(err)
      alert("Error adding product")
    }
  }

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>

        <input className="form-input" name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
        <textarea className="form-input" name="description" placeholder="Description" value={product.description} onChange={handleChange} required />

        <input className="form-input" name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} required />

        <select className="form-input" name="categoryId" value={product.categoryId} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select className="form-input" name="brand" value={product.brand} onChange={handleChange} required>
          <option value="">Select Brand</option>
          {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
        </select>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="isTrending" checked={product.isTrending} onChange={handleChange} /> Trending
          </label>
          <label>
            <input type="checkbox" name="isLatest" checked={product.isLatest} onChange={handleChange} /> Latest
          </label>
        </div>

        <input className="form-input" name="productType" placeholder="Product Type" value={product.productType} onChange={handleChange} required />

        <h4>Images</h4>
        <div className="images-section">
          {product.images.map((img, index) => (
            <div className="image-field" key={index}>

              <input
                type="file"
                className="form-input"
                accept="image/*"
                onChange={(e) => handleFileChange(index, e)}
              />

              <label>
                <input
                  type="checkbox"
                  name="isPrimary"
                  checked={img.isPrimary}
                  onChange={(e) => {
                    const newImages = product.images.map((image, i) => ({
                      ...image,
                      isPrimary: i === index ? e.target.checked : false
                    }))
                    setProduct(prev => ({ ...prev, images: newImages }))
                  }}
                /> Primary
              </label>

            </div>
          ))}
        </div>

        <button type="button" className="add-image-btn" onClick={addImageField}>Add Another Image</button>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct