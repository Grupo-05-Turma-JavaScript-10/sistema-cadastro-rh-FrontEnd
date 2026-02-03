import { type ElementType, type ReactNode } from "react";
import { Card } from "./Card"; 

interface StatCardProps {
  title: ReactNode; // <-- Alterado de string para ReactNode
  value: string | number;
  icon?: ElementType; 
  subtext?: ReactNode;  // <-- Alterado de string para ReactNode
  trend?: "positive" | "negative" | "neutral";

  variant?: "default" | "success" | "brand"; 
}

export function StatCard({ 
  title, 
  value, 
  subtext, 
  icon: Icon, 
  trend,
  variant = "default"
}: StatCardProps) {

  const valueColors = {
    default: "text-corporate-slate",
    success: "text-success-green",
    brand: "text-primary-teal",
  };

  const trendColors = {
    positive: "text-success-green",
    negative: "text-error-red",
    neutral: "text-metallic-silver",
  };

  return (
    <Card>
      <div className="flex flex-col items-start h-full justify-between">
        {Icon && (
          <div className="p-3 bg-primary-teal text-white rounded-lg mb-4 shadow-sm">
            <Icon size={24} />
          </div>
        )}
        
        <div>
          <span className="text-sm text-metallic-silver font-medium block mb-1">
            {title}
          </span>
          
          <h3 className={`text-3xl font-bold ${valueColors[variant]}`}>
            {value}
          </h3>
          
          {subtext && (
            <span className={`text-xs mt-2 font-bold ${trend ? trendColors[trend] : 'text-metallic-silver'}`}>
              {subtext}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
