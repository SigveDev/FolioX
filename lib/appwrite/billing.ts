import { database, Query } from "@/lib/appwrite";
import { getCurrentUser } from "./account";
import { BillingRecord } from "@/types/billing-records";

export const getBillingRecords = async () => {
  try {
    const user = await getCurrentUser();
    if (user) {
      const billingRecords = await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_BILLING_COLLECTION_ID || "",
        [Query.equal("user_id", user.$id), Query.orderDesc("$createdAt")]
      );

      if (billingRecords.documents.length === 0) {
        console.warn("No billing records found for the user.");
        return null;
      }

      const billingRecord = billingRecords.documents[0] as BillingRecord;

      return billingRecord;
    }
  } catch (error) {
    console.error("Error fetching billing records:", error);
    return null;
  }
};
