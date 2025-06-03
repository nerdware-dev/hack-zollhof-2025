"use client";

import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user/userStore";

interface HealthInsurance {
  label: string;
  value: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const userStore = useUserStore();
  const stepperRef = useRef<Stepper>(null);
  const [selectedInsurance, setSelectedInsurance] =
    useState<HealthInsurance | null>(null);
  const [livingArea, setLivingArea] = useState("");
  const [zipCode, setZipCode] = useState("");
  const healthInsurances: HealthInsurance[] = [
    { label: "AOK", value: "aok" },
    { label: "Techniker Krankenkasse (TK)", value: "tk" },
    { label: "BARMER", value: "barmer" },
    { label: "DAK-Gesundheit", value: "dak" },
    { label: "IKK classic", value: "ikk_classic" },
    { label: "Allianz Private", value: "allianz" },
    { label: "BUPA", value: "bupa" },
    { label: "Andere", value: "other" },
  ];

  const handleNext = () => {
    stepperRef?.current?.nextCallback();
  };

  const handleBack = () => {
    stepperRef?.current?.prevCallback();
  };

  const handleComplete = () => {
    // Save onboarding data (you can implement your storage logic here)
    console.log("Onboarding completed:", {
      insurance: selectedInsurance,
      area: livingArea,
    });

    userStore.setHealthInsurance({
      name: selectedInsurance?.label || "",
      key: selectedInsurance?.value || "",
    });
    userStore.setUserLocation({
      city: livingArea,
      zip: zipCode,
    });

    // Navigate to home
    router.push("/home");
  };

  const isStep1Valid = selectedInsurance !== null;
  const isStep2Valid =
    livingArea.trim().length > 0 && zipCode.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 mt-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h1>
          <p className="text-gray-600">Let's set up your profile</p>
        </div>

        <Card className="mb-6">
          <Stepper ref={stepperRef} className="mb-6" linear>
            <StepperPanel header="Insurance">
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="insurance"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Choose your health insurance
                  </label>
                  <Dropdown
                    id="insurance"
                    value={selectedInsurance}
                    options={healthInsurances}
                    useOptionAsValue
                    onChange={(e) => setSelectedInsurance(e.value)}
                    placeholder="Select health insurance"
                    className="w-full"
                    filter
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    label="Next"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                  />
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-gray-500">Step 1 of 2</p>
              </div>
            </StepperPanel>

            <StepperPanel header="Location">
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="area"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    In which city/region do you live?
                  </label>
                  <InputText
                    id="area"
                    value={livingArea}
                    onChange={(e) => setLivingArea(e.target.value)}
                    placeholder="e.g. Nuremberg, Munich, ..."
                    className="w-full"
                  />

                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1 mt-4"
                  >
                    ZIP Code
                  </label>
                  <InputText
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="e.g. 90402"
                    className="w-full"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    label="Back"
                    icon="pi pi-arrow-left"
                    outlined
                    onClick={handleBack}
                  />
                  <Button
                    label="Finish"
                    icon="pi pi-check"
                    iconPos="right"
                    onClick={handleComplete}
                    disabled={!isStep2Valid}
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">Step 2 of 2</p>
                </div>
              </div>
            </StepperPanel>
          </Stepper>
        </Card>
      </div>
    </div>
  );
}
