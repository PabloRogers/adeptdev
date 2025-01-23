import { Card } from "@/components/ui/card";
import { Image } from "react-feather";

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
          <Card className="flex h-full w-full items-center justify-center rounded-lg">
            <Image color="#595959" />
          </Card>
        </div>
        <div className="flex h-full w-full max-w-xl items-center justify-center px-2 lg:w-1/2 lg:py-10">
          <Card className="flex h-full min-h-screen w-full items-center justify-center rounded-lg lg:min-h-full">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}
