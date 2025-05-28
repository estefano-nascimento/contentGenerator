
import { FormValues } from "@/components/form/FormTypes";

export const useFormDefaults = (
  queryParams: { name: string; email: string },
  savedData?: any
) => {
  const getDefaultValues = (): FormValues => {
    const baseDefaults: FormValues = {
      name: queryParams.name || "",
      email: queryParams.email || "",
      theme: "",
      persona: "",
      tone: "",
      instruction: "",
      cta: "",
      restrictions: "",
      link: "",
      channels: {
        email: { enabled: false, quantity: 1 },
        articles: { enabled: false, quantity: 1 },
        paid_media: {
          google_ads: {
            Search: { enabled: false, quantity: 1 },
            Video: { enabled: false, quantity: 1 },
            Performance_Max: { enabled: false, quantity: 1 },
          },
          linkedin_ads: {
            Feed: { enabled: false, quantity: 1 },
            Lead_Ad: { enabled: false, quantity: 1 },
          },
          meta_ads: {
            Feed: { enabled: false, quantity: 1 },
            Lead_Ad: { enabled: false, quantity: 1 },
          },
        },
      },
    };

    // Se há dados salvos, mesclar com os padrões
    if (savedData) {
      return {
        ...baseDefaults,
        ...savedData,
        // Manter name e email dos queryParams se existirem
        name: queryParams.name || savedData.name || "",
        email: queryParams.email || savedData.email || "",
        channels: {
          ...baseDefaults.channels,
          ...savedData.channels,
        },
      };
    }

    return baseDefaults;
  };

  return { getDefaultValues };
};
