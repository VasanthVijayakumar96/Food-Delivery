import { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from "react-toastify";

const Verify = () => {
    const [searchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const {url} =useContext(StoreContext);
    const navigate= useNavigate();

    const verifyPayment=async()=>{
        const response= await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders");
            toast.success("Order Placed Successfully");
        }else{
            toast.error("Something went wrong");
            navigate("/");
        }
    }
    useEffect(()=>{
        verifyPayment();
        // verifyPayment is excluded from deps intentionally: it is called once
        // on mount to verify the payment redirect and should not re-run.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify
