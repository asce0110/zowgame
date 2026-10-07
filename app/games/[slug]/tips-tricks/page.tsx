import { notFound } from "next/navigation";
import { FishesGuidePage, fishesGuideMetadata } from "../../../../src/app/components/fishes-guide-page";

export function generateStaticParams() {
  return [{ slug: "dont-sleep-with-the-fishes" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return slug === "dont-sleep-with-the-fishes" ? fishesGuideMetadata("tips-tricks") : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== "dont-sleep-with-the-fishes") notFound();
  return <FishesGuidePage pageKey="tips-tricks" />;
}
