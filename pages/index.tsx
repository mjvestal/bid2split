import Center from '@/components/Center'
import Head from 'next/head'
import Headline from '@/components/Headline'
import Link from 'next/link'
import LinkButton from '@/components/LinkButton'
import VerticalCenterLayout from '@/components/VerticalCenterLayout'

export default function Home() {
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
          <section className="mt-8 border-t pt-8">
            <Headline level={2}>How it works</Headline>
            <ol className="mt-4">
              <li className="flex mt-2">
                <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold inline-flex items-center w-8 h-8 rounded-full justify-center mr-4 shrink-0">
                  1.
                </span>
                <span className="mt-1">Everyone in the group bids on bedrooms of the vacation rental.</span>
              </li>
              <li className="flex mt-2">
                <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold inline-flex items-center w-8 h-8 rounded-full justify-center mr-4 shrink-0">
                  2.
                </span>
                <span className="mt-1">
                  Using the bids, an algorithm assigns rooms and tells you how much each person pays.
                </span>
              </li>
            </ol>
            <div className="mt-8">
              <Center>
                <Link href="/example"><a className="text-emerald-600 hover:underline">See an example</a></Link>
              </Center>
            </div>
          </section>
          <section className="mt-8 border-t pt-8">
            <Headline level={2}>Limitations</Headline>
            <ul>
              <li className="mt-2">
                You need some way of identifying each bedroom or sleeping area in the rental so that everyone in your
                group knows what they&apos;re bidding on.
                <br />
                <b>Tip: </b>Use photos from the listing website to find a unique characteristic for each room.
              </li>
              <li className="mt-2">
                The tool only works if the number of rooms or sleeping areas equal the number
                of people (or couples) staying in the rental.
              </li>
            </ul>
          </section>
          
        </main>
        <footer>
        <div className="mt-8">
            <Center>
              <LinkButton href="/create">Get Started</LinkButton>
            </Center>
          </div>
        </footer>
      </VerticalCenterLayout>
    </div>
  )
}
