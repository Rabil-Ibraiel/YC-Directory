import { formatDate } from "@/lib/utils";
import React from "react";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { StartUpCardType } from "@/app/(root)/page";

const StartupCard = ({ post }: { post: StartUpCardType }) => {
  return (
    <li className="startup-card group overflow-hidden">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(post._createdAt)}</p>
        <div className="flex items-center gap-1.5">
          <EyeIcon />
          <span className="text-16-medium">{post.views}</span>
        </div>
      </div>

      <div className="flex-between">
        <div>
          <Link href={`/user/${post?.author?._id}`}>
            <p className="text-16-medium line-clamp-1">{post?.author?.name}</p>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
          </Link>
        </div>
        {post.author?.image && (
          <Image
            src={post.author.image}
            alt="placeholder"
            className="rounded-full object-cover size-12"
            width={48}
            height={48}
          />
        )}
      </div>

      <Link href={`/startup/${post._id}`}>
        <p className="startup-card_desc">{post.description}</p>

        <img src={post.image} alt="post" className="startup-card_img" />
      </Link>

      <div className="flex-between gap=3 mt-5">
        <Link href={`/?query=${post.category?.toLowerCase()}`}>
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <Button className="startup-card_btn">
          <Link href={`/startup/${post._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
