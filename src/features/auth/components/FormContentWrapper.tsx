import { Card } from "@/components/ui/card";

interface FormContentWrapperProps {
  children: React.ReactNode;
}

export default function FormContentWrapper({
  children,
}: FormContentWrapperProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full h-screen max-w-[1400px]">
        <div className="hidden lg:flex justify-center items-center w-full lg:w-1/2 h-full py-10 px-2">
          <Card className="w-full h-full rounded-lg flex justify-center items-center ">
            hero
          </Card>
        </div>
        <div className="flex justify-center items-center h-full w-full lg:w-1/2 py-10 px-2">
          <Card className="w-full h-full rounded-lg flex justify-center items-center">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}
