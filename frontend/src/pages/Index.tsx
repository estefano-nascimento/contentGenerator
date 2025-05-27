
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import ContentForm from "@/components/ContentForm";
import FormResults from "@/components/FormResults";
import { Cog, FileText, Mail, Clock } from "lucide-react";

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<{
    driveLink?: string;
    sheetsLink?: string;
    docLink?: string;
  } | null>(null);
  const [currentTab, setCurrentTab] = useState("form");
  const [progress, setProgress] = useState(0);
  
  // Função para pegar parâmetros da URL
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    
    return {
      name: params.get('name') ? decodeURIComponent(params.get('name')!) : '',
      email: params.get('email') ? decodeURIComponent(params.get('email')!) : ''
    };
  };

  // Função para salvar dados no localStorage
  const saveFormData = (formData: any) => {
    localStorage.setItem('contentFormData', JSON.stringify(formData));
  };

  // Função para carregar dados do localStorage
  const loadFormData = () => {
    try {
      const savedData = localStorage.getItem('contentFormData');
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error('Erro ao carregar dados salvos:', error);
      return null;
    }
  };

  // Simular progresso durante o loading
  useEffect(() => {
    if (isSubmitting) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isSubmitting]);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setProgress(0);
    
    // Salvar dados no localStorage
    saveFormData(formData);
    
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
      
      // Completar o progresso
      setProgress(100);
      
      setTimeout(() => {
        setResults({
          driveLink: data.driveLink,
          sheetsLink: data.sheetsLink,
          docLink: data.docLink,
        });
        
        setCurrentTab("results");
        toast.success("Conteúdo gerado com sucesso! Os links também foram enviados por e-mail.");
      }, 500);
      
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      toast.error("Erro ao gerar conteúdo. Por favor, tente novamente.");
      setProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="flex items-center space-x-2">
        <Cog className="h-8 w-8 text-primary animate-spin" />
        <h2 className="text-2xl font-semibold text-primary">Gerando Conteúdo</h2>
      </div>
      
      <div className="text-center space-y-4 max-w-md">
        <p className="text-muted-foreground">
          Estamos criando seu conteúdo personalizado. Este processo pode levar alguns minutos.
        </p>
        
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {progress < 30 && "Processando informações..."}
            {progress >= 30 && progress < 60 && "Gerando conteúdo para os canais..."}
            {progress >= 60 && progress < 90 && "Finalizando documentos..."}
            {progress >= 90 && "Quase pronto!"}
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <FileText className="h-4 w-4" />
            <span>Criando documentos</span>
          </div>
          <div className="flex items-center space-x-1">
            <Mail className="h-4 w-4" />
            <span>Preparando e-mail</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          Os links dos documentos serão enviados para seu e-mail assim que estiverem prontos.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-4">
        <div className="container flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Cog className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Gerador de Conteúdo</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Card className="mx-auto max-w-4xl">
          {isSubmitting ? (
            <div className="p-6">
              <LoadingScreen />
            </div>
          ) : (
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="form">Formulário</TabsTrigger>
                <TabsTrigger value="results" disabled={!results}>
                  Resultados
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="form" className="p-6">
                <ContentForm 
                  onSubmit={handleSubmit} 
                  isSubmitting={isSubmitting} 
                  queryParams={getQueryParams()}
                  savedData={loadFormData()}
                />
              </TabsContent>
              
              <TabsContent value="results" className="p-6">
                {results && <FormResults results={results} />}
              </TabsContent>
            </Tabs>
          )}
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
