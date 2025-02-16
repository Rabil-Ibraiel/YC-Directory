import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import markdownit from "markdown-it";
import { EyeIcon } from "lucide-react";
const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_QUERY, { id });

  const parsedPitch = md.render(post?.pitch || "");

  if (!post) notFound();
  return (
    <>
      <section className="pink_container !min-h-[450px] relative">
        <span className="tag">{formatDate(post._createdAt)}</span>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading">{post.description}</p>
        <p className="mt-4 font-semibold flex items-center gap-0.5 text-white/80">
          <EyeIcon />
          <span>{post.views}</span>
        </p>
      </section>

      <section className="section_container">
        <img
          loading="lazy"
          src={post.image}
          alt={`${post.title}'s Image`}
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between">
            <div className="flex items-center gap-2 mb-3">
              <Link href={`/uesr/${post.author._id}`}>
                <Image
                  src={post.author.image}
                  width={64}
                  height={64}
                  alt={`${post.author.name}'s Avatar`}
                  className="object-cover size-16 rounded-full drop-shadow-lg"
                />
              </Link>

              <Link href={`/uesr/${post.author._id}`}>
                <div className="">
                  <p className="text-20-medium">{post.author.name}</p>
                  <p className="text-16-medium !text-black-300">
                    @{post.author.username.toLowerCase()}
                  </p>
                </div>
              </Link>
            </div>
            <Link href={`/?query=${post.category.toLowerCase()}`}>
              <span className="category-tag">{post.category}</span>
            </Link>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedPitch ? (
            <article
              className="prose max-w-4xl break-word"
              dangerouslySetInnerHTML={{ __html: parsedPitch }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />
      </section>
    </>
  );
};

export default page;
