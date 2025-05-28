
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import ChannelSection from "@/components/channels/ChannelSection";
import PaidMediaSection from "@/components/channels/PaidMediaSection";

interface ChannelSelectionProps {
  form: UseFormReturn<any>;
}

const ChannelSelection = ({ form }: ChannelSelectionProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <ChannelSection
            form={form}
            name="email"
            label="E-mail"
            enabledPath="channels.email.enabled"
            quantityPath="channels.email.quantity"
          />

          <ChannelSection
            form={form}
            name="articles"
            label="Artigos"
            enabledPath="channels.articles.enabled"
            quantityPath="channels.articles.quantity"
          />

          <PaidMediaSection form={form} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelSelection;
