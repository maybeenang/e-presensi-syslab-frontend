import { Spinner } from "@material-tailwind/react";

export const LoadingPage = () => {
  return (
    <div className="grid h-screen w-screen place-content-center">
      <Spinner className="h-16 w-16 text-blue-500/10" />
    </div>
  );
};
