
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface ChannelSelectionProps {
  form: UseFormReturn<any>;
}

const ChannelSelection = ({ form }: ChannelSelectionProps) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>("item-1");

  return (
    <div className="space-y-4">
      {/* Erro geral para canais */}
      {form.formState.errors.channels && !form.formState.errors.channels.message && (
        <p className="text-sm font-medium text-destructive">
          Selecione pelo menos um canal
        </p>
      )}

      <Card>
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="channels.email.enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (checked) {
                        form.setValue("channels.email.quantity", 1);
                      }
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none flex-1">
                  <FormLabel>E-mail</FormLabel>
                  
                  {field.value && (
                    <div className="mt-2">
                      <FormField
                        control={form.control}
                        name="channels.email.quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Quantidade</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="channels.articles.enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (checked) {
                        form.setValue("channels.articles.quantity", 1);
                      }
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none flex-1">
                  <FormLabel>Artigos</FormLabel>
                  
                  {field.value && (
                    <div className="mt-2">
                      <FormField
                        control={form.control}
                        name="channels.articles.quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Quantidade</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </FormItem>
            )}
          />

          <div>
            <FormField
              control={form.control}
              name="channels.paid_media.enabled"
              render={({ field }) => (
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
                        {/* Google Ads */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Google Ads</h4>
                          
                          <FormField
                            control={form.control}
                            name="channels.paid_media.google_ads.Search.enabled"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2 ml-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      if (checked) {
                                        form.setValue("channels.paid_media.google_ads.Search.quantity", 1);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none flex-1">
                                  <FormLabel className="text-sm">Search</FormLabel>
                                  
                                  {field.value && (
                                    <div className="mt-2">
                                      <FormField
                                        control={form.control}
                                        name="channels.paid_media.google_ads.Search.quantity"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Quantidade</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                min={1}
                                                className="max-w-48"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="channels.paid_media.google_ads.Video.enabled"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2 ml-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      if (checked) {
                                        form.setValue("channels.paid_media.google_ads.Video.quantity", 1);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none flex-1">
                                  <FormLabel className="text-sm">Video</FormLabel>
                                  
                                  {field.value && (
                                    <div className="mt-2">
                                      <FormField
                                        control={form.control}
                                        name="channels.paid_media.google_ads.Video.quantity"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Quantidade</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                min={1}
                                                className="max-w-48"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="channels.paid_media.google_ads.Performance_Max.enabled"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2 ml-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      if (checked) {
                                        form.setValue("channels.paid_media.google_ads.Performance_Max.quantity", 1);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none flex-1">
                                  <FormLabel className="text-sm">Performance Max</FormLabel>
                                  
                                  {field.value && (
                                    <div className="mt-2">
                                      <FormField
                                        control={form.control}
                                        name="channels.paid_media.google_ads.Performance_Max.quantity"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Quantidade</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                min={1}
                                                className="max-w-48"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* LinkedIn Ads */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">LinkedIn Ads</h4>
                          
                          <FormField
                            control={form.control}
                            name="channels.paid_media.linkedin_ads.Feed.enabled"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2 ml-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      if (checked) {
                                        form.setValue("channels.paid_media.linkedin_ads.Feed.quantity", 1);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none flex-1">
                                  <FormLabel className="text-sm">Feed</FormLabel>
                                  
                                  {field.value && (
                                    <div className="mt-2">
                                      <FormField
                                        control={form.control}
                                        name="channels.paid_media.linkedin_ads.Feed.quantity"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Quantidade</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                min={1}
                                                className="max-w-48"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="channels.paid_media.linkedin_ads.Lead_Ad.enabled"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2 ml-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      if (checked) {
                                        form.setValue("channels.paid_media.linkedin_ads.Lead_Ad.quantity", 1);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none flex-1">
                                  <FormLabel className="text-sm">Lead Ad</FormLabel>
                                  
                                  {field.value && (
                                    <div className="mt-2">
                                      <FormField
                                        control={form.control}
                                        name="channels.paid_media.linkedin_ads.Lead_Ad.quantity"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Quantidade</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                min={1}
                                                className="max-w-48"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* Meta Ads */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Meta Ads</h4>
                          
                          <FormField
                            control={form.control}
                            name="channels.paid_media.meta_ads.Feed.enabled"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2 ml-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      if (checked) {
                                        form.setValue("channels.paid_media.meta_ads.Feed.quantity", 1);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none flex-1">
                                  <FormLabel className="text-sm">Feed</FormLabel>
                                  
                                  {field.value && (
                                    <div className="mt-2">
                                      <FormField
                                        control={form.control}
                                        name="channels.paid_media.meta_ads.Feed.quantity"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Quantidade</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                min={1}
                                                className="max-w-48"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="channels.paid_media.meta_ads.Lead_Ad.enabled"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2 ml-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                      field.onChange(checked);
                                      if (checked) {
                                        form.setValue("channels.paid_media.meta_ads.Lead_Ad.quantity", 1);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none flex-1">
                                  <FormLabel className="text-sm">Lead Ad</FormLabel>
                                  
                                  {field.value && (
                                    <div className="mt-2">
                                      <FormField
                                        control={form.control}
                                        name="channels.paid_media.meta_ads.Lead_Ad.quantity"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel className="text-xs">Quantidade</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                min={1}
                                                className="max-w-48"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelSelection;
