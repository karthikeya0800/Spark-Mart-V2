import React, { RefObject, useEffect } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Rating from "@/components/Rating";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addFetchedProductsToState,
  incrementPageBy,
  decrementPageBy,
  setIsLoading,
} from "../redux/slices/productSlice";

interface HomePageProps {
  homeRef: RefObject<HTMLDivElement>;
  saleRef: RefObject<HTMLDivElement>;
  servicesRef: RefObject<HTMLDivElement>;
  productsRef: RefObject<HTMLDivElement>;
}

const HomePage: React.FC<HomePageProps> = (props) => {
  const { homeRef, saleRef, servicesRef, productsRef } = props;
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const pageNumber = useAppSelector((state) => state.product.pageNo);
  const isLoading = useAppSelector((state) => state.product.isLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await axios.post(
          "https://spark-mart-backend.vercel.app/api/products",
          {
            pageNo: pageNumber,
          }
        );
        if (response.status !== 200) {
          throw new Error(
            `Network response was not 200 instead it was ${response.status}`
          );
        }
        dispatch(addFetchedProductsToState(response.data));
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchData();
  }, [pageNumber]);

  const navigate = useNavigate();

  return (
    <div className="bg-background text-foreground">
      {/* Carousel Section */}
      <div
        ref={homeRef}
        className="pt-16 flex justify-center items-center min-h-[40vh] md:min-h-screen"
      >
        <Carousel className="w-full md:w-9/12 mx-auto">
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card className="border-none bg-card text-card-foreground">
                    <CardContent className="flex items-center justify-center p-6">
                      <div className="w-full md:w-1/2 mb-0">
                        <p className="text-md md:text-4xl font-semibold tracking-wider">
                          Lorem ipsum dolor sit amet consectetur.
                        </p>
                        <Link
                          to="/"
                          className="inline-block uppercase text-sm text-primary-foreground bg-primary font-semibold tracking-wider p-2 md:px-4 md:py-2 mt-5 rounded-sm hover:bg-primary/80 transition"
                        >
                          Shop Product
                        </Link>
                      </div>
                      <div className="w-full md:w-1/2">
                        <img
                          src={`/images/banner-image${index + 1}.jpg`}
                          alt={`banner-image${index + 1}`}
                          className="w-full h-48 md:h-96 object-contain rounded-lg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="bg-primary text-primary-foreground hover:bg-primary/80" />
            <CarouselNext className="bg-primary text-primary-foreground hover:bg-primary/80" />
          </div>
        </Carousel>
      </div>

      {/* Sale Section */}
      <Card
        ref={saleRef}
        className="flex rounded-none flex-row items-center justify-center md:p-10 min-h-[20vh] md:min-h-[70vh]rounded-none"
      >
        <CardContent className="w-full md:w-1/2 text-center md:text-left">
          <div className="text-lg md:text-2xl font-semibold text-secondary">
            10% off
          </div>
          <div className="uppercase text-2xl md:text-6xl font-bold my-4">
            Flash Sale
          </div>
          <div className="hidden md:block text-lg font-mono">
            Unleash productivity, power-packed performance, sleek design – Acer
            laptop, your ultimate tech companion.
          </div>
          <Link
            to="/"
            className="inline-block uppercase text-primary-foreground bg-primary font-semibold tracking-wider px-4 py-2 mt-6 md:mt-10 rounded-sm hover:bg-primary/80 transition"
          >
            Shop Now
          </Link>
        </CardContent>
        <CardContent className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            className="w-full h-48 md:h-96 object-contain rounded-lg"
            src="/images/sale-image.jpg"
            alt="sale-image"
          />
        </CardContent>
      </Card>

      {/* Services Section */}

      <div
        ref={servicesRef}
        className="my-6 py-10 px-6 md:px-16 bg-card"
        id="services"
      >
        <div className="flex justify-center text-2xl md:text-4xl font-bold mb-10 uppercase">
          Our Services
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 inline-block mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              ),
              title: "Free Delivery",
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque ea impedit.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 inline-block mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              ),
              title: "Great Quality",
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque ea impedit.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 inline-block mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6Z"
                  />
                </svg>
              ),
              title: "Daily Offers",
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque ea impedit.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 inline-block mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              ),
              title: "Secure Payment",
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque ea impedit.",
            },
          ].map((service, index) => (
            <div key={index} className="w-full">
              <div className="uppercase mb-2 font-bold text-lg flex items-center">
                {service.icon}
                {service.title}
              </div>
              <div className="pl-10 text-muted-foreground">
                {service.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div
          ref={productsRef}
          className="flex justify-center text-3xl md:text-4xl font-bold my-10 uppercase"
        >
          Latest Products
        </div>
        <div className="flex justify-center items-center">
          {isLoading ? (
            <Loader className="animate-spin h-12 w-12 text-primary" />
          ) : (
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 md:px-10">
                {products.map((product) => (
                  <Card
                    key={product._id}
                    className="bg-card text-card-foreground cursor-pointer border border-border hover:shadow-lg transition-shadow"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <CardHeader>
                      <CardTitle className="mx-auto text-xl text-center text-nowrap">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-48 w-full object-contain rounded-md"
                        />
                      </div>
                      <CardDescription className="text-center mt-4 line-clamp-2">
                        {product.description.split(" ").slice(0, 10).join(" ")}
                        ...
                      </CardDescription>
                    </CardContent>
                    <hr className="my-4 border-t border-border w-[80%] mx-auto" />
                    <CardFooter className="flex-col justify-center space-y-4">
                      <div className="font-bold text-secondary">
                        ₹{product.price}/-
                      </div>
                      <Rating value={product.rating} />
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="pt-10 pb-20 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {pageNumber === 1 ? (
                        <PaginationPrevious className="pointer-events-none opacity-50" />
                      ) : (
                        <PaginationPrevious
                          onClick={() => dispatch(decrementPageBy(1))}
                          className="bg-primary text-primary-foreground hover:bg-primary/80"
                        />
                      )}
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        isActive
                        className="bg-primary text-primary-foreground hover:bg-primary/80"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      {products.length < 12 ? (
                        <PaginationNext className="pointer-events-none opacity-50" />
                      ) : (
                        <PaginationNext
                          onClick={() => dispatch(incrementPageBy(1))}
                          className="bg-primary text-primary-foreground hover:bg-primary/80"
                        />
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
