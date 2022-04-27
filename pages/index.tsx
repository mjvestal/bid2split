import Button from '@/components/Button'
import Center from '@/components/Center'
import Head from 'next/head'
import Headline from '@/components/Headline'
import VerticalCenterLayout from '@/components/VerticalCenterLayout'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push('/create');
  };
  return (
    <div className="container">
      <Head>
        <title>Split Airbnb & Vrbo fairly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VerticalCenterLayout>
        <main>
          <Headline>Split Airbnb & Vrbo fairly</Headline>
          <p className="mt-6 text-xl">
            Not all rooms in a vacation rental are the same, so why should be what people pay?
          </p>
          <p className="mt-4 text-xl">
            Use this simple tool to divide the price of your vacation rental so that everyone is happy!
          </p>
          <p className="mt-4">
            You may still end up sleeping in a twin bed and sharing a bathroom with 3 other people, but
            at least you <b>won&apos;t</b> spend the same as the couple in the primary suite!
          </p>
          <section className="mt-8 border-t pt-8">
            <Headline level={2}>How it works</Headline>
            <ul>
              <li>
                Everyone in the group bids on bedrooms of the vacation rental.
              </li>
              <li>
                Using the bids, an algorithm assigns rooms and tells you how much each person pays.
              </li>
            </ul>
          </section>
          <section className="mt-8 border-t pt-8">
            <Headline level={2}>Limitations</Headline>
            <ul>
              <li>
                You need some way of identifying each bedroom or sleeping area in the rental so that everyone in your
                group knows what they&apos;re bidding on.
                <br />
                <b>Tip: </b>Use photos from the listing website to find a unique characteristic for each room.
              </li>
              <li>
                The tool only works if the number of rooms or sleeping areas equal the number
                of people (or couples) staying in the rental.
              </li>
            </ul>
          </section>
          <div className="mt-8">
            <Center>
              <Button onClick={handleGetStarted}>Get Started</Button>
            </Center>
          </div>
        </main>
        <footer>
          
        </footer>
      </VerticalCenterLayout>
    </div>
  )
}
