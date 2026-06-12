import React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PricingCardProps {
  tier: "Developer" | "Professional" | "Enterprise"
  price: string
  description: string
  credits: string
  features: string[]
  popular?: boolean
  currentPlan?: boolean
  onSelect?: () => void
}

export default function PricingCard({
  tier,
  price,
  description,
  credits,
  features,
  popular = false,
  currentPlan = false,
  onSelect
}: PricingCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "border rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all relative bg-white",
        currentPlan
          ? "border-primary bg-primary/5 ring-2 ring-primary/10"
          : "border-slate-200 hover:bg-slate-50"
      )}
    >
      {popular && (
        <span className="absolute top-3 right-3 text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wide">
          Popular
        </span>
      )}
      {!popular && currentPlan && (
        <span className="absolute top-3 right-3 text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wide">
          Active
        </span>
      )}
      
      <div>
        <h4 className="text-sm font-extrabold text-slate-900">{tier}</h4>
        <p className="text-[10px] text-slate-400 leading-relaxed mt-1">{description}</p>
        
        <div className="my-4">
          <span className="text-2xl font-black text-slate-900">{price}</span>
          {price !== "Custom" && <span className="text-xs text-slate-400 font-medium"> / month</span>}
        </div>

        <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-200/50 pt-4">
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-agri shrink-0" />
            <span className="font-semibold text-slate-700">{credits}</span>
          </li>
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-agri shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          if (onSelect) onSelect()
        }}
        className={cn(
          "w-full h-9 rounded-lg text-xs font-bold transition-colors mt-6 border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          currentPlan
            ? "bg-white border-slate-200 text-slate-500 cursor-default"
            : "bg-primary hover:bg-[#114524] text-white border-transparent"
        )}
        disabled={currentPlan}
      >
        {currentPlan ? "Current Plan" : tier === "Enterprise" ? "Contact Sales" : "Choose Plan"}
      </button>
    </div>
  )
}
