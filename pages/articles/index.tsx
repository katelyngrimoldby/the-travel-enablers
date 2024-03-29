import type { NextPage } from 'next';
import { createClient } from 'contentful';
import Head from 'next/head';
import { TypeArticle, TypeArticleFields } from '../../types';
import Hero from '../../components/Hero';
import ArticleCard from '../../components/ArticleCard';
import Divider from '../../icons/Divider';
import heroImg from '../../public/hero-img.jpg';
import styles from '../../styles/cardPage.module.scss';

type PageProps = {
  articles: TypeArticle[];
};

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
    accessToken: `${process.env.NEXT_PUBLIC_ACCESS}`,
  });

  const articles = await client.getEntries<TypeArticleFields>({
    content_type: 'article',
  });

  return {
    props: {
      articles: articles.items,
    },
  };
}

const Articles: NextPage<PageProps> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>Articles | Travelling Foodie Tours</title>
        <meta
          name='description'
          content='Read up on all the travel-related articles you can here.'
        />
        <meta
          property='og:title'
          content='Articles | Travelling Foodie Tours'
        />
        <meta
          property='og:description'
          content='Read up on all the travel-related articles you can here.'
        />
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:url'
          content='https://www.travellingfoodietours.com/articles'
        />
        <meta
          property='og:image'
          content='https://www.travellingfoodietours.com/og-image.jpg'
        />
        <meta
          property='og:image:secure_url'
          content='https://www.travellingfoodietours.com/og-image.jpg'
        />
      </Head>
      <main>
        <Hero imgSrc={heroImg}>
          <h1>ARTICLES</h1>
          <Divider />
        </Hero>
        <div className={styles.content}>
          {articles.length < 1 ? (
            <p>There are no articles right now.</p>
          ) : (
            articles.map((e, i) => {
              return (
                <ArticleCard
                  key={i}
                  article={e}
                  buttonType='light'
                />
              );
            })
          )}
        </div>
      </main>
    </>
  );
};

export default Articles;
