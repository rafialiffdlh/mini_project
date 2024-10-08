import { z } from "zod";
import validator from "validator";
export const registerSchema = z
  .object({
    name: z.string().min(5, {
      message: "Silahkan masukan nama lengkap anda",
    }),
    phone_number: z
      .string({ message: "Masukkan no handphone anda" })
      .min(9, {
        message:
          "Harap masukkan nomor telepon yang valid mulai dengan 0 atau 62 dan minimum 9 digit.",
      })
      .refine(validator.isMobilePhone, {
        message: "Nomor telepon tidak valid",
      }),

    // date: z.number({ message: "Masukan Tanggal Lahir" }).min(1).max(31),
    // month: z
    //   .number({ message: "Masukan Bulan Lahir" })
    //   .max(12, { message: "invalid month" })
    //   .min(1),
    // year: z
    //   .number({ message: "Masukan Tahun Lahir" })
    //   .max(new Date().getFullYear(), { message: "invalid year" })
    //   .min(1960),
    email: z.string().email().min(5, {
      message: "silahkan masukan email anda",
    }),
    role: z.enum(["User", "Organizer"], {
      message: "silahkan pilih role anda",
    }),
    password: z
      .string({ message: "Mohon masukan kata sandi Anda." })
      .min(6, {
        message:
          "Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka",
      })
      .regex(/[a-zA-Z]/, {
        message:
          "Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka",
      })
      .regex(/[0-9]/, {
        message:
          "Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka",
      })
      .trim(),
    confirm_password: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: "Silakan masukkan kata sandi yang sama.",
      path: ["confirm_password"],
    }
  );

export const loginSchema = z.object({
  phone_number: z
    .string({ message: "Masukkan no handphone anda" })
    .min(9, {
      message:
        "Harap masukkan nomor telepon yang valid mulai dengan 0 atau 62 dan minimum 9 digit.",
    })
    .refine(validator.isMobilePhone),
  password: z
    .string({ message: "Mohon masukan kata sandi Anda." })
    .min(6, {
      message:
        "Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka",
    })
    .regex(/[a-zA-Z]/, {
      message:
        "Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka",
    })
    .regex(/[0-9]/, {
      message:
        "Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka",
    })
    .trim(),
});

export const profileSchema = z.object({
  gender: z.enum(["pria", "wanita"], {
    message: "Silahkan Pilih Jenis Kelamin",
  }),
  birthDate: z.string({ message: "Masukan Tanggal Lahir" }).min(1, {
    message: "Masukan Tanggal Lahir",
  }),
  name: z.string().min(5, {
    message: "Silahkan masukan nama lengkap anda",
  }),
  password: z
    .string({ message: "masukan kata sandi" })
    .min(6, {
      message:
        "Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka",
    })
    .regex(/[a-zA-Z]/, {
      message:
        "Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka",
    })
    .regex(/[0-9]/, {
      message:
        "Mohon masukan kata sandi anda sebagai Kata sandi minimal harus 6 karakter, berisi huruf dan angka",
    })
    .trim()
    .optional(),
  image_src: z.any().optional(),
});
