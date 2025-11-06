"use client";

import type { ICourse } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import CustomImage from "../shared/CustomImage";

interface Props {
  course: ICourse;
  link: string;
  show_creator?: boolean;
}

function formatDate(dateString: string) {
  return format(new Date(dateString), "MMM dd, yyyy");
}

function CourseCard({ course, link, show_creator }: Props) {
  return (
    <Link href={link}>
      <div className="group overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-lg hover:border-primary/50">
        <div className="relative h-52 w-full overflow-hidden bg-muted">
          <CustomImage
            src={course.image}
            alt={course.title}
            className="transition-transform duration-300 group-hover:scale-105"
          />

          <div className="text-sm absolute bottom-0 right-0 flex items-center gap-2 rounded-tl-lg bg-primary px-2 py-1 text-white font-medium">
            {course.slug}
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="line-clamp-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(course.createdAt)}</span>
          </div>

          {show_creator && course.teacher && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <Image
                src={course.teacher.avatar || "/user icon.png"}
                alt={`${course.teacher.first_name} ${course.teacher.last_name}`}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground truncate">
                  {`${course.teacher.first_name} ${course.teacher.last_name}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
