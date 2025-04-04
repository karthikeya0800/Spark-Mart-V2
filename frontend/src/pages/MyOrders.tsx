import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { refreshOrders } from "@/redux/slices/userSlice";

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(refreshOrders(user._id));
      setLoading(false);
    };
    fetchOrders();
  }, [dispatch, user._id]);

  return (
    <section className="bg-background text-foreground py-12 md:py-20 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader className="animate-spin h-12 w-12 text-primary" />
        </div>
      ) : (
        <div className="w-full my-6 max-w-6xl mx-auto px-4 md:px-6">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
            My Orders
          </h2>

          {user.orders.length > 0 ? (
            <div>
              {/* Orders Header (Visible on Larger Screens) */}
              <div className="hidden lg:grid grid-cols-5 gap-4 py-4 border-b border-border">
                <div className="col-span-2 text-lg font-semibold">Product</div>
                <div className="text-lg font-semibold text-center">Quantity</div>
                <div className="text-lg font-semibold text-center">Ordered On</div>
                <div className="text-lg font-semibold text-center">Total</div>
              </div>

              {/* Orders List */}
              {user.orders.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col lg:grid lg:grid-cols-5 gap-3 md:gap-4 py-4 md:py-6 border-b border-border"
                >
                  {/* Product Info */}
                  <div className="col-span-2 flex flex-row items-center gap-3 md:gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-2">
                        {product.name}
                      </h5>
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1">
                        ₹ {product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity, Ordered On, Total (Stacked on Small Screens) */}
                  <div className="col-span-3 flex flex-col gap-2 md:gap-3 lg:grid lg:grid-cols-3 lg:gap-4">
                    {/* Quantity */}
                    <div className="flex flex-col items-start lg:items-center justify-center gap-1">
                      <p className="text-xs text-muted-foreground lg:hidden">
                        Quantity
                      </p>
                      <p className="text-sm sm:text-base md:text-lg font-semibold">
                        {product.quantity}
                      </p>
                    </div>

                    {/* Ordered On */}
                    <div className="flex flex-col items-start lg:items-center justify-center gap-1">
                      <p className="text-xs text-muted-foreground lg:hidden">
                        Ordered On
                      </p>
                      <p className="text-sm sm:text-base md:text-lg font-semibold">
                        {product.date}
                      </p>
                    </div>

                    {/* Total */}
                    <div className="flex flex-col items-start lg:items-center justify-center gap-1">
                      <p className="text-xs text-muted-foreground lg:hidden">
                        Total
                      </p>
                      <p className="text-sm sm:text-base md:text-lg font-semibold">
                        ₹ {(product.price * product.quantity + 15).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[60vh]">
              <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="text-5xl sm:text-6xl md:text-7xl">☹️</div>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-destructive text-center">
                  You haven't ordered anything yet
                </p>
                <Link
                  to="/"
                  className="inline-block bg-primary text-primary-foreground font-semibold px-4 sm:px-6 py-2 rounded-lg hover:bg-primary/80 transition"
                >
                  Order Now
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MyOrders;