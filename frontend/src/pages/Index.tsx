
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ContentForm from "@/components/ContentForm";
import FormResults from "@/components/FormResults";
import { Cog } from "lucide-react";

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<{
    driveLink?: string;
    sheetsLink?: string;
    docLink?: string;
  } | null>(null);
  const [currentTab, setCurrentTab] = useState("form");
  
  // Função para pegar parâmetros da URL
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    
    return {
      name: params.get('name') ? decodeURIComponent(params.get('name')!) : '',
      email: params.get('email') ? decodeURIComponent(params.get('email')!) : ''
    };
  };

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://contentapi-251677608789.southamerica-east1.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      
      setResults({
        driveLink: data.driveLink,
        sheetsLink: data.sheetsLink,
        docLink: data.docLink,
      });
      
      setCurrentTab("results");
      toast.success("Conteúdo gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      toast.error("Erro ao gerar conteúdo. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-4">
        <div className="container flex items-center justify-center">
          <div className="logo">
            <Cog className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Gerador de Conteúdo</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Card className="mx-auto max-w-4xl">
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">Formulário</TabsTrigger>
              <TabsTrigger value="results" disabled={!results}>
                Resultados
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="p-6">
              <ContentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} queryParams={getQueryParams()} />
            </TabsContent>
            
            <TabsContent value="results" className="p-6">
              {results && <FormResults results={results} />}
            </TabsContent>
          </Tabs>
        </Card>
      </main>

      <footer className="border-t border-border py-4 mt-auto">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Marketing Automation. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Index;
