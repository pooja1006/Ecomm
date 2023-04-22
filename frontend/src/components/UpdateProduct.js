import { useState,useEffect } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import "../App.css";
const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(()=>{
    getproductDetails();
  },[])
  const getproductDetails = async () =>{
    console.log(params);
    let result = await fetch(`http://localhost:8000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
    console.log(result);
  }
  const handleUpdateProduct = async () =>{
    console.log("apple");
    let result = await fetch(`http://localhost:8000/product/${params.id}`,{
        method: 'put',
        body: JSON.stringify({name,price,category,company}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    result = await result.json();
    if(result){
        navigate("/");
    }
    console.log('resut',result);
  }
  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        onChange={e => setPrice(e.target.value)}
        value={price}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        onChange={e => setCategory(e.target.value)}
        value={category}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        onChange={e => setCompany(e.target.value)}
        value={company}
      />
      <button className="appbutton" type="button" onClick={handleUpdateProduct}>
        Update Product
      </button>
    </div>
  );
};
export default UpdateProduct;
