import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Header from '../components/Header';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <main className={styles.mainContainer}>
        <Header />
        <div className={styles.posts}>
          <a>
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sicronização em vez de ciclos de vida</p>
            <div className={styles.postInfo}>
              <div>
                <FiCalendar />
                <time>19 de Abril 2021</time>
              </div>
              <div>
                <FiUser />
                <span>Danilo Vieira</span>
              </div>
            </div>
          </a>
          <a>
            <strong>Criando um app CRA do zero</strong>
            <p>
              Tudo sobre como criar a sua primeira aplicação utilizando Create
              React App
            </p>
            <div className={styles.postInfo}>
              <div>
                <FiCalendar />
                <time>16 de Abril 2021</time>
              </div>
              <div>
                <FiUser />
                <span>Joseph Vieira</span>
              </div>
            </div>
          </a>

          <a>
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sicronização em vez de ciclos de vida</p>
            <div className={styles.postInfo}>
              <div>
                <FiCalendar />
                <time>19 de Abril 2021</time>
              </div>
              <div>
                <FiUser />
                <span>Danilo Vieira</span>
              </div>
            </div>
          </a>
          <a>
            <strong>Criando um app CRA do zero</strong>
            <p>
              Tudo sobre como criar a sua primeira aplicação utilizando Create
              React App
            </p>
            <div className={styles.postInfo}>
              <div>
                <FiCalendar />
                <time>16 de Abril 2021</time>
              </div>
              <div>
                <FiUser />
                <span>Joseph Vieira</span>
              </div>
            </div>
          </a>

          <a>
            <strong>Como utilizar hooks</strong>
            <p>Pensando em sicronização em vez de ciclos de vida</p>
            <div className={styles.postInfo}>
              <div>
                <FiCalendar />
                <time>19 de Abril 2021</time>
              </div>
              <div>
                <FiUser />
                <span>Danilo Vieira</span>
              </div>
            </div>
          </a>
          <a>
            <strong>Criando um app CRA do zero</strong>
            <p>
              Tudo sobre como criar a sua primeira aplicação utilizando Create
              React App
            </p>
            <div className={styles.postInfo}>
              <div>
                <FiCalendar />
                <time>16 de Abril 2021</time>
              </div>
              <div>
                <FiUser />
                <span>Joseph Vieira</span>
              </div>
            </div>
          </a>
          <button type="button">Carregar mais posts</button>
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    Prismic.predicates.at('document.type', 'post')
  );

  console.log(JSON.stringify(postsResponse, null, 2));

  return {
    props: {},
  };
};
