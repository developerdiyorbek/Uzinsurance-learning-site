"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ICourse } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  course: ICourse;
  link: string;
}

function CourseCard({ course, link }: Props) {
  return (
    <Link href={link}>
      <Card className="group w-full overflow-hidden transition-all hover:shadow-lg">
        <CardContent>
          <div className="relative h-48 w-full overflow-hidden p-0">
            <Image
              fill
              src={course.image || "/logo.webp"}
              alt={course.title}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div>
            <h2 className="line-clamp-2 font-space-grotesk text-lg font-medium leading-tight mb-2">
              {course.title}
            </h2>

            <Separator className="my-3" />

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Image
                  src={course.teacher?.avatar || "/user icon.png"}
                  alt={`${course.teacher.first_name} ${course.teacher.last_name}`}
                  width={32}
                  height={32}
                  className="rounded-full object-cover flex-shrink-0"
                />
                <p className="text-sm text-muted-foreground truncate">
                  {`${course.teacher.first_name} ${course.teacher.last_name}`}
                </p>
              </div>

              <Button
                className="font-space-grotesk text-xs flex-shrink-0"
                size="sm"
                variant={course.published ? "destructive" : "default"}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {course.published ? "Olib tashlash" : "Chiqarish"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CourseCard;
