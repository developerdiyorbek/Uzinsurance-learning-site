import { z } from "zod";

export const logInSchema = z.object({
  phoneNumber: z
    .string()
    .min(17, "Majburiy field!")
    .regex(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "Raqam kiriting!"),
  password: z.string().min(1, "Majburiy field!"),
});

export const addAndEditUserSchema = (isEdit: boolean) =>
  z.object({
    p_seria: z.string().min(1, "Passport seriyasi majburiy!"),
    p_number: z.string().min(1, "Passport raqami majburiy!"),
    pinfl: z.string().min(1, "PINFL majburiy!"),
    phone_number: isEdit
      ? z.string()
      : z
          .string()
          .min(17, "Majburiy field!")
          .regex(/^[+998]{4} \d{2} \d{3} \d{2} \d{2}$/, "Raqam kiriting!"),
    password: isEdit
      ? z
          .string()
          .optional()
          .refine((val) => !val || val.length >= 6, {
            message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
          })
      : z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
    role: z.string(),
    status: z.string(),
  });

export const courseSchema = z.object({
  title: z.string().min(3, "Majburiy field!"),
  description: z.string().min(1, "Majburiy field!"),
  slug: z.string().min(3, "Majburiy field!"),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith("image/"),
      "Faqat rasm fayl bo'lishi kerak!",
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Rasm hajmi 5MB dan oshmasin!",
    ),
});

export const courseEditSchema = z.object({
  title: z.string().min(3, "Majburiy field!"),
  description: z.string().min(1, "Majburiy field!"),
  slug: z.string().min(3, "Majburiy field!"),
  status: z.enum(["created", "pending", "published", "rejected"], {
    message: "Status majburiy!",
  }),
  image: z
    .union([z.instanceof(File), z.null(), z.undefined()])
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Faqat rasm fayl bo'lishi kerak!",
    )
    .refine(
      (file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024),
      "Rasm hajmi 5MB dan oshmasin!",
    )
    .optional()
    .nullable(),
});

export const teacherCourseEditSchema = z.object({
  title: z.string().min(3, "Majburiy field!"),
  description: z.string().min(1, "Majburiy field!"),
  slug: z.string().min(3, "Majburiy field!"),
  image: z
    .union([z.instanceof(File), z.null(), z.undefined()])
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Faqat rasm fayl bo'lishi kerak!",
    )
    .refine(
      (file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024),
      "Rasm hajmi 5MB dan oshmasin!",
    )
    .optional()
    .nullable(),
});

export const lessonSchema = z.object({
  title: z.string().min(3, "Dars nomi majburiy!"),
  content: z.string().min(1, "Dars mazmuni majburiy!"),
  slug: z.string().min(3, "Slug majburiy!"),
  video_url: z.string().optional().nullable(),
  file_url: z.instanceof(File).optional().nullable(),
});

export const testSchema = z.object({
  question: z.string().min(3, "Savol majburiy!"),
  options: z.object({
    a: z.string().min(1, "A variant majburiy!"),
    b: z.string().min(1, "B variant majburiy!"),
    c: z.string().min(1, "C variant majburiy!"),
    d: z.string().min(1, "D variant majburiy!"),
  }),
  correctAnswer: z.enum(["a", "b", "c", "d"], {
    message: "To'g'ri javobni tanlang!",
  }),
});

export const userSchema = z
  .object({
    avatar: z.instanceof(File).optional().nullable(),
    password: z
      .string()
      .min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Parollar bir xil bo‘lishi kerak",
    path: ["confirmPassword"],
  });
