import Head from 'next/head';
import Button from '../components/Button';
import Hero from '../components/Hero';
import Divider from '../icons/Divider';
import heroImg from '../public/hero-img.jpg';

const Error = ({ statusCode }: { statusCode: number }) => {
  <>
    <Head>
      <title>{statusCode} | Travelling Foodie Tours</title>
    </Head>
    <main>
      <Hero imgSrc={heroImg}>
        <h1>SOMETHING WENT WRONG</h1>
        <Divider />
        <Button
          location='/'
          buttonType='main'
          value='Go to Home'
        />
      </Hero>
    </main>
  </>;
};

Error.getInitialProps = ({
  res,
  err,
}: {
  res: { statusCode: number };
  err: { statusCode: number };
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
