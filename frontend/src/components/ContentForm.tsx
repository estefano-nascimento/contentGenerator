
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import ChannelSelection from "@/components/ChannelSelection";

// Definindo o schema de validação
const formSchema = z.object({
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
    email: z.object({ enabled: z.boolean(), quantity: z.number().optional() }).optional(),
    articles: z.object({ enabled: z.boolean(), quantity: z.number().optional() }).optional(),
    paid_media: z.object({
      google_ads: z.object({
        Search: z.object({ enabled: z.boolean(), quantity: z.number().optional() }).optional(),
        Video: z.object({ enabled: z.boolean(), quantity: z.number().optional() }).optional(),
        Performance_Max: z.object({ enabled: z.boolean(), quantity: z.number().optional() }).optional(),
      }).optional(),
      linkedin_ads: z.object({
        Feed: z.object({ enabled: z.boolean(), quantity: z.number().optional() }).optional(),
        Lead_Ad: z.object({ enabled: z.boolean(), quantity: z.number().optional() }).optional(),
      }).optional(),
      meta_ads: z.object({
        Feed: z.object({ enabled: z.boolean(), quantity: z.number().optional() }).optional(),
        Lead_Ad: z.object({ enabled: z.boolean(), quantity: z.number().optional() }).optional(),
      }).optional(),
    }).optional(),
  }).refine(
    (channels) => {
      const hasEmail = channels.email?.enabled;
      const hasArticles = channels.articles?.enabled;
      const hasGoogleAds = 
        channels.paid_media?.google_ads?.Search?.enabled || 
        channels.paid_media?.google_ads?.Video?.enabled || 
        channels.paid_media?.google_ads?.Performance_Max?.enabled;
      const hasLinkedinAds = 
        channels.paid_media?.linkedin_ads?.Feed?.enabled || 
        channels.paid_media?.linkedin_ads?.Lead_Ad?.enabled;
      const hasMetaAds = 
        channels.paid_media?.meta_ads?.Feed?.enabled || 
        channels.paid_media?.meta_ads?.Lead_Ad?.enabled;
      
      return hasEmail || hasArticles || hasGoogleAds || hasLinkedinAds || hasMetaAds;
    },
    {
      message: "Selecione pelo menos um canal",
      path: ["channels"],
    }
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface ContentFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  queryParams: {
    name: string;
    email: string;
  };
  savedData?: any;
}

const ContentForm = ({ onSubmit, isSubmitting, queryParams, savedData }: ContentFormProps) => {
  const getDefaultValues = () => {
    // Prioridade: queryParams > savedData > valores padrão
    const baseDefaults = {
      name: "",
      email: "",
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

    // Se há dados salvos, usar eles como base
    if (savedData) {
      Object.assign(baseDefaults, savedData);
    }

    // QueryParams têm prioridade sobre dados salvos
    if (queryParams.name) baseDefaults.name = queryParams.name;
    if (queryParams.email) baseDefaults.email = queryParams.email;

    return baseDefaults;
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    // Resetar o formulário quando os dados mudarem
    form.reset(getDefaultValues());
  }, [queryParams, savedData, form]);

  const handleFormSubmit = (values: FormValues) => {
    // Transformar os dados do formulário para o formato esperado pela API
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

    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {savedData && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-blue-700 font-medium">
                Dados do último pedido carregados automaticamente
              </p>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Você pode editar qualquer campo conforme necessário.
            </p>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome*</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail*</FormLabel>
                <FormControl>
                  <Input placeholder="seu.email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tema*</FormLabel>
              <FormControl>
                <Input placeholder="Digite o tema do conteúdo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />
        
        <h2 className="text-xl font-semibold mb-4">Detalhes do Conteúdo</h2>
        
        <FormField
          control={form.control}
          name="persona"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Persona*</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva a persona para quem o conteúdo será direcionado" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tom de Fala*</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva o tom de voz a ser utilizado no conteúdo" 
                  className="min-h-[60px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="instruction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruções*</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Forneça instruções detalhadas sobre o conteúdo a ser gerado" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CTA (Call to Action)*</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Agende uma demonstração" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="restrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restrições</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Especifique quaisquer restrições para o conteúdo" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Task no Asana</FormLabel>
              <FormControl>
                <Input placeholder="https://app.asana.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Canais*</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Selecione pelo menos um canal e defina a quantidade de conteúdos a serem gerados
          </p>
          
          <ChannelSelection form={form} />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Gerando conteúdo..." : "Gerar Conteúdo"}
        </Button>
      </form>
    </Form>
  );
};

export default ContentForm;
