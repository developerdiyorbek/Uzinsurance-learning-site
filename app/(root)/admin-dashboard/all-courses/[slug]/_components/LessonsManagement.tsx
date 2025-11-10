"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import customAxios from "@/configs/customAxios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Loader, Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { ILesson, ICourse } from "@/types";
import EmptyStateUI from "@/components/shared/EmptyStateUI";
import AlertModal from "@/components/shared/AlertModal";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  course: ICourse;
  onSuccess?: () => void;
}

interface SortableLessonItemProps {
  lesson: ILesson;
  onEdit: (lesson: ILesson) => void;
  onDelete: (lesson: ILesson) => void;
}

function SortableLessonItem({
  lesson,
  onEdit,
  onDelete,
}: SortableLessonItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 flex items-center gap-3">
              <button
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
              >
                <GripVertical className="size-5" />
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                    #{lesson.order}
                  </span>
                  <CardTitle className="text-base">{lesson.title}</CardTitle>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(lesson)}>
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(lesson)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="text-sm text-muted-foreground line-clamp-3 prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default function LessonsManagement({ course, onSuccess }: Props) {
  const router = useRouter();
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingLesson, setDeletingLesson] = useState<ILesson | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course._id]);

  const fetchLessons = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.get(
        `admin/courses/${course._id}/lessons`
      );
      setLessons(data?.lessons || []);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Darslarni yuklashda xatolik");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLesson = () => {
    router.push(`/admin-dashboard/all-courses/${course.slug}/lessons/add`);
  };

  const handleEditLesson = (lesson: ILesson) => {
    router.push(
      `/admin-dashboard/all-courses/${course.slug}/lessons/${lesson._id}/edit`
    );
  };

  const handleDelete = async () => {
    if (!deletingLesson) return;

    try {
      setIsDeleting(true);
      await customAxios.delete(`admin/lessons/${deletingLesson._id}`);
      toast.success("Dars muvaffaqiyatli o&apos;chirildi");
      setIsDeleteModalOpen(false);
      setDeletingLesson(null);
      fetchLessons();
      if (onSuccess) onSuccess();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Darsni o'chirishda xatolik");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = lessons.findIndex((lesson) => lesson._id === active.id);
    const newIndex = lessons.findIndex((lesson) => lesson._id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newLessons = arrayMove(lessons, oldIndex, newIndex);
    setLessons(newLessons);

    // Update order numbers
    const updatedLessons = newLessons.map((lesson, index) => ({
      ...lesson,
      order: index + 1,
    }));

    try {
      setIsUpdatingOrder(true);
      // Update all lessons order
      await Promise.all(
        updatedLessons.map((lesson) =>
          customAxios.put(`admin/lessons/${lesson._id}`, {
            title: lesson.title,
            content: lesson.content,
            order: lesson.order,
            course: course._id,
          })
        )
      );
      toast.success("Darslar tartibi yangilandi");
      setLessons(updatedLessons);
      if (onSuccess) onSuccess();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message || "Tartibni yangilashda xatolik"
      );
      // Revert on error
      fetchLessons();
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Darslar</h3>
          <p className="text-sm text-muted-foreground">
            Kursga darslar qo&apos;shing va boshqaring. Darslarni tartibini
            o&apos;zgartirish uchun drag and drop qiling.
          </p>
        </div>
        <Button onClick={handleAddLesson} size="sm" disabled={isUpdatingOrder}>
          <Plus className="size-4 mr-2" />
          Dars qo&apos;shish
        </Button>
      </div>

      {isLoading && !lessons.length ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : sortedLessons.length === 0 ? (
        <EmptyStateUI
          hasSearch={false}
          title="Hozircha darslar yo'q"
          description="Kursga birinchi darsni qo'shing"
        />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedLessons.map((lesson) => lesson._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid gap-4">
              {sortedLessons.map((lesson) => (
                <SortableLessonItem
                  key={lesson._id}
                  lesson={lesson}
                  onEdit={handleEditLesson}
                  onDelete={(lesson) => {
                    setDeletingLesson(lesson);
                    setIsDeleteModalOpen(true);
                  }}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {isUpdatingOrder && (
        <div className="flex items-center justify-center py-4">
          <Loader className="size-5 animate-spin text-muted-foreground mr-2" />
          <span className="text-sm text-muted-foreground">
            Tartib yangilanmoqda...
          </span>
        </div>
      )}

      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingLesson(null);
        }}
        onConfirm={handleDelete}
        title="Darsni o'chirish"
        description={`"${deletingLesson?.title}" darsini o&apos;chirishni tasdiqlaysizmi? Bu amalni qaytarib bo&apos;lmaydi.`}
        btnContinue="O'chirish"
        btnCancel="Bekor qilish"
        loading={isDeleting}
      />
    </div>
  );
}
