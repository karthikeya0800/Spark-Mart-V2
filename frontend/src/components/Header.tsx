import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefObject } from "react";
import { setUser } from "@/redux/slices/userSlice";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faRightToBracket,
  faShoppingCart,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface HeaderProps {
  homeRef: RefObject<HTMLDivElement>;
  saleRef: RefObject<HTMLDivElement>;
  servicesRef: RefObject<HTMLDivElement>;
  productsRef: RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { homeRef, saleRef, servicesRef, productsRef } = props;
  const [toggleTheme, setToggleTheme] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.value);
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [toggleTheme]);

  const handleTheme = (themeInp: string) => {
    localStorage.theme = themeInp;
    setToggleTheme(!toggleTheme);
  };

  const handleScrollToSection = (refer: RefObject<HTMLElement>) => {
    navigate("/");
    if (refer.current) {
      const elementPosition = refer.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 60;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <Menubar className="bg-background p-8 justify-between fixed z-40 w-full rounded-none">
      <div className="bg-background flex">
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => handleScrollToSection(homeRef)}
            className="bg-background text-lg font-bold uppercase cursor-pointer text-nowrap"
          >
            Spark Mart
          </MenubarTrigger>
        </MenubarMenu>
      </div>
      <div className="bg-background hidden md:flex">
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => handleScrollToSection(homeRef)}
            className="bg-background text-md uppercase cursor-pointer"
          >
            Home
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => handleScrollToSection(saleRef)}
            className="bg-background text-md uppercase cursor-pointer"
          >
            Sale
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => handleScrollToSection(servicesRef)}
            className="bg-background text-md uppercase cursor-pointer"
          >
            Services
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => handleScrollToSection(productsRef)}
            className="bg-background text-md uppercase cursor-pointer"
          >
            Products
          </MenubarTrigger>
        </MenubarMenu>
      </div>
      <div className="bg-background flex">
        {localStorage.theme === "dark" ? (
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => handleTheme("light")}
              className="bg-background text-md uppercase cursor-pointer"
            >
              <FontAwesomeIcon icon={faSun} size="lg" />
            </MenubarTrigger>
          </MenubarMenu>
        ) : (
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => handleTheme("dark")}
              className="bg-background text-md uppercase cursor-pointer"
            >
              <FontAwesomeIcon icon={faMoon} size="lg" />
            </MenubarTrigger>
          </MenubarMenu>
        )}
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => navigate("/cart")}
            className="bg-background text-md uppercase cursor-pointer"
          >
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {user.cart.length !== 0 ? (
              <span className="rounded-full w-5 h-5 flex bg-primary justify-center items-center px-auto py-auto font-extrabold">
                {user.cart.length}
              </span>
            ) : (
              ""
            )}
          </MenubarTrigger>
        </MenubarMenu>
        {user._id ? (
          <MenubarMenu>
            <MenubarTrigger className="bg-background text-md uppercase cursor-pointer">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </MenubarTrigger>
            <MenubarContent className="bg-background ">
              <MenubarItem
                className="cursor-pointer"
                onClick={() => navigate("/myorders")}
              >
                Orders
              </MenubarItem>
              <MenubarItem
                className="cursor-pointer"
                onClick={() => {
                  dispatch(
                    setUser({
                      _id: "",
                      username: "",
                      cart: [],
                      orders: [],
                    })
                  );
                  navigate("/");
                }}
              >
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        ) : (
          <MenubarMenu>
            <MenubarTrigger className="bg-background text-md uppercase cursor-pointer">
              <FontAwesomeIcon
                icon={faRightToBracket}
                size="lg"
                onClick={() => navigate("/signin")}
              />
            </MenubarTrigger>
          </MenubarMenu>
        )}
      </div>
    </Menubar>
  );
};

export default Header;
