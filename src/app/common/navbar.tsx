"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { constants } from "@/app/app-constants";
import DropdownMenu from "../../components/dropdown-menu";

function DisplayMenu(menuItems: string[]) {
  let pathname = usePathname();
  const [isScrolling, setIsScrolling] = React.useState(false);
  return (
    <ul
      className={`ml-10 hidden items-center gap-6 lg:flex ${
        isScrolling ? "text-gray-900" : "text-white"
      }`}
    >
      {menuItems.map((menuItem, key) => (
        <Link
          key={key}
          className={`link ${pathname === `/${menuItem}` ? "active" : ""}`}
          href={`/${menuItem}`}
        />
      ))}
    </ul>
  );
}

export function Navbar() {
  let pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          placeholder="test"
          variant="h6"
          color={isScrolling ? "blue-gray" : "white"}
        >
          Sparkling Star
        </Typography>

        {/* <DisplayMenu menuItems Constants.menuItems}/> */}

        {/* <DropdownMenu /> */}

        <div className="hidden gap-2 lg:flex">
          <IconButton
            variant="text"
            color={isScrolling ? "gray" : "white"}
            size="sm"
          >
            <i className="fa-brands fa-twitter text-base" />
          </IconButton>
          <IconButton
            variant="text"
            color={isScrolling ? "gray" : "white"}
            size="sm"
          >
            <i className="fa-brands fa-facebook text-base" />
          </IconButton>
          <IconButton
            variant="text"
            color={isScrolling ? "gray" : "white"}
            size="sm"
          >
            <i className="fa-brands fa-instagram text-base" />
          </IconButton>
          <a href="/contact" target="_self">
            <Button
              placeholder="test"
              color={isScrolling ? "gray" : "white"}
              size="sm"
            >
              Book an Appointment
            </Button>
          </a>
        </div>
        <IconButton
          variant="text"
          color={isScrolling ? "gray" : "white"}
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-blue-gray-900">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/showcase">Showcase</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/contact">Book an Appointment</Link>
          </ul>
          <div className="mt-4 flex gap-2">
            <IconButton
              placeholder="test"
              variant="text"
              color="gray"
              size="sm"
            >
              <i className="fa-brands fa-twitter text-base" />
            </IconButton>
            <IconButton
              placeholder="test"
              variant="text"
              color="gray"
              size="sm"
            >
              <i className="fa-brands fa-facebook text-base" />
            </IconButton>
            <IconButton
              placeholder="test"
              variant="text"
              color="gray"
              size="sm"
            >
              <i className="fa-brands fa-instagram text-base" />
            </IconButton>
            <a href="/contact" target="_self">
              <Button
                placeholder="test"
                color="gray"
                size="sm"
                className="ml-auto"
              >
                Book an Appointment
              </Button>
            </a>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;