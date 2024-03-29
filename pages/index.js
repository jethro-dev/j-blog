import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";
import FeaturedPosts from "../components/FeaturedPosts";
import { useState } from "react";
import Drawer from "../components/Drawer";

export default function Home({ posts }) {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.node.createdAt) - new Date(a.node.createdAt)
  );

  return (
    <>
      <Head>
        <title>JBLOG | Home</title>
      </Head>

      <section className="bg-white dark:bg-gray-500 transition-colors px-5">
        <div className="max-w-6xl mx-auto py-10">
          <h2 className="text-xl mb-4">Trending</h2>
          <FeaturedPosts />
          <hr className="my-8" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8 col-span-1 ">
              {sortedPosts?.map((post) => (
                <PostCard key={post.node.title} post={post.node} />
              ))}
            </div>

            <div className="md:col-span-4 col-span-1">
              <div className="md:sticky relative md:top-[110px]">
                {/* <PostWidget /> */}
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: {
      posts,
    },
  };
}
