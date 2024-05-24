import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

const Header = () => {
  const navItems = [
    { label: "Bot xususiyatlari", path: "/features" },
    { label: "Bizning mijozlar", path: "/customers" },
    { label: "Fikrlar", path: "/testimonials" },
    { label: "Ko'p beriladigan savollar", path: "/faq" },
  ];
  return (
    <header className="flex justify-between items-center space-x-4 py-4 px-4 lg:px-12 border-b border-neutral-800">
      <div className="flex items-center space-x-24">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="block sm:hidden lg:block"
          />
          <span className="block sm:inline-block font-extrabold tracking-tight">
            TrueGis
          </span>
        </Link>
        <nav className="ml-6 hidden space-x-8 text-sm font-semibold leading-6 lg:block ">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        {/* <ThemeToggle /> */}
        <div className="hidden sm:block">
          <Select>
            <SelectTrigger className="w-[180px]">
              <Image src="/uzb.svg" alt="Logo" width={30} height={30} />
              <SelectValue placeholder="O'zbek" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 items-center gap-4">
                  {navItems.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="block sm:hidden">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <Image src="/uzb.svg" alt="Logo" width={30} height={30} />
                      <SelectValue placeholder="O'zbek" />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* For small screen */}
    </header>
  );
};

export default Header;
