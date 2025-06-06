import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type PillProps = {
  text: string;
  color?: "default" | "destructive" | "sucess" | "custom";
};

const Pill = ({ text, color = "default" }: PillProps) => {
  const colorMap = {
    default: "",
    destructive: "bg-red-500 text-white",
    sucess: "bg-green-500 text-white",
    custom: "bg-purple-500 text-white border-purple-900",
  };
  return (
    <Badge className={cn("rounded-full px-3 py-1 text-sm", colorMap[color])}>
      {text}
    </Badge>
  );
};

export default Pill;
