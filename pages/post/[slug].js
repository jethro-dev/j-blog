import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  getPosts,
  getPostDetails,
  getSimilarPosts,
  getComments,
} from "../../services";
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
import Drawer from "../../components/Drawer";

const Post = ({ post }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [comments, setComments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let categories = post?.categories?.map((category) => category.slug);
    if (post.slug) {
      getSimilarPosts(categories, post.slug).then((result) =>
        setRelatedPosts(result)
      );
      getComments(post.slug).then((result) => setComments(result));
    }
  }, []);

  const toggleCommentDrawer = () => {
    if (!isCartOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    setIsCartOpened(!isCartOpened);
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Drawer
        isOpen={isCartOpened}
        setIsOpen={toggleCommentDrawer}
        title={`Response (${comments.length})`}
      >
        <CommentsForm slug={post?.slug} />
        <Comments comments={comments} />
      </Drawer>
      <section className="bg-white">
        <PostDetail post={post} toggleCommentDrawer={toggleCommentDrawer} />

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
