import Image from "next/image";
import NotFoundIcon from "../public/images/404.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Image src={NotFoundIcon} alt="Page not found" width={300} height={300} />
      <h1 className="text-2xl font-bold mt-4 mb-2">Page Not Found</h1>
      <p className="text-gray-400 mb-4">
        The page you're looking for doesn't exist.
      </p>
      <a href="/vi" className="text-blue-500 hover:text-blue-400 underline">
        Go back home
      </a>
    </div>
  );
}
