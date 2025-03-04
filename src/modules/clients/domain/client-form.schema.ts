import { z } from "zod";
import { CLIENT_FORM_MESSAGES } from "@/lib/messages/client.message";
import { ClientModelSchema } from "./client.schema";

export const ClientFormSchema = ClientModelSchema.pick({
  identifier: true,
  fullName: true,
  address: true,
  phone: true,
  creditLimit: true,
}).extend({
  identifier: z
    .string({
      required_error: CLIENT_FORM_MESSAGES.CCNUMBER.REQUIRED,
    })
    .min(5, {
      message: CLIENT_FORM_MESSAGES.CCNUMBER.MIN,
    }),
  fullName: z
    .string({
      required_error: CLIENT_FORM_MESSAGES.FULLNAME.REQUIRED,
    })
    .min(5, {
      message: CLIENT_FORM_MESSAGES.FULLNAME.MIN,
    })
    .max(255, {
      message: CLIENT_FORM_MESSAGES.FULLNAME.MAX,
    }),
  address: z
    .string()
    .min(5, {
      message: CLIENT_FORM_MESSAGES.ADDRESS.MIN,
    })
    .max(255, {
      message: CLIENT_FORM_MESSAGES.ADDRESS.MAX,
    })
    .nullable(),
  phone: z
    .string()
    .min(10, {
      message: CLIENT_FORM_MESSAGES.PHONE.MIN,
    })
    .max(10, {
      message: CLIENT_FORM_MESSAGES.PHONE.MIN,
    })
    .nullable(),
  creditLimit: z.preprocess(
    (value) => Number(value) || 0,
    z
      .number({
        required_error: CLIENT_FORM_MESSAGES.CREDITLIMIT.REQUIRED,
      })
      .min(1, {
        message: CLIENT_FORM_MESSAGES.CREDITLIMIT.MIN,
      })
  ),
});
