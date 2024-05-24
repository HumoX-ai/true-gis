import {
  ArrowRight,
  ArrowLeft,
  CircleHelp,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
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
import Image from "next/image";
import { useRef, useState } from "react";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "@/lib/firebase";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type StepTwoProps = {
  handleNext: () => void;
  handleBack: () => void;
  currentStep: number;
};

const formSchema = z.object({
  prewImages: z.array(
    z.object({
      name: z.string(),
      size: z.number().max(1200 * 1200, "Image must be max 800x400px"),
      type: z.enum(["image/png", "image/jpeg"], {
        errorMap: () => ({ message: "Invalid image type" }),
      }),
    })
  ),
});

export function StepTwo({ handleNext, handleBack, currentStep }: StepTwoProps) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [isImageValid, setIsImageValid] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleSubmit, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prewImages: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check image type and size
      if (
        (file.type === "image/png" || file.type === "image/jpeg") &&
        file.size <= 1200 * 1200
      ) {
        setIsImageValid(true);
        setIsUploading(true);

        // Preview the image locally
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to Firebase
        uploadImage(file);

        // Update form values
        setValue("prewImages", [
          { name: file.name, size: file.size, type: file.type },
        ]);
      } else {
        setIsImageValid(false);
        setPreviewUrl(""); // Clear preview if invalid image
        return;
      }
    } else {
      setPreviewUrl(""); // Clear preview if no image is selected
      setIsImageValid(false);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const imgRef = ref(imageDb, `files/${v4()}`);
      await uploadBytes(imgRef, file);
      const downloadURL = await getDownloadURL(imgRef);
      setUploadedImageUrl(downloadURL);
      setIsUploading(false); // Set uploading to false after upload completes
    } catch (error) {
      console.error("Error uploading image: ", error);
      setIsUploading(false); // Set uploading to false if there's an error
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const stepData = {
      prewImages: values.prewImages,
      imageUrl: uploadedImageUrl,
    };
    localStorage.setItem(`step-${currentStep + 1}`, JSON.stringify(stepData));
    handleNext();
  };

  return (
    <Card className="w-full bg-[#18181B] border border-[#35353a]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Joy rasmlari</CardTitle>
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
      <CardContent className="flex gap-4">
        <div
          className="p-6 w-fit border border-[#35353a] rounded-lg flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Button variant="outline" className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              ref={fileInputRef}
              accept="image/*"
            />
            <div className="flex items-center justify-center gap-2">
              <UploadIcon size={18} />
            </div>
          </Button>
          <p className="font-semibold text-xs text-center">Rasm yuklang</p>
          <p className="text-xs text-gray-400">PNG yoki JPG (max. 800x400px)</p>
        </div>
        {previewUrl && (
          <div className="relative w-fit">
            <Image width={200} height={200} src={previewUrl} alt="Preview" />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => {
                setPreviewUrl("");
                setIsImageValid(false);
                setUploadedImageUrl("");
              }}
            >
              <TrashIcon size={16} />
            </button>
          </div>
        )}
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
          onClick={handleSubmit(onSubmit)}
          className="bg-[#2970FF] text-white hover:bg-[#2970FF]/90"
          disabled={!isImageValid || isUploading}
        >
          Keyingisi <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
