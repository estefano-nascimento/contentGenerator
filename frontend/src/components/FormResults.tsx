
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Table, FolderOpen } from "lucide-react";

interface FormResultsProps {
  results: {
    driveLink?: string;
    sheetsLink?: string;
    docLink?: string;
  };
}

const FormResults = ({ results }: FormResultsProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Conteúdo Gerado com Sucesso!</h2>
        <p className="text-muted-foreground">
          Seus conteúdos foram gerados e estão disponíveis nos links abaixo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.driveLink && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FolderOpen className="h-5 w-5 mr-2 text-primary" />
                Pasta Drive
              </CardTitle>
              <CardDescription>
                Todos os arquivos gerados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(results.driveLink, "_blank")}
              >
                Acessar Pasta
              </Button>
            </CardContent>
          </Card>
        )}

        {results.sheetsLink && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Table className="h-5 w-5 mr-2 text-primary" />
                Planilha
              </CardTitle>
              <CardDescription>
                Anúncios para mídias pagas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(results.sheetsLink, "_blank")}
              >
                Acessar Planilha
              </Button>
            </CardContent>
          </Card>
        )}

        {results.docLink && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Documento
              </CardTitle>
              <CardDescription>
                Textos longos (artigos e e-mails)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(results.docLink, "_blank")}
              >
                Acessar Documento
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Os links acima contêm todo o conteúdo gerado com base nos parâmetros fornecidos.
          Para gerar novos conteúdos, você pode voltar ao formulário e fazer novas solicitações.
        </p>
      </div>
    </div>
  );
};

export default FormResults;
