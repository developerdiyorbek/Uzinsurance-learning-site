"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LearnPageRedirect() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  useEffect(() => {
    if (slug) {
      router.replace(`/learn-courses/${slug}`);
    }
  }, [slug, router]);

  return null;
}
