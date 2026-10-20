import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DETAILED_PROJECTS, getProjectBySlug } from "@/app/work/work-data";
import WorkDetailClient from "./work-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DETAILED_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Iconex",
      description: "The requested case study could not be found.",
    };
  }

  return {
    title: `${project.title} — Case Study | Iconex`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study | Iconex`,
      description: project.description,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = DETAILED_PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject =
    DETAILED_PROJECTS[(currentIndex + 1) % DETAILED_PROJECTS.length];
  const prevProject =
    DETAILED_PROJECTS[
      (currentIndex - 1 + DETAILED_PROJECTS.length) % DETAILED_PROJECTS.length
    ];

  return (
    <WorkDetailClient
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
    />
  );
}
