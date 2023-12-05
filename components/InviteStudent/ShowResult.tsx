import { useState } from "react";
import Loader from "@/components/Loader/Loader";

const ShowResult = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  return (
    <div className="search-result">
      {
        isLoading ? (
          <Loader className="w-[100%] h-[100%]" text="Loading..." />
        ) : (
          <>
            <div className="h-[50px] bg-slate-600 mb-1">Show Result</div>
            <div className="h-[50px] bg-slate-600 mb-1">Show Result</div>
            <div className="h-[50px] bg-slate-600 mb-1">Show Result</div>
            <div className="h-[50px] bg-slate-600 mb-1">Show Result</div>
            <div className="h-[50px] bg-slate-600 mb-1">Show Result</div>
            <div className="h-[50px] bg-slate-600 mb-1">Show Result</div>
            <div className="h-[50px] bg-slate-600 mb-1">Show Result</div>
          </>
        )
      }
    </div>
  );
}

export default ShowResult;