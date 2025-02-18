import { auth } from "@/auth";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import {
  STARTUP_QUERY_BY_USER_ID,
  USER_QUERY_BY_AUTHOR_ID,
} from "@/sanity/lib/queries";
import Image from "next/image";
import React from "react";
import { StartUpCardType } from "../../page";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(USER_QUERY_BY_AUTHOR_ID, { id });
  const startups = await client.fetch(STARTUP_QUERY_BY_USER_ID, { id });

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={`${user.name}'s Image`}
            width={220}
            height={220}
            className="profile_image size-[220px]"
          />

          <p className="text-30-extrabold mt-7 text-center">@{user.username}</p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Startups
          </p>

          <ul className="card_grid-sm">
            {startups.length > 0 ? (
              <>
                {startups.map((startup: StartUpCardType) => (
                  <StartupCard key={startup._id} post={startup} />
                ))}
              </>
            ) : (
              <p className="no-result">No posts yet.</p>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
