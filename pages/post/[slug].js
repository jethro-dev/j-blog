import React, { useState, useEffect } from "react";
import Head from "next/head";
import { getPosts, getPostDetails, getSimilarPosts } from "../../services";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "../../components";
import { useRouter } from "next/router";
import RelatedPostGrid from "../../components/RelatedPostGrid";

const Post = ({ post }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    let categories = post?.categories?.map((category) => category.slug);
    if (post.slug) {
      getSimilarPosts(categories, post.slug).then((result) =>
        setRelatedPosts(result)
      );
    }
  }, [post.slug]);

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <section className="bg-white">
        <PostDetail post={post} />

        <div className="max-w-3xl mx-auto">
          <CommentsForm slug={post?.slug} />
          <Comments slug={post?.slug} />

          {/* <Author author={post?.author} /> */}

          {/* <Categories /> */}
        </div>

        <div className="bg-neutral-100 py-10">
          <div className="max-w-3xl mx-auto">
            {/* <PostWidget
              slug={post?.slug}
              categories={post?.categories?.map((category) => category.slug)}
            /> */}
            <RelatedPostGrid posts={relatedPosts} />
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
