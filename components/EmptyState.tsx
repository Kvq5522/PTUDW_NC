"use client";

import { useRouter } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import IconButton from "@/components/Button/IconButton";
interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  subTitle = "Try adjusting your search or filter to find what you're looking for",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[100%] w-[100%] flex flex-col gap-2 justify-center items-center">
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
