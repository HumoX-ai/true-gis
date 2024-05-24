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
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

type StepOneProps = {
  handleNext: () => void;
  handleBack: () => void;
  currentStep: number;
};

export function StepThree({
  handleNext,
  handleBack,
  currentStep,
}: StepOneProps) {
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lon: 0,
  });
  const [address, setAddress] = useState("");

  console.log(userLocation);

  const mapRef = useRef(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      placename: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const stepData = {
      placename: values.placename,
      description: values.description,
    };
    localStorage.setItem(`step-${currentStep + 1}`, JSON.stringify(stepData));
    handleNext();
  };

  useEffect(() => {
    // Foydalanuvchining hozirgi lokatsiyasini olish
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userAddress = await reverseGeocode(latitude, longitude); // Reverse geocoding funksiyasi
        form.setValue("placename", userAddress); // defaultValues ni o'rnatish
        setUserLocation({
          lat: latitude,
          lon: longitude,
        });
        setAddress(userAddress);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, [form]);

  // Reverse geocoding funksiyasi
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return `${latitude}, ${longitude}`;
    }
  };

  return (
    <Card className="w-full bg-[#18181B] border border-[#35353a]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Joylashuv ma`lumotlari</CardTitle>
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
              name="placename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Joy nomi</FormLabel>
                  <Input
                    placeholder="Manzil..."
                    {...field}
                    className="w-full md:w-1/2 bg-[#18181B] border-[#35353a]"
                    value={address || field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* yandex map here */}
            <YMaps>
              <Map
                width="100%"
                height="300px"
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                defaultState={{
                  center: [55.751574, 37.573856],
                  zoom: 5,
                }}
              >
                <Placemark
                  geometry={[userLocation.lat, userLocation.lon]}
                  options={{
                    preset: "islands#redDotIcon",
                    draggable: false,
                  }}
                />
              </Map>
            </YMaps>
            {/* yandex map here */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Joy haqida ma`lumotlar</FormLabel>
                  <Textarea
                    placeholder="Joy haqida"
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
