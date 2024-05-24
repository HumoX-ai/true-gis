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
import { Form } from "../ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { formSchema } from "./scheme";
import { useState } from "react";
import { Switch } from "@headlessui/react";

type StepOneProps = {
  handleNext: () => void;
  handleBack: () => void;
  currentStep: number;
};

type Day = {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
};

export function StepFive({
  handleNext,
  handleBack,
  currentStep,
}: StepOneProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "",
      timeZone: "",
    },
  });

  const [days, setDays] = useState<Day[]>(
    daysOfWeek.map((day) => ({
      day,
      enabled: false,
      startTime: "09:00",
      endTime: "18:00",
    }))
  );

  const [timeZone, setTimeZone] = useState<string>(timeZones[0]);

  const handleSwitchChange = (index: number) => {
    const newDays = [...days];
    newDays[index].enabled = !newDays[index].enabled;
    setDays(newDays);
    console.log(`Day ${days[index].day} enabled: ${newDays[index].enabled}`);
  };

  const handleTimeChange = (
    index: number,
    time: string,
    type: "startTime" | "endTime"
  ) => {
    const newDays = [...days];
    newDays[index][type] = time;
    setDays(newDays);
    console.log(`Day ${days[index].day} ${type}: ${time}`);
  };

  const enabledDays = days.filter((day) => day.enabled);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (enabledDays.length === 0 || !timeZone) {
      alert("Iltimos, kamida bitta kunni va vaqt mintaqasini tanlang");
      return;
    }
    const stepData = {
      days: enabledDays,
      timeZone,
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
            <div className="bg-[#18181B] p-4 rounded-lg text-white">
              <h2 className="text-xl mb-4">Hafta kunlari</h2>
              {days.map((day, index) => (
                <div key={day.day} className="flex items-center mb-4">
                  <Switch
                    checked={day.enabled}
                    onChange={() => handleSwitchChange(index)}
                    className={`${day.enabled ? "bg-blue-600" : "bg-gray-200"}
                      relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable {day.day}</span>
                    <span
                      className={`${
                        day.enabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                    />
                  </Switch>
                  <span className="ml-3 w-24">{day.day}</span>
                  <input
                    type="time"
                    value={day.startTime}
                    onChange={(e) =>
                      handleTimeChange(index, e.target.value, "startTime")
                    }
                    className="ml-2 p-1 bg-[#1F1F23] border border-[#35353a] text-white rounded"
                    disabled={!day.enabled}
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="time"
                    value={day.endTime}
                    onChange={(e) =>
                      handleTimeChange(index, e.target.value, "endTime")
                    }
                    className="p-1 bg-[#1F1F23] border border-[#35353a] text-white rounded"
                    disabled={!day.enabled}
                  />
                </div>
              ))}
              <div className="flex items-center gap-2 mt-8">
                <CardTitle>Vaqt mintaqasi</CardTitle>
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
              <div className="relative mb-4">
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="block w-full bg-[#1F1F23] border border-[#35353a] text-white py-2 px-3 rounded"
                >
                  {timeZones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
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
          disabled={enabledDays.length === 0 || !timeZone}
          onClick={form.handleSubmit(onSubmit)}
          className="bg-[#2970FF] text-white hover:bg-[#2970FF]/90"
        >
          Keyingisi <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}

const daysOfWeek = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
  "Yakshanba",
];

const timeZones = [
  "(UTC +05:00) Ashgabat, Tashkent",
  "(UTC +05:30) Chennai, Kolkata, Mumbai, New Delhi",
  "(UTC +05:45) Kathmandu",
  "(UTC +06:00) Almaty, Dhaka",
  "(UTC +06:30) Yangon (Rangoon)",
  "(UTC +07:00) Bangkok, Hanoi, Jakarta",
  "(UTC +08:00) Beijing, Hong Kong, Singapore",
  "(UTC +09:00) Osaka, Sapporo, Tokyo",
  "(UTC +09:30) Adelaide, Darwin",
  "(UTC +10:00) Canberra, Melbourne, Sydney",
  "(UTC +11:00) Magadan, Solomon Is.",
  "(UTC +12:00) Auckland, Wellington",
  "(UTC +13:00) Nuku'alofa",
  "(UTC +14:00) Kiritimati",
  "(UTC -01:00) Azores",
  "(UTC -02:00) Mid-Atlantic",
];
