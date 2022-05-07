import { useEffect, useRef, useState } from 'react';

import Center from '@/components/Center'
import Head from 'next/head'
import Headline from '@/components/Headline'
import Link from 'next/link'
import LinkButton from '@/components/LinkButton'
import Logo from '@/components/Logo';
import Section from '@/components/Section';

export default function Home() {
  return (
    <div>
      <Head>
        <title>bid2split | Fairly split the cost of your next vacation rental</title>
        <meta property="og:image" content="/images/logo_on_blue.png" />
      </Head>

      <Section>
        <Center>
          <Logo />
        </Center>

        <p className="text-xl font-brand font-medium mt-8 text-center">
          Split the cost of your next <RotatingBrandText /><br />
          so that everyone is happy!
        </p>
      </Section>
      <Section className="py-8 bg-slate-100 bg-[url('/images/bg_tile_gray.png')]">
        <Headline level={2}>How it works</Headline>
        <ol className="mt-4">
          <li className="flex mt-2">
            <span className="bg-cyan-100 text-cyan-800 text-sm font-semibold font-brand inline-flex items-center w-8 h-8 rounded-full justify-center mr-4 shrink-0">
              1.
            </span>
            <span className="mt-1">One person puts in the details of the rental. They&apos;ll receive a unique URL to share to the group.</span>
          </li>
          <li className="flex mt-2">
            <span className="bg-cyan-100 text-cyan-800 text-sm font-semibold font-brand inline-flex items-center w-8 h-8 rounded-full justify-center mr-4 shrink-0">
              2.
            </span>
            <span className="mt-1">Everyone in the group bids on bedrooms of the vacation rental.</span>
          </li>
          <li className="flex mt-2">
            <span className="bg-cyan-100 text-cyan-800 text-sm font-semibold font-brand inline-flex items-center w-8 h-8 rounded-full justify-center mr-4 shrink-0">
              3.
            </span>
            <span className="mt-1">
              An algorithm uses the bids to assign rooms and tells you how much each person pays.
            </span>
          </li>
        </ol>
        <div className="mt-8">
          <Center>
            <Link href="/example"><a className="text-cyan-500 hover:underline font-brand">See an example</a></Link>
          </Center>
        </div>
      </Section>
      <Section>
        <Headline level={2}>Limitations</Headline>
        <ul>
          <li className="mt-2">
            You need some way to uniquely describe each bedroom or sleeping area so that your
            group knows what they&apos;re bidding on.
          </li>
          <li className="mt-4">
            The number of bedrooms (or sleeping areas) must equal the number of individuals (or couples).
          </li>
        </ul>
        <div className="mt-8">
          <Center>
            <LinkButton href="/create">Get Started</LinkButton>
          </Center>
        </div>
      </Section>
    </div>
  )
}

const BRANDS = ['Airbnb', 'Vrbo', 'rental'];
function RotatingBrandText() {
  const [brandIndex, setBrandIndex] = useState(0);
  const timeoutRef = useRef<number>(-1);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (timeoutRef.current > -1) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = -1;
    }
    timeoutRef.current = window.setTimeout(() => {
      setBrandIndex(brandIndex === BRANDS.length - 1 ? 0 : brandIndex + 1);
    }, 2000);
    return () => {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = -1;
    }
  }, [brandIndex]);

  switch (brandIndex) {
    case 0:
      return <span className="text-airbnb inline-block w-14 text-left">Airbnb</span>;
    case 1:
      return <span className="text-vrbo inline-block w-14 text-left">Vrbo</span>;
    case 2:
    default:
      return <span className="text-cyan-500 inline-block w-14 text-left">rental</span>;
  }
  
}