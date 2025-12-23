export const dynamic = "force-static"

import { getAllProjects, getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllProjects()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params, }: {params: Promise<{ slug: string }>}) {
  
    const { slug } = await(params) 
    let post

    try {
        post = getPostBySlug(slug)
    } catch {
        notFound()
    }
    return (
        <article className="prose mx-auto py-10">
        <h1>{post.title}</h1>
        <p className="text-sm text-gray-500">
            {post.date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })}
        </p>

        <MDXRemote source={post.content} />
        </article>
    )
}