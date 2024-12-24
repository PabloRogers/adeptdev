import { Card } from "@/components/ui/card";

interface FormContentWrapperProps {
  children: React.ReactNode;
}

export default function FormContentWrapper({
  children,
}: FormContentWrapperProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-screen w-full flex-col items-center justify-center lg:flex-row">
        <div className="hidden h-full w-full items-center justify-center px-2 lg:flex lg:w-1/2 lg:py-10">
          <Card className="flex h-full max-h-[800px] w-full flex-grow items-center justify-center rounded-lg">
            hero
          </Card>
        </div>
        <div className="flex h-full w-full max-w-xl items-center justify-center px-2 lg:w-1/2 lg:py-10">
          <Card className="flex h-full max-h-[800px] w-full items-center justify-center rounded-lg">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}
