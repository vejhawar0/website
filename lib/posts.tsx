import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content/blog")
const PROJECTS_DIR = path.join(process.cwd(), "content/projects")

export type Post = {
  title: string
  slug: string
  date: string
  description?: string
  content: string
}

export function getAllContent(DIR: string) {
  const files = fs.readdirSync(DIR)

  return files.map((file) => {
    const filePath = path.join(DIR, file)
    const raw = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(raw)

    if (!data.slug) {
      throw new Error(`Missing slug in ${file}`)
    }

    return {
      title: data.title,
      slug: data.slug,
      date: data.date,
      description: data.description,
      content,
    //   last_modified: lastModifiedDate
    }
  })
}

export function getAllPosts(): Post[] {
  return getAllContent(BLOG_DIR)
}

export function getAllProjects(): Post[] {
  return getAllContent(PROJECTS_DIR)
}

// export function getContentBySlug(DIR: string, slug: string): Post {
//   const posts = getAllContent(DIR)
// }

export function getPostBySlug(slug: string): Post {
  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    throw new Error(`Post not found for path: ${slug}`)
  }

  return post
}
