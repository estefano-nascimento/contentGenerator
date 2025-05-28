
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GoogleAdsChannels from "./GoogleAdsChannels";
import LinkedInAdsChannels from "./LinkedInAdsChannels";
import MetaAdsChannels from "./MetaAdsChannels";

interface PaidMediaSectionProps {
  form: UseFormReturn<any>;
}

const PaidMediaSection = ({ form }: PaidMediaSectionProps) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>("item-1");

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        value={expandedAccordion || ""}
        onValueChange={setExpandedAccordion}
        className="w-full"
      >
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="font-medium py-2 px-4 rounded-md hover:bg-muted">
            Mídias Pagas
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-4 pb-2">
            <div className="ml-4 space-y-6">
              <GoogleAdsChannels form={form} />
              <LinkedInAdsChannels form={form} />
              <MetaAdsChannels form={form} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PaidMediaSection;
