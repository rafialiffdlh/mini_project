import { z } from "zod";
import validator from "validator";
export const createEventSchema = z
  .object({
    title: z.string().min(5, {
      message: "Silahkan masukan nama event anda",
    }),
    description: z
      .string()
      .min(20, {
        message: "Minimal 20 karakter",
      })
      .max(200, {
        message: "Maksimal 200 karakter",
      }),
    event_date: z.string({ message: "Masukan Tanggal Event" }).min(1, {
      message: "Silahkan pilih tanggal event",
    }),
    duration: z.string({ message: "Masukan Durasi Event" }).min(1, {
      message: "Silahkan pilih durasi event",
    }),
    category_id: z.number({ message: "Silahkan pilih kategori event" }),
    image_src: z.string().min(1, {
      message: "Silahkan pilih gambar event",
    }),

    // gender: z.enum(["pria", "wanita"], {
    //   message: "Silahkan Pilih Jenis Kelamin",
    // }),
    // date: z.number({ message: "Masukan Tanggal Lahir" }).min(1).max(31),
    // month: z
    //   .number({ message: "Masukan Bulan Lahir" })
    //   .max(12, { message: "invalid month" })
    //   .min(1),
    // year: z
    //   .number({ message: "Masukan Tahun Lahir" })
    //   .max(new Date().getFullYear(), { message: "invalid year" })
    //   .min(1960),
    venue_id: z.number({ message: "Silahkan pilih venue anda" }),
    end_date: z.string().optional(),
  })
  .refine(
    (values) => {
      return values.end_date ? values.end_date <= values.event_date : true;
    },
    {
      message: "Silakan masukkan tanggal yang lebih besar dari tanggal awal.",
      path: ["end_date"],
    }
  );
