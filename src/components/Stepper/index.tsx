"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StepOne } from "../stepOne";
import { StepTwo } from "../stepTwo";
import { StepThree } from "../stepThree";
import { StepFour } from "../stepFour";
import { StepFive } from "../stepFive";
import { StepSix } from "../stepSix";
import { StepSeven } from "../stepSeven";
import { StepEight } from "../stepEight";

type Step = {
  title: string;
  content: (
    handleNext: () => void,
    handleBack: () => void,
    currentStep: number
  ) => JSX.Element;
};

const steps: Step[] = [
  {
    title: "Joy nomi",
    content: (handleNext, handleBack, currentStep) => (
      <StepOne
        handleNext={handleNext}
        handleBack={handleBack}
        currentStep={currentStep}
      />
    ),
  },
  {
    title: "Joy rasmlari",
    content: (handleNext, handleBack, currentStep) => (
      <StepTwo
        handleNext={handleNext}
        handleBack={handleBack}
        currentStep={currentStep}
      />
    ),
  },
  {
    title: "Joylashuv ma'lumotlari",
    content: (handleNext, handleBack, currentStep) => (
      <StepThree
        handleNext={handleNext}
        handleBack={handleBack}
        currentStep={currentStep}
      />
    ),
  },
  {
    title: "Joy turi",
    content: (handleNext, handleBack, currentStep) => (
      <StepFour
        handleNext={handleNext}
        handleBack={handleBack}
        currentStep={currentStep}
      />
    ),
  },
  {
    title: "Ish vaqtlari",
    content: (handleNext, handleBack, currentStep) => (
      <StepFive
        handleNext={handleNext}
        handleBack={handleBack}
        currentStep={currentStep}
      />
    ),
  },
  {
    title: "Havolalar",
    content: (handleNext, handleBack, currentStep) => (
      <StepSix
        handleNext={handleNext}
        handleBack={handleBack}
        currentStep={currentStep}
      />
    ),
  },
  {
    title: "Qo'shimcha ma'lumotlar",
    content: (handleNext, handleBack, currentStep) => (
      <StepSeven
        handleNext={handleNext}
        handleBack={handleBack}
        currentStep={currentStep}
      />
    ),
  },
  {
    title: "Arizachi ma'lumoti",
    content: (handleNext, handleBack, currentStep) => (
      <StepEight
        handleNext={handleNext}
        handleBack={handleBack}
        currentStep={currentStep}
      />
    ),
  },
  // Add other steps as needed
];

const Stepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCompletedSteps(
        completedSteps.filter((step) => step !== currentStep - 1)
      );
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepCompleted = (stepIndex: number) =>
    completedSteps.includes(stepIndex);

  return (
    <div className="container mx-auto px-4 md:px-36 py-12">
      <div className="mb-12">
        <div className="flex items-center justify-between sm:hidden relative">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`p-2 text-white ${
              currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronLeft />
          </button>
          <span className="text-lg">
            <span className="text-blue-600">{currentStep + 1}</span> /{" "}
            {steps.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`p-2 text-white ${
              currentStep === steps.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <ChevronRight />
          </button>
          <div className="absolute inset-x-0 inset-y-16 bottom-0 flex justify-between items-center">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex w-full mx-2 ${
                  index < currentStep
                    ? "bg-green-500"
                    : index === currentStep
                    ? "bg-blue-600"
                    : "border h-1 border-white bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="hidden sm:flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex-1 flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-full mb-2">
                <div
                  className={`h-0.5 flex-grow ${
                    index <= currentStep
                      ? "bg-green-500"
                      : "border-t border-dotted border-gray-300"
                  }`}
                />
                <div
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? isStepCompleted(index)
                        ? "bg-green-500"
                        : "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                >
                  {isStepCompleted(index) ? (
                    <svg
                      className="w-6 h-6 text-white"
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
                  ) : (
                    <span
                      className={`${
                        index === currentStep ? "text-white" : "text-black"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <div
                  className={`h-0.5 flex-grow ${
                    index < currentStep
                      ? "bg-green-500"
                      : "border-t border-dotted border-gray-300"
                  }`}
                />
              </div>
              {index === currentStep && (
                <div className="text-sm font-medium text-white mt-2">
                  {step.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        {steps[currentStep].content(handleNext, handleBack, currentStep)}
      </div>
    </div>
  );
};

export default Stepper;
