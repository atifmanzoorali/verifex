import { Suspense } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ResponsePreview } from '@/components/landing/ResponsePreview';
import { Faq } from '@/components/landing/Faq';
import { CallToAction } from '@/components/landing/CallToAction';

export default function LandingPage(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Suspense fallback={<div className="h-96 bg-[#111111]" />}>
        <ResponsePreview />
      </Suspense>
      <Faq />
      <CallToAction />
    </>
  );
}
