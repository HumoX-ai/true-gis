import { ArrowRight, ArrowLeft, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { formSchema } from "./scheme";

type StepOneProps = {
  handleNext: () => void;
  handleBack: () => void;
  currentStep: number;
};

const linksSchema = z.object({
  website: z.string(),
  instagram: z.string(),
  telegram: z.string(),
  telegramBot: z.string(),
  facebook: z.string(),
  twitter: z.string(),
  youtube: z.string(),
});

export function StepSix({ handleNext, handleBack, currentStep }: StepOneProps) {
  const form = useForm<z.infer<typeof linksSchema>>({
    resolver: zodResolver(linksSchema),
    defaultValues: {
      website: "",
      instagram: "",
      telegram: "",
      telegramBot: "",
      facebook: "",
      twitter: "",
      youtube: "",
    },
  });
 
  const onSubmit = (values: z.infer<typeof linksSchema>) => {
    console.log(values);
    const stepData = {
      linksInput: values,
    };
    localStorage.setItem(`step-${currentStep + 1}`, JSON.stringify(stepData));
    handleNext();
  };

  return (
    <Card className="w-full bg-[#18181B] border border-[#35353a]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Ish vaqtlari</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp size={18} />
              </TooltipTrigger>
              <TooltipContent>
                <p className="">This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-full pt-2 border-b border-[#35353a]" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Havolalar</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="url"
                      className="block w-full md:w-1/2 bg-[#1F1F23] border border-[#35353a] text-white py-2 px-3 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram sahifasi uchun havola</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="url"
                      className="block w-full md:w-1/2 bg-[#1F1F23] border border-[#35353a] text-white py-2 px-3 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram sahifasi uchun havola</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="url"
                      className="block w-full md:w-1/2 bg-[#1F1F23] border border-[#35353a] text-white py-2 px-3 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telegramBot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram bot uchun havola</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="block w-full md:w-1/2 bg-[#1F1F23] border border-[#35353a] text-white py-2 px-3 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook sahifasi uchun havola</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="url"
                      className="block w-full md:w-1/2 bg-[#1F1F23] border border-[#35353a] text-white py-2 px-3 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter sahifasi uchun havola</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="url"
                      className="block w-full md:w-1/2 bg-[#1F1F23] border border-[#35353a] text-white py-2 px-3 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube sahifasi uchun havola</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="url"
                      className="block w-full md:w-1/2 bg-[#1F1F23] border border-[#35353a] text-white py-2 px-3 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between mt-8">
        {currentStep > 0 && (
          <Button
            onClick={handleBack}
            className="bg-[#2970FF] text-white hover:bg-[#2970FF]/90"
          >
            <ArrowLeft />
            Orqaga
          </Button>
        )}
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="bg-[#2970FF] text-white hover:bg-[#2970FF]/90"
        >
          Keyingisi <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
