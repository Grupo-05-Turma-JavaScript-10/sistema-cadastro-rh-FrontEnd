import { type ElementType } from "react";
import { Card } from "../ui/Card"; 

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: ElementType; 
  trend?: "positive" | "negative" | "neutral";
}

export function StatCard({ title, value, subtext, icon: Icon, trend = "positive" }: StatCardProps) {
  return (
    <Card>
      <div className="flex flex-col items-start">

        <div className="p-3 bg-primary-teal text-white rounded-lg mb-4 shadow-sm">
          <Icon size={24} />
        </div>
        
        <span className="text-sm text-metallic-silver font-medium">{title}</span>
        <h3 className="text-3xl font-bold text-corporate-slate mt-1">{value}</h3>
        
        <span className={`text-xs mt-2 font-bold ${
          trend === 'positive' ? 'text-success-green' : 
          trend === 'negative' ? 'text-error-red' : 'text-metallic-silver'
        }`}>
          {subtext}
        </span>
      </div>
    </Card>
  );
}