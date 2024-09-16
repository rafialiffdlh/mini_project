import { z } from "zod";
import validator from "validator";
export const purchaseSchema = z.object({
  items: z.array(
    z.object({
      quantity: z.string().min(5, {
        message: "Silahkan input berapa ticket yang ingin anda beli",
      }),
    })
  ),
});
