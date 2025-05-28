
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ChannelSelection from "@/components/ChannelSelection";
import BasicInfoSection from "@/components/form/BasicInfoSection";
import ContentDetailsSection from "@/components/form/ContentDetailsSection";
import { FormValues, ContentFormProps, formSchema } from "@/components/form/FormTypes";
import { useFormDefaults } from "@/hooks/useFormDefaults";
import { processFormData } from "@/utils/formDataProcessor";

const ContentForm = ({ onSubmit, isSubmitting, queryParams, savedData }: ContentFormProps) => {
  const { getDefaultValues } = useFormDefaults(queryParams, savedData);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    // Resetar o formulário quando os dados mudarem
    form.reset(getDefaultValues());
  }, [queryParams, savedData, form]);

  const handleFormSubmit = (values: FormValues) => {
    const formattedData = processFormData(values);
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

        <BasicInfoSection form={form} />

        <Separator />
        
        <ContentDetailsSection form={form} />

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
