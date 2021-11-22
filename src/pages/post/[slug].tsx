import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import ptBR from 'date-fns/locale/pt-BR';
import { useRouter } from 'next/router';
import Prismic from '@prismicio/client';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  const formattedDate = useMemo(() => {
    if (!post?.first_publication_date) {
      return '';
    }
    return format(new Date(post.first_publication_date), 'dd MMM yyy', {
      locale: ptBR,
    });
  }, [post?.first_publication_date]);

  return (
    <>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      {router.isFallback ? (
        <div className={styles.loadingContainer}>
          <p>Carregando...</p>
        </div>
      ) : (
        <>
          <img
            className={styles.imgLogo}
            src="/images/Banner.png"
            alt="Banner do post"
          />
          <main className={`${commonStyles.mainContainer} ${styles.content}`}>
            <h1>{post.data.title}</h1>
            <div className={styles.postInfo}>
              <time>{formattedDate}</time>
              <span>{post.data.author}</span>
              <time>4 min</time>
            </div>
            {post.data.content.map((content, index) => (
              <React.Fragment key={`${content.heading}-${index + 1}`}>
                <h2 className={styles.postTopic}>{content.heading}</h2>
                {content.body.map(body => (
                  <p key={body.text}>{body.text}</p>
                ))}
              </React.Fragment>
            ))}
          </main>
        </>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const { results } = await prismic.query(
    Prismic.predicates.at('document.type', 'post'),
    {
      pageSize: 5,
    }
  );

  const paths = results.map(post => ({
    params: {
      slug: post.uid,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient();
  const { slug } = params;
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    data: {
      ...response.data,
    },
    first_publication_date: response.first_publication_date,
    uid: response.uid,
  };

  return {
    props: {
      post,
    },
  };
};
