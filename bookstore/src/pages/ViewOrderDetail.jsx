import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useParams } from "react-router-dom";
const ViewOrderPage = () => {
    const [orders, setOrders] = useState([]);

    const params = useParams();
    const firebase = useFirebase();

    useEffect(() => {
        firebase.fetchOrder(params.id).then(res => setOrders(res.docs));
    }, [])

    return (
        <> {
            orders.map(order => {
                const data = order.data();
                return <div className="mt-4 ms-4" style={{ border: '1px solid black', padding: '10px', width: '600px' }}><p><b>Order By:</b>{data.userName}</p>
                    <p><b>Quantity:{data.qty}</b></p>
                    <p><b>userId:</b>{data.userId}</p></div>
            })
        }
        </>
    )
}

export default ViewOrderPage;