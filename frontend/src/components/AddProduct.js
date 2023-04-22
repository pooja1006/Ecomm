import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  const handleAddProduct = async () =>{
    console.log(!name);
    if(!name || !price || !category || !company){
        setError(true);
        return false;
    }
    console.log(name,price,category,company)
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch('http://localhost:8000/add-product',{
        method: 'post',
        body: JSON.stringify({name,price,userId,category,company}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    if(result){
        navigate("/");
    }
    console.log(result);
  }
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      {error && !name && <span className="invalid-input">Enter valid name</span>}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        onChange={e => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && <span className="invalid-input">Enter valid Price</span>}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        onChange={e => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && <span className="invalid-input">Enter valid category</span>}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        onChange={e => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && <span className="invalid-input">Enter valid company</span>}
      <button className="appbutton" type="button" onClick={handleAddProduct}>
        Add product
      </button>
    </div>
  );
};
export default AddProduct;
