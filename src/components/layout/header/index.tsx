import { Link, NavLink } from "react-router";

import FutCheckLogo from "@/assets/images/website_logo.png"
import { cn } from "@/lib/utils";
import SearchBar from "./search-bar";
import PremiumDialog from "./premium-dialog";

const navbarLinks = [
    {
        name: "Players",
        href: "/players"
    },
    {
        name: "Squad Wizard",
        href: "/squad-wizard"
    },
    {
        name: "SBCs",
        href: "/sbc"
    }
]

function Header() {


    return (
        <header
            className="w-full h-16 fixed top-0 left-0 right-0 z-20 bg-(--base-100) transition-all duration-300 border-b border-neutral"
        >
            <div className="container mx-auto flex items-center justify-between h-full px-6">
                <div className="inline-flex gap-x-8 items-center">

                    <Link to="/" className="flex items-center h-full">
                        <div className="size-20 overflow-hidden relative">
                            <img
                                src={FutCheckLogo}
                                alt="FutCheck Logo"
                                className="h-full w-full absolute -bottom-1 object-contain"
                            />
                        </div>
                    </Link>

                    <nav className="flex items-center gap-x-6">
                        {navbarLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.href}
                                className={({ isActive }) => cn(
                                    "relative py-2 no-underline text-sm font-medium transition-colors duration-200",
                                    "text-white hover:text-primary",
                                    "before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-primary",
                                    "before:opacity-0 before:translate-y-1 before:transition-all before:duration-300",
                                    "hover:before:opacity-100 hover:before:translate-y-0",
                                    isActive && "text-primary before:opacity-100 before:translate-y-0"
                                )}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <SearchBar />

                    <button className="px-4 py-1.5 text-sm font-medium text-white hover:text-primary transition-colors duration-200">
                        Login
                    </button>

                    <PremiumDialog />
                </div>
            </div>

        </header >
    )
}

export default Header;