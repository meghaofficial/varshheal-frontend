import { useSearchParams } from "react-router-dom";

const OrderDetails = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const itemId = searchParams.get("item_id");

  return <div>order details</div>;
};

export default OrderDetails;
