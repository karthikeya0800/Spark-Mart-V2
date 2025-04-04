import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Loader, Loader2 } from "lucide-react";
import Rating from "@/components/Rating";
import { addToCart, removeFromCart } from "@/redux/slices/userSlice";

interface Product {
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
}

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value);
  const [qtyLoading, setQtyLoading] = useState(false);
  const [product, setProduct] = useState<Product>({} as Product);
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState(
    user.cart.find((item) => item._id === product._id)?.quantity || 0
  );
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://spark-mart-backend.vercel.app/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const addToUserCart = async () => {
    setQtyLoading(true);
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
        setQty(qty + 1);
        return;
      }
    }
  };

  const removeFromUserCart = async () => {
    setQtyLoading(true);
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
        setQty(qty - 1);
        setQtyLoading(false);
        return;
      }
    }
    dispatch(removeFromCart({ ...product, quantity: 1 }));
    setQty(qty - 1);
    setQtyLoading(false);
  };

  return (
    <div className="bg-background text-foreground pt-20 min-h-screen">
      {/* Go Back Link */}
      <div className="ml-4 md:ml-8 mb-6">
        <Link
          to="/"
          className="inline-block text-sm md:text-base bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg hover:bg-primary/80 transition"
        >
          Go Back
        </Link>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="h-[80vh] flex justify-center items-center">
          <Loader className="animate-spin h-12 w-12 text-primary" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 px-6 md:px-20 py-10">
          {/* Product Image and Pricing */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="shadow-lg rounded-lg border border-border overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 md:h-96 object-contain rounded-t-lg"
                />
              </div>
              <div className="mt-6 flex flex-col items-center md:items-start">
                <div className="flex items-center gap-4">
                  <span className="text-3xl text-nowrap md:text-4xl font-bold text-secondary">
                    ₹ {Math.ceil(product.price - product.price / 10)}.00
                  </span>
                  <span className="text-lg text-nowrap line-through text-muted-foreground">
                    ₹ {product.price}
                  </span>
                  <span className="text-sm text-nowrap bg-secondary text-secondary-foreground font-semibold px-3 py-1 rounded-full">
                    10% OFF
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Rating value={product.rating} />
                  <span className="text-sm text-muted-foreground">
                    ({product.numReviews} Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details and Actions */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <div className="w-full max-w-md">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex justify-between items-center border border-border rounded-full overflow-hidden mb-4">
                <button
                  disabled={qty === 0 || qtyLoading || !user._id}
                  onClick={removeFromUserCart}
                  className={`px-4 py-2 text-foreground ${
                    qty === 0 || qtyLoading || !user._id
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
                  {qtyLoading ? (
                    <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                  ) : qty > 0 ? (
                    qty
                  ) : (
                    "Add to Cart"
                  )}
                </div>
                <button
                  disabled={qtyLoading || !user._id}
                  onClick={addToUserCart}
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

              {/* Action Buttons */}
              {user._id ? (
                <Link
                  to="/cart"
                  className="inline-block w-full md:w-auto text-center bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-lg hover:bg-primary/80 transition"
                >
                  Continue to Cart
                </Link>
              ) : (
                <div className="flex flex-col items-center md:items-start gap-2">
                  <p className="text-sm text-destructive font-semibold">
                    *Please login to add products to cart
                  </p>
                  <Link
                    to="/signin"
                    className="inline-block w-full md:w-auto text-center bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-lg hover:bg-primary/80 transition"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;