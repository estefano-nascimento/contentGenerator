
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface LinkedInAdsChannelsProps {
  form: UseFormReturn<any>;
}

const LinkedInAdsChannels = ({ form }: LinkedInAdsChannelsProps) => {
  return (
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
  );
};

export default LinkedInAdsChannels;
