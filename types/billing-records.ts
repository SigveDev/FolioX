import { Models } from "appwrite";

export interface BillingRecord extends Models.Document {
  user_id: string;
  stripe_payment_intent_id?: string;
  amount: number;
  currency?: string;
  status: string;
  billing_period_start?: Date;
  billing_period_end?: Date;
}
