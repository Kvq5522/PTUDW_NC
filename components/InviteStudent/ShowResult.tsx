import { useState } from "react";
import Loader from "@/components/Loader/Loader";

const ShowResult = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  return (
    <div className="search-result">
      {
        isLoading ? (
          <Loader className="w-[100%] h-[100%]" text="Loading..." />
        ) : (
          <>
            Show Result
          </>
        )
      }
    </div>
  );
}

export default ShowResult;