// File: apps/web/src/components/Stepper.tsx
'use client';

import { CheckCircle, Paintbrush, Mic2, Code, FileText, LayoutTemplate } from 'lucide-react';
import { useProjectStore } from '@/store/useProjectStore';
import { Separator } from '@/components/ui/separator';

const steps = [
  { step: 0, name: 'Brief Produk', icon: FileText },
  { step: 1, name: 'Brand Voice', icon: Mic2 },       // 👈 Geser ke Step 1
  { step: 2, name: 'Generate Copy', icon: Code },     // 👈 Geser ke Step 2
  { step: 3, name: 'Desain & Layout', icon: Paintbrush }, // 👈 Geser ke Step 3 (Gabung Desain & Layout)
  // Step 4: Result (Hidden dari list tapi ada di logic)
];

export function Stepper() {
  const { step, setStep } = useProjectStore();

  return (
    <div className="flex items-center justify-between space-x-4">
      {steps.map((s, index) => {
        const isCompleted = step > s.step;
        const isActive = step === s.step;
        const isInteractive = s.step < 3; // Hanya 3 langkah pertama yang bisa di-klik

        // Tentukan warna dan style
        let statusClass = 'text-muted-foreground';
        if (isCompleted) {
          statusClass = 'text-primary font-medium';
        } else if (isActive) {
          statusClass = 'text-primary font-semibold';
        }
        
        return (
          <div key={s.step} className="flex items-center flex-1">
            {/* Bagian Icon & Label */}
            <button
              onClick={() => isInteractive && setStep(s.step)}
              disabled={!isInteractive}
              className={`flex items-center space-x-2 transition-colors ${
                isInteractive ? 'hover:text-primary/80 cursor-pointer' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${isCompleted ? 'bg-primary border-primary' : isActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/50'}`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <s.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                )}
              </div>
              <span className={`hidden sm:inline text-sm whitespace-nowrap ${statusClass}`}>
                {s.name}
              </span>
            </button>
            
            {/* Separator Line */}
            {index < steps.length - 1 && (
              <Separator 
                className={`flex-1 mx-2 h-0.5 ${isCompleted ? 'bg-primary' : 'bg-border'}`} 
                orientation="horizontal" 
              />
            )}
          </div>
        );
      })}
    </div>
  );
}