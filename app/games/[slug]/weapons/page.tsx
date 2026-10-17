import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HoodWarfarePage, hoodMetadata } from "../../../../src/app/components/hood-warfare-2-page";

export function generateStaticParams() { return [{ slug: "hood-warfare-2" }]; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return (await params).slug === "hood-warfare-2" ? hoodMetadata("weapons") : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  if ((await params).slug !== "hood-warfare-2") notFound();
  return <HoodWarfarePage pageKey="weapons" />;
}
