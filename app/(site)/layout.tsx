import Navbar from "@/lib/navbar";
import { useMDXComponents } from "@/mdx-components.tsx";

export default function RootLayout({ children }) {
  return (
      <div>
      <Navbar />
      {children}
      </div>
    );
}
