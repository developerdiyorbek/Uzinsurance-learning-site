"use client";

import CustomImage from "@/components/shared/CustomImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ICertificate } from "@/types";
import { Award, ExternalLink, Trophy } from "lucide-react";

interface Props {
  certificate: ICertificate;
}

function CertificateCard({ certificate }: Props) {
  const handleViewCertificate = () => {
    if (certificate.certificate_link) {
      window.open(certificate.certificate_link, "_blank");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      <div className="relative">
        {/* Course Image */}
        <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-muted">
          <CustomImage
            src={certificate.course.image}
            alt={certificate.course.title}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />

          {/* Certificate Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0 shadow-md text-xs px-2 py-0.5"
            >
              <Award className="size-3 mr-1" />
              Sertifikat
            </Badge>
          </div>

          {/* Score Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-green-600 dark:bg-green-500 text-white border-0 shadow-md text-xs px-2 py-0.5"
            >
              <Trophy className="size-3 mr-1" />
              {certificate.test_score}%
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Course Title */}
          <h3 className="line-clamp-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {certificate.course.title}
          </h3>

          {/* Action Button */}
          <Button
            onClick={handleViewCertificate}
            className="w-full group/btn"
            variant="default"
            size="sm"
          >
            <ExternalLink className="size-4 mr-2 group-hover/btn:translate-x-0.5 transition-transform" />
            Sertifikatni ko&apos;rish
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
