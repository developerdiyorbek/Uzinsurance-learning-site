import customAxios from "@/configs/customAxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface CertificateResponse {
  success: boolean;
  certificate: {
    pdfData: string; // base64 formatida PDF
    testScore: number;
    testCompleted: boolean;
    courseCompleted: boolean;
  };
}

export function useGetCertificate() {
  return useMutation({
    mutationFn: async (course_slug: string) => {
      const { data } = await customAxios.get<CertificateResponse>(
        `user/courses/${course_slug}/certificate`
      );
      return data;
    },
    onSuccess: (data) => {
      // PDF ni yuklab olish
      const pdfBase64 = data.certificate.pdfData;
      const pdfBlob = base64ToBlob(pdfBase64, "application/pdf");
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Sertifikat muvaffaqiyatli yuklab olindi!");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Sertifikatni yuklab bo'lmadi";
      toast.error(errorMessage);
    },
  });
}

// Base64 dan Blob ga o'tkazish funksiyasi
function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

