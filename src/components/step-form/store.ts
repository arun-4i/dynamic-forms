import { stepFormSchema } from "@/schemas/step-form-schema";
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type StepFormState = Partial<stepFormSchema> & {
    setData: (data: Partial<stepFormSchema>) => void;
};

export const useStepFormStore = create<StepFormState>()(
    persist(
        (set) => ({
            setData: (data) => set(data),
        }),
        {
            name: 'step-form-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);