import type { NextPage } from "next";
import { createClient } from "contentful";
import Head from "next/head";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { TypeArticle, TypeArticleFields } from "../../types";
import Hero from "../../components/Hero";
import WhiteBack from "../../components/WhiteBack";
import Divider from "../../icons/Divider";
import styles from "../../styles/[articleSlug].module.scss";

const client = createClient({
  space: `${process.env.NEXT_PUBLIC_SPACE_ID}`,
  accessToken: `${process.env.NEXT_PUBLIC_ACCESS}`,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries<TypeArticleFields>({
    content_type: "article",
  });

  const paths = res.items.map((e) => {
    return { params: { slug: e.fields.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

type StaticProps = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: StaticProps) => {
  const res = await client.getEntries<TypeArticleFields>({
    content_type: "article",
    "fields.slug": params.slug,
  });

  return {
    props: { article: res.items[0] },
  };
};

type PageProps = {
  article: TypeArticle;
};

const Article: NextPage<PageProps> = ({ article }) => {
  const { title, coverImage, content, slug } = article.fields;

  return (
    <>
      <Head>
        <title>{`${title} | The Travel Enablers`}</title>
        <meta property="og:title" content={`${title} | The Travel Enablers`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.thetravelenablers.com/articles/${slug}`} />
        <meta
          property="og:image"
          content={`https:${coverImage.fields.file.url}`}
        />
        <meta
          property="og:image:secure_url"
          content={`https:${coverImage.fields.file.url}`}
        />
      </Head>
      <main>
        <Hero
          imgSrc={`https:${coverImage.fields.file.url}`}
          height={coverImage.fields.file.details.image?.height}
          width={coverImage.fields.file.details.image?.width}
        >
          <h1>{title.toUpperCase()}</h1>
          <Divider />
        </Hero>
        <WhiteBack>
          <article className={styles.article}>
            {documentToReactComponents(content as Document)}
          </article>
        </WhiteBack>
      </main>
    </>
  );
};

export default Article;
