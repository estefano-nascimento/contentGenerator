
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface ChannelSectionProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  enabledPath: string;
  quantityPath: string;
}

const ChannelSection = ({ form, label, enabledPath, quantityPath }: ChannelSectionProps) => {
  return (
    <FormField
      control={form.control}
      name={enabledPath}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                if (checked) {
                  form.setValue(quantityPath, 1);
                }
              }}
            />
          </FormControl>
          <div className="space-y-1 leading-none flex-1">
            <FormLabel>{label}</FormLabel>
            
            {field.value && (
              <div className="mt-2">
                <FormField
                  control={form.control}
                  name={quantityPath}
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
  );
};

export default ChannelSection;
