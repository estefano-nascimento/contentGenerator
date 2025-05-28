
import { FormValues } from "@/components/form/FormTypes";

export const processFormData = (values: FormValues) => {
  const formattedData: any = {
    name: values.name,
    email: values.email,
    theme: values.theme,
    persona: values.persona,
    tone: values.tone,
    instruction: values.instruction,
    cta: values.cta,
    restrictions: values.restrictions || "",
    link: values.link || "",
    channels: {},
  };

  // Processar os canais selecionados
  if (values.channels.email?.enabled) {
    formattedData.channels.email = {
      quantity: values.channels.email.quantity || 1,
    };
  }

  if (values.channels.articles?.enabled) {
    formattedData.channels.articles = {
      quantity: values.channels.articles.quantity || 1,
    };
  }

  // Processar mídias pagas
  const paidMedia: any = {};
  
  // Google Ads
  const googleAds: any = {};
  if (values.channels.paid_media?.google_ads?.Search?.enabled) {
    googleAds.Search = {
      quantity: values.channels.paid_media.google_ads.Search.quantity || 1,
    };
  }
  if (values.channels.paid_media?.google_ads?.Video?.enabled) {
    googleAds.Video = {
      quantity: values.channels.paid_media.google_ads.Video.quantity || 1,
    };
  }
  if (values.channels.paid_media?.google_ads?.Performance_Max?.enabled) {
    googleAds["Performance Max"] = {
      quantity: values.channels.paid_media.google_ads.Performance_Max.quantity || 1,
    };
  }
  
  if (Object.keys(googleAds).length > 0) {
    paidMedia.google_ads = googleAds;
  }

  // LinkedIn Ads
  const linkedinAds: any = {};
  if (values.channels.paid_media?.linkedin_ads?.Feed?.enabled) {
    linkedinAds.Feed = {
      quantity: values.channels.paid_media.linkedin_ads.Feed.quantity || 1,
    };
  }
  if (values.channels.paid_media?.linkedin_ads?.Lead_Ad?.enabled) {
    linkedinAds["Lead Ad"] = {
      quantity: values.channels.paid_media.linkedin_ads.Lead_Ad.quantity || 1,
    };
  }
  
  if (Object.keys(linkedinAds).length > 0) {
    paidMedia.linkedin_ads = linkedinAds;
  }

  // Meta Ads
  const metaAds: any = {};
  if (values.channels.paid_media?.meta_ads?.Feed?.enabled) {
    metaAds.Feed = {
      quantity: values.channels.paid_media.meta_ads.Feed.quantity || 1,
    };
  }
  if (values.channels.paid_media?.meta_ads?.Lead_Ad?.enabled) {
    metaAds["Lead Ad"] = {
      quantity: values.channels.paid_media.meta_ads.Lead_Ad.quantity || 1,
    };
  }
  
  if (Object.keys(metaAds).length > 0) {
    paidMedia.meta_ads = metaAds;
  }

  // Adicionar mídias pagas aos canais, se houver
  if (Object.keys(paidMedia).length > 0) {
    formattedData.channels.paid_media = paidMedia;
  }

  return formattedData;
};
