
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./FormTypes";

interface ContentDetailsSectionProps {
  form: UseFormReturn<FormValues>;
}

const ContentDetailsSection = ({ form }: ContentDetailsSectionProps) => {
  return (
    <>
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
    </>
  );
};

export default ContentDetailsSection;
