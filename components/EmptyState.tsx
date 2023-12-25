"use client";

import { useRouter } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import IconButton from "@/components/Button/IconButton";
import { cn } from "@/lib/utils";
interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  subTitle = "Try adjusting your search or filter to find what you're looking for",
  showReset,
  className,
}) => {
  const router = useRouter();

  return (
    <div className={cn("w-full h-full flex flex-col gap-2 justify-center items-center ", className)}>
      <Heading title={title} subTitle={subTitle} center />

      <div className="w-48 mt-4">
        {showReset && (
          <IconButton
            outline
            label="Return to dashboard"
            onClick={() => router.push("/dashboard")}
          ></IconButton>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
