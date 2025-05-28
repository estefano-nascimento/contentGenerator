
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string()
    .email("E-mail inválido")
    .min(1, "E-mail é obrigatório")
    .refine((email) => email.endsWith("@blip.ai"), {
      message: "O e-mail deve terminar com @blip.ai",
    }),
  theme: z.string().min(1, "Tema é obrigatório"),
  persona: z.string().min(1, "Persona é obrigatória"),
  tone: z.string().min(1, "Tom de fala é obrigatório"),
  instruction: z.string().min(1, "Instruções são obrigatórias"),
  cta: z.string().min(1, "CTA é obrigatório"),
  restrictions: z.string().optional(),
  link: z.string().optional(),
  channels: z.object({
    email: z.object({ 
      enabled: z.boolean().default(false), 
      quantity: z.number().optional() 
    }).optional(),
    articles: z.object({ 
      enabled: z.boolean().default(false), 
      quantity: z.number().optional() 
    }).optional(),
    paid_media: z.object({
      google_ads: z.object({
        Search: z.object({ 
          enabled: z.boolean().default(false), 
          quantity: z.number().optional() 
        }).optional(),
        Video: z.object({ 
          enabled: z.boolean().default(false), 
          quantity: z.number().optional() 
        }).optional(),
        Performance_Max: z.object({ 
          enabled: z.boolean().default(false), 
          quantity: z.number().optional() 
        }).optional(),
      }).optional(),
      linkedin_ads: z.object({
        Feed: z.object({ 
          enabled: z.boolean().default(false), 
          quantity: z.number().optional() 
        }).optional(),
        Lead_Ad: z.object({ 
          enabled: z.boolean().default(false), 
          quantity: z.number().optional() 
        }).optional(),
      }).optional(),
      meta_ads: z.object({
        Feed: z.object({ 
          enabled: z.boolean().default(false), 
          quantity: z.number().optional() 
        }).optional(),
        Lead_Ad: z.object({ 
          enabled: z.boolean().default(false), 
          quantity: z.number().optional() 
        }).optional(),
      }).optional(),
    }).optional(),
  }).refine(
    (channels) => {
      // Verificar se pelo menos um canal está habilitado
      const hasEmail = channels.email?.enabled === true;
      const hasArticles = channels.articles?.enabled === true;
      
      // Verificar Google Ads
      const hasGoogleAds = 
        channels.paid_media?.google_ads?.Search?.enabled === true || 
        channels.paid_media?.google_ads?.Video?.enabled === true || 
        channels.paid_media?.google_ads?.Performance_Max?.enabled === true;
      
      // Verificar LinkedIn Ads
      const hasLinkedinAds = 
        channels.paid_media?.linkedin_ads?.Feed?.enabled === true || 
        channels.paid_media?.linkedin_ads?.Lead_Ad?.enabled === true;
      
      // Verificar Meta Ads
      const hasMetaAds = 
        channels.paid_media?.meta_ads?.Feed?.enabled === true || 
        channels.paid_media?.meta_ads?.Lead_Ad?.enabled === true;
      
      // Retornar true se pelo menos um canal estiver habilitado
      return hasEmail || hasArticles || hasGoogleAds || hasLinkedinAds || hasMetaAds;
    },
    {
      message: "Selecione pelo menos um canal",
      path: ["channels"],
    }
  ),
});

export type FormValues = z.infer<typeof formSchema>;

export interface ContentFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  queryParams: {
    name: string;
    email: string;
  };
  savedData?: any;
}
