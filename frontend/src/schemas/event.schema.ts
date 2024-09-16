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
    start_time: z.string({ message: "Masukan Waktu Mulai Event" }),
    end_time: z.string({ message: "Masukan Waktu Akhir Event" }),
    category_id: z.string({ message: "Silahkan pilih kategori event" }),
    image_src: z.any(),

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
    venue_id: z.string({ message: "Silahkan pilih venue anda" }),
    end_date: z
      .string({ message: "Silahkan pilih tanggal akhir anda" })
      .optional(),
    default_discount: z.number({ message: "Silahkan pilih diskon" }).optional(),
    default_discount_date: z
      .string({ message: "Silahkan pilih tanggal akhir diskon" })
      .optional(),
    // tickets: z.array(
    //   z.object({
    //     name: z.string().min(1, {
    //       message: "Nama tiket kosong",
    //     }),
    //     description: z.string().min(1, {
    //       message: "Deskripsi belum ada",
    //     }),
    //     price: z
    //       .number()
    //       .min(1, {
    //         message: "Silahkan input berapa harga ticket yang ingin anda beli",
    //       })
    //       .optional(),
    //     maxNumber: z.number().min(1, {
    //       message: "Minimal ticket untuk dijual adalah 1",
    //     }),
    //   })
    // ),
  })
  .refine(
    (values) => {
      return values.end_date
        ? new Date(values.end_date) >= new Date(values.event_date)
        : true;
    },
    {
      message: "Silakan masukkan tanggal yang lebih besar dari tanggal awal.",
      path: ["end_date"],
    }
  );
