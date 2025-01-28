import { Card } from "@/components/ui/card";
import { Image } from "react-feather";

interface FormContentWrapperProps {
  children: React.ReactNode;
}

export default function FormContentWrapper({
  children,
}: FormContentWrapperProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row">
        {/* Left Card */}
        <div className="hidden h-full w-full max-w-3xl items-center justify-center lg:flex lg:w-1/2 lg:px-2 lg:py-10">
          <Card className="flex h-full max-h-[700px] w-full items-center justify-center rounded-lg">
            <Image color="#595959" />
          </Card>
        </div>

        {/* Right Card */}
        <div className="flex h-full w-full max-w-lg items-center justify-center sm:h-full sm:w-full lg:w-1/2 lg:px-2 lg:py-10">
          <Card className="flex h-full max-h-[700px] min-h-[400px] w-full items-center justify-center rounded-lg sm:h-full sm:w-full lg:max-h-[700px]">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}
