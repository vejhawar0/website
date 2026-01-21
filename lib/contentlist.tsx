import Link from "next/link"
import { getAllPosts, getAllProjects } from "@/lib/posts"


export async function BlogList() {
  const posts = await getAllPosts()

  return (
    <div className="contentlist">
      <ul>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: "2rem" }}>
            <Link href={`/blog/${post.slug}`}>
              <h4>{post.title}</h4>
            </Link>
            <p>{post.description}</p>
            <small>
                {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                }
                )
                }

            </small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function ProjectList() {
  const posts = await getAllProjects()

    return (
      <div className="contentlist">
        <ul>
          {posts.map((post) => (
            <li key={post.slug} style={{ marginBottom: "2rem" }}>
              <Link href={`/projects/${post.slug}`}>
                <h4>{post.title}</h4>
              </Link>
              <p>{post.description}</p>
              <small>
                  {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  }
                  )
                  }

              </small>
            </li>
          ))}
        </ul>
      </div>
    )

}