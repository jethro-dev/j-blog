import React from "react";
import Head from "next/head";
import { getPosts, getPostDetails } from "../../services";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "../../components";
import { useRouter } from "next/router";

const Post = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <section className="bg-zinc-200 dark:bg-gray-500 transition-colors px-5">
        <div className="max-w-7xl mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-8 col-span-1 ">
              <PostDetail post={post} />
              <CommentsForm slug={post?.slug} />
              <Comments slug={post?.slug} />
            </div>

            <div className="md:col-span-4 col-span-1">
              <div className="md:sticky relative md:top-[110px]">
                <Author author={post?.author} />
                <PostWidget
                  slug={post?.slug}
                  categories={post?.categories.map((category) => category.slug)}
                />
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Post;

export const getStaticProps = async (context) => {
  const data = await getPostDetails(context.params.slug);

  return {
    props: {
      post: data,
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.node.slug } })),
    fallback: true,
  };
};
