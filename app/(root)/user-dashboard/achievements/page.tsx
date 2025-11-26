"use client";

import { useGetUserCertificates } from "@/hooks/useGetUserCertificates";
import CertificateCard from "../_components/CertificateCard";
import CertificateCardSkeleton from "../_components/CertificateCardSkeleton";
import EmptyStateUI from "@/components/shared/EmptyStateUI";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import { Award } from "lucide-react";
import { ICertificate } from "@/types";

function Page() {
  const { certificates, isLoading, error } = useGetUserCertificates();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Award className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="max-sm:text-xl text-2xl font-bold text-foreground">
              Yutuqlarim
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Olingan sertifikatlaringiz va yutuqlaringiz
            </p>
          </div>
        </div>

        {!isLoading && certificates && certificates.length > 0 && (
          <div className="px-4 py-2 rounded-lg bg-muted">
            <span className="text-sm font-medium text-foreground">
              {certificates.length}{" "}
              {certificates.length === 1 ? "sertifikat" : "sertifikat"}
            </span>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <CertificateCardSkeleton key={item} />
          ))}
        </div>
      )}

      {!isLoading && error && <AdvancedErrorComponent />}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {!isLoading &&
          certificates?.length > 0 &&
          certificates?.map((certificate: ICertificate, index: number) => (
            <CertificateCard key={index} certificate={certificate} />
          ))}
      </div>

      {!isLoading && !certificates?.length && !error && (
        <EmptyStateUI
          hasSearch={false}
          title="Hozircha sertifikat yo'q"
          description="Siz hali birorta ham sertifikat olmadingiz. Sertifikat olish uchun kursni to'liq tugatib, testdan kamida 80% ball olishingiz kerak."
        />
      )}
    </div>
  );
}

export default Page;
