import { cn } from "@/lib/utils";

interface ABCLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ABCLogo({ className, size = "md" }: ABCLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm", 
    lg: "w-16 h-16 text-base"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* ABC 6 inspired circular logo */}
      <div className="relative">
        <div className={cn(
          "rounded-full bg-gradient-to-br from-abc-gray to-abc-dark flex items-center justify-center font-bold text-white shadow-lg",
          sizeClasses[size]
        )}>
          ab
        </div>
        {/* Small accent circle */}
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-abc-green shadow-sm"></div>
      </div>
      
      {/* Typography inspired by broadcast design */}
      <div className="flex flex-col">
        <span className="font-bold text-foreground leading-tight">
          Alexis Brochu
        </span>
        <span className="text-xs text-abc-green font-medium">
          CREATIVE DIRECTOR
        </span>
      </div>
    </div>
  );
}