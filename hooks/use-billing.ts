import { useQuery } from "@tanstack/react-query";
import { getBillingRecords } from "@/lib/appwrite/billing";
import { BillingRecord } from "@/types/billing-records";

export function useBilling() {
  const {
    data: billingRecord,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<BillingRecord | null>({
    queryKey: ["billingRecord"],
    queryFn: async () => {
      const record = await getBillingRecords();
      return record ?? null;
    },
  });

  return {
    billingRecord,
    loading,
    error,
    refetch,
  };
}
