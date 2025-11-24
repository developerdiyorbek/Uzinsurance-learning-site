"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetUserTestsByCourseSlug } from "@/hooks/useGetUserTestsByCourseSlug";
import { useSubmitTestAnswers } from "@/hooks/useSubmitTestAnswers";
import { useGetUserLessonsByCourseSlug } from "@/hooks/useGetUserLessonsByCourseSlug";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import AlertModal from "@/components/shared/AlertModal";
import customAxios from "@/configs/customAxios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import TestHeader from "./_components/TestHeader";
import TestProgress from "./_components/TestProgress";
import TestQuestion from "./_components/TestQuestion";
import TestNavigation from "./_components/TestNavigation";
import TestScoreCard from "./_components/TestScoreCard";
import TestResults from "./_components/TestResults";
import TestLocked from "./_components/TestLocked";
import TestEmpty from "./_components/TestEmpty";
import TestLoading from "./_components/TestLoading";
import { AnswerOption, TestAnswer, TestResult } from "@/types";

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const course_slug = params?.slug as string;

  const { tests, course, isLoading, error, refetch } =
    useGetUserTestsByCourseSlug(course_slug);

  const { progressPercentage, isLoading: progressLoading } =
    useGetUserLessonsByCourseSlug(course_slug);

  const submitTestMutation = useSubmitTestAnswers();

  const [answers, setAnswers] = useState<Record<string, AnswerOption>>({});
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDownloadingCertificate, setIsDownloadingCertificate] =
    useState(false);

  const handleAnswerChange = (testId: string, answer: AnswerOption) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [testId]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (tests.length === 0) {
      toast.error("Testlar mavjud emas");
      return;
    }

    const answersArray: TestAnswer[] = Object.entries(answers)
      .filter(([, answer]) => answer !== undefined)
      .map(([test_id, answer]) => ({
        test_id,
        answer,
      }));

    if (answersArray.length === 0) {
      toast.error("Iltimos, kamida bitta savolga javob bering");
      return;
    }

    if (answersArray.length < tests.length) {
      setShowConfirmModal(true);
      return;
    }

    submitAnswers(answersArray);
  };

  const submitAnswers = async (answersArray: TestAnswer[]) => {
    try {
      const response = await submitTestMutation.mutateAsync({
        course_slug,
        answers: answersArray,
      });

      setResults(response.results.details);
      setScore(response.results.score);
      setIsSubmitted(true);
      toast.success(response.message);

      if (response.results.score >= 80) {
        toast.info("Tabriklaymiz! Sertifikat olish mumkin.");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      setIsDownloadingCertificate(true);
      const { data } = await customAxios.get(
        `user/courses/${course_slug}/certificate`
      );

      const certificateLink = data?.certificate?.certificate_link;

      if (certificateLink) {
        window.open(certificateLink, "_blank");
        toast.success("Sertifikat ochildi!");
      } else {
        toast.error("Sertifikat linki topilmadi");
        router.push(`/user-dashboard/${course_slug}`);
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage =
        err.response?.data?.message || "Sertifikatni yuklab bo'lmadi";
      toast.error(errorMessage);
      router.push(`/user-dashboard/${course_slug}`);
    } finally {
      setIsDownloadingCertificate(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setResults(null);
    setScore(null);
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const handleNext = () => {
    if (currentQuestionIndex < tests.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleGoToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const isCourseCompleted = progressPercentage === 100;

  if (isLoading || progressLoading) {
    return <TestLoading />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <AdvancedErrorComponent onRetry={() => refetch()} />
      </div>
    );
  }

  if (!isCourseCompleted) {
    return (
      <div className="space-y-6">
        <TestLocked
          progressPercentage={progressPercentage}
          courseSlug={course_slug}
        />
      </div>
    );
  }

  if (!tests || tests.length === 0) {
    return (
      <div className="space-y-6">
        <TestEmpty courseSlug={course_slug} />
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === tests.length;

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <TestHeader
        courseTitle={course?.title}
        totalQuestions={tests.length}
        answeredCount={answeredCount}
        score={score}
        isSubmitted={isSubmitted}
        courseSlug={course_slug}
      />

      {!isSubmitted && tests.length > 0 && (
        <div className="space-y-4">
          <TestProgress
            currentIndex={currentQuestionIndex}
            totalQuestions={tests.length}
            answeredCount={answeredCount}
            tests={tests}
            answers={answers}
            onGoToQuestion={handleGoToQuestion}
          />

          <div className="rounded-lg border p-4 bg-card">
            <TestQuestion
              test={tests[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              selectedAnswer={answers[tests[currentQuestionIndex]._id]}
              onAnswerChange={handleAnswerChange}
              isSubmitted={isSubmitted}
            />
          </div>

          <TestNavigation
            currentIndex={currentQuestionIndex}
            totalQuestions={tests.length}
            answeredCount={answeredCount}
            allAnswered={allAnswered}
            isLastQuestion={currentQuestionIndex === tests.length - 1}
            isSubmitting={submitTestMutation.isPending}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      {isSubmitted && results && score !== null && (
        <div className="space-y-4">
          <TestScoreCard
            score={score}
            correctCount={results.filter((r) => r.is_correct).length}
            totalQuestions={results.length}
            onReset={handleReset}
            onDownloadCertificate={
              score >= 80 ? handleDownloadCertificate : undefined
            }
            isDownloading={isDownloadingCertificate}
          />

          <TestResults results={results} tests={tests} />
        </div>
      )}

      <AlertModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          const answersArray: TestAnswer[] = Object.entries(answers)
            .filter(([, answer]) => answer !== undefined)
            .map(([test_id, answer]) => ({
              test_id,
              answer,
            }));
          submitAnswers(answersArray);
        }}
        title="Testni topshirish"
        description={`Siz ${tests.length} ta savoldan faqat ${
          Object.keys(answers).length
        } tasiga javob berdingiz. Davom etasizmi?`}
        btnContinue="Davom etish"
        btnCancel="Bekor qilish"
      />
    </div>
  );
}
