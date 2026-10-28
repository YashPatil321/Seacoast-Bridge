import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { SupportForm } from "@/components/SupportForm";

export const metadata: Metadata = {
  title: "Add your support",
  description: "Tell Yash Patil you support the Seacoast Bridge proposal for Imperial Beach small businesses.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <>
      <div className="bg-teal text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
          <p className="label text-seaglass">Seacoast Bridge · Support</p>
          <h1 className="rise mt-4 max-w-2xl text-4xl font-semibold sm:text-5xl">Add your support</h1>
          <p className="rise mt-4 max-w-xl text-lg text-[#d6ebe7]" style={{ ["--rise-delay" as string]: "100ms" }}>
            Residents, former visitors and business owners: tell me whether this plan would help. New here?{" "}
            <Link href="/" className="text-amber underline underline-offset-4">
              Start with the overview
            </Link>
            .
          </p>
        </div>
      </div>
      <Disclaimer />
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6">
        <SupportForm />
      </div>
    </>
  );
}
