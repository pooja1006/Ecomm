
import '../App.css';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'

const ProductList = () =>{
    const [product,setProduct] = useState([])
    useEffect(()=>{
        getProducts();
    },[])
    const getProducts = async () =>{
        let result = await fetch('http://localhost:8000/products');
        result = await result.json() //to covert it in json
        setProduct(result);
    }
    const handleDeleteProduct = async (id) =>{
        console.log(id);
        let result = await fetch(`http://localhost:8000/product/${id}`,{
            method: 'delete'
        })
        result = await result.json();
        console.log('result',result);
        if(result){
            getProducts();
        }
    }
    return(
        <div className='product-list'> 
            <h3>Product list</h3>
            <ul>
                <li>S No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                product.map((item,index) =>
                    <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li><button onClick={()=> handleDeleteProduct(item._id)}>Delete</button>
                        <Link to ={"/update/"+item._id}>Update</Link>
                    </li>
                </ul>
                )
            }
        </div>
    )
}
export default ProductList;