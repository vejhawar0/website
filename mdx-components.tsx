import type { MDXComponents } from 'mdx/types'
import Link from "next/link";
 
const components: MDXComponents = 
{
    a: (props) => <Link {...props} />,
    
    Warning: ({ children }) => (
      <div style={{
        background: "#222",
        borderLeft: "4px solid #f39c12",
        padding: "1rem",
        borderRadius: "6px",
        margin: "1rem 0"
      }}>
        ⚠️ {children}
      </div>
    ),
}
 
export function useMDXComponents(): MDXComponents {
  return components
}