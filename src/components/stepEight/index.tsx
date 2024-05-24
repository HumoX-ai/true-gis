import * as React from "react";
import { ArrowRight, ArrowLeft, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
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

export function StepEight({
  handleNext,
  handleBack,
  currentStep,
}: StepOneProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const stepData = {
      name: values.name,
      phone: values.phone,
    };
    localStorage.setItem(`step-${currentStep + 1}`, JSON.stringify(stepData));
    handleNext();
  };

  return (
    <Card className="w-full bg-[#18181B] border border-[#35353a]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Arizachi ma`lumoti</CardTitle>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ism va familiya</FormLabel>
                  <Input
                    placeholder="ism familiya"
                    {...field}
                    className="w-full md:w-1/2 bg-[#18181B] border-[#35353a]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon raqami</FormLabel>
                  <Input
                    type="number"
                    placeholder="+998 99 999 99 99"
                    {...field}
                    className="w-full md:w-1/2 bg-[#18181B] border-[#35353a]"
                  />
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
