import type { NextPage } from "next";
import { createClient } from "contentful";
import Head from "next/head";
import { TypeArticle, TypeArticleFields } from "../../types";
import Hero from "../../components/Hero";
import ArticleCard from "../../components/ArticleCard";
import Divider from "../../icons/Divider";
import heroImg from "../../public/hero-img.jpg";
import styles from "../../styles/cardPage.module.scss";

type PageProps = {
  articles: TypeArticle[];
};

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
    accessToken: `${process.env.NEXT_PUBLIC__ACCESS}`,
  });

  const articles = await client.getEntries<TypeArticleFields>({
    content_type: "article",
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
        <title>Articles | The Travel Enablers</title>
      </Head>
      <main>
        <Hero imgSrc={heroImg}>
          <h1>ARTICLES</h1>
          <Divider />
        </Hero>
        <div className={styles.section}>
          <div className={styles.wrapper}>
            {articles.map((e, i) => {
              return <ArticleCard key={i} article={e} buttonType="light" />;
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Articles;
