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
import { useState } from "react";
type StepOneProps = {
  handleNext: () => void;
  handleBack: () => void;
  currentStep: number;
};

export function StepSeven({
  handleNext,
  handleBack,
  currentStep,
}: StepOneProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radio: "",
    },
  });
  const [selected, setSelected] = useState("");

  const handleSelect = (value: string) => {
    setSelected(value);
  };
  console.log(selected);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selected) {
      console.log("Iltimos, biror variantni tanlang");
      return;
    }
    console.log(values);
    const stepData = {
      radio: selected,
    };
    localStorage.setItem(`step-${currentStep + 1}`, JSON.stringify(stepData));
    handleNext();
  };

  return (
    <Card className="w-full bg-[#18181B] border border-[#35353a]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Qo`shimcha ma`lumotlar</CardTitle>
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
            <div className="p-4 text-white min-h-screen">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(categories).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    {items.map((item) => (
                      <label
                        key={item}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={item}
                          checked={selected === item}
                          onChange={() => handleSelect(item)}
                          className="hidden"
                        />
                        <span
                          className={`w-5 h-5 mr-2 inline-block rounded border ${
                            selected === item
                              ? "bg-blue-500 border-transparent"
                              : "bg-transparent border-gray-300"
                          } flex items-center justify-center`}
                        >
                          {selected === item && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          )}
                        </span>
                        {item}
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>
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
          disabled={!selected}
          onClick={form.handleSubmit(onSubmit)}
          className="bg-[#2970FF] text-white hover:bg-[#2970FF]/90"
        >
          Keyingisi <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}

const categories = {
  Ovqatlanish: [
    "Wi Fi",
    "yetkazib berish",
    "Parking",
    "Dam olish xonasi",
    "Hojatxona",
  ],
  Avtomobillarga: [
    "Karta orqali to’lov",
    "Do’stona",
    "Shinam",
    "Halol",
    "Halol",
    "24 soat",
  ],
  "Xizmat ko'rsatish": [
    "Bepul nonushta",
    "Konditsioner",
    "Kir yuvish xizmati",
    "Aeroport xizmati",
    "O’yin maydoni",
  ],
};
