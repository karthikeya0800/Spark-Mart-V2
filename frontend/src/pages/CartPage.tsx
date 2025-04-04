import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addToCart, clearCart, removeFromCart } from "@/redux/slices/userSlice";

interface CartItem {
  _id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  quantity: number;
}

const CartPage = () => {
  const [qtyLoading, setQtyLoading] = useState(false);
  const [activeProduct, setActiveProduct] = useState<CartItem | null>(null);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.value);
  const cart = useAppSelector((state) => state.user.value.cart);

  const navigate = useNavigate();

  useEffect(() => {
    const calcTotal = () => {
      let temp = cart.reduce((sum, obj) => {
        return sum + (obj.price || 0) * obj.quantity;
      }, 0);
      setTotal(temp);
    };
    if (cart.length !== 0) {
      calcTotal();
    }
  }, [cart, qtyLoading]);

  const placeOrder = async () => {
    await axios.post(
      "https://spark-mart-backend.vercel.app/api/users/addToOrders",
      {
        userId: user._id,
        cart: cart,
      }
    );
    dispatch(clearCart());
    navigate("/myorders");
  };

  const addToUserCart = async (product: CartItem) => {
    setQtyLoading(true);
    setActiveProduct(product);
    const response = await axios.post(
      "https://spark-mart-backend.vercel.app/api/users/addToCart",
      {
        userId: user._id,
        cart: product,
      }
    );
    for (const item of response.data.cart) {
      if (item._id === product._id) {
        dispatch(addToCart(item));
        setQtyLoading(false);
        return;
      }
    }
  };

  const removeFromUserCart = async (product: CartItem) => {
    setQtyLoading(true);
    setActiveProduct(product);
    const response = await axios.post(
      "https://spark-mart-backend.vercel.app/api/users/removeFromCart",
      {
        userId: user._id,
        cart: product,
      }
    );

    for (const item of response.data.cart) {
      if (item._id === product._id) {
        dispatch(removeFromCart(item));
        setQtyLoading(false);
        return;
      }
    }
    dispatch(removeFromCart({ ...product, quantity: 1 }));
    setQtyLoading(false);
  };

  return cart.length !== 0 ? (
    <section className="bg-background text-foreground py-12 md:py-20 min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Shopping Cart
        </h2>

        {/* Cart Items Header (Visible on Larger Screens) */}
        <div className="hidden lg:grid grid-cols-5 gap-4 py-4 border-b border-border">
          <div className="col-span-2 text-lg font-semibold">Product</div>
          <div className="text-lg font-semibold text-center">
            Delivery Charge
          </div>
          <div className="text-lg font-semibold text-center">Quantity</div>
          <div className="text-lg font-semibold text-center">Total</div>
        </div>

        {/* Cart Items */}
        {cart.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-1 lg:grid-cols-5 gap-4 py-6 border-b border-border"
          >
            {/* Product Info */}
            <div className="col-span-2 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h5 className="text-lg md:text-xl font-semibold">
                  {product.name}
                </h5>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  ₹ {product.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Delivery Charge */}
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-lg font-semibold">₹ 15.00</p>
              <p className="text-xs text-muted-foreground lg:hidden">
                (Delivery Charge)
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-center">
              <div className="flex items-center border border-border rounded-full overflow-hidden">
                <button
                  disabled={product.quantity === 0 || qtyLoading || !user._id}
                  onClick={() => removeFromUserCart(product)}
                  className={`px-4 py-2 text-foreground ${
                    product.quantity === 0 || qtyLoading || !user._id
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-muted"
                  } transition`}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 12H6" />
                  </svg>
                </button>
                <div className="px-4 py-2 text-center min-w-[80px] font-semibold text-foreground">
                  {qtyLoading && product._id === activeProduct?._id ? (
                    <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                  ) : (
                    product.quantity || "Add to cart"
                  )}
                </div>
                <button
                  disabled={qtyLoading || !user._id}
                  onClick={() => addToUserCart(product)}
                  className={`px-4 py-2 text-foreground ${
                    qtyLoading || !user._id
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-muted"
                  } transition`}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 6v12M6 12h12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="text-lg font-semibold text-center">
              ₹ {(product.price * product.quantity + 15).toFixed(2)}
            </div>
          </div>
        ))}

        {/* Summary */}
        <div className="bg-card rounded-xl p-6 mt-8 shadow-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-medium">Sub Total</p>
            <p className="text-lg font-semibold">₹ {total.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <p className="text-lg font-medium">Delivery Charge</p>
            <p className="text-lg font-semibold">
              ₹ {(15 * cart.length).toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between pt-4">
            <p className="text-xl font-semibold">Total</p>
            <p className="text-xl font-semibold">
              ₹ {(total + 15 * cart.length).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => placeOrder()}
            className="flex items-center justify-center w-full max-w-xs py-3 px-6 bg-primary text-primary-foreground font-semibold text-lg rounded-lg hover:bg-primary/80 transition"
          >
            Place the Order
            <svg
              className="ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  ) : (
    <div className="flex justify-center items-center h-screen bg-background text-foreground">
      <div className="flex flex-col items-center gap-6">
        <div className="w-[50vh]">
          <img
            src="./images/empty-cart.png"
            alt="Empty Cart"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-xl md:text-2xl font-semibold text-destructive">
          Your Cart is Empty
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-lg hover:bg-primary/80 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
