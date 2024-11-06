interface FormContentWrapperProps {
  children: React.ReactNode;
}

export default function FormContentWrapper({
  children,
}: FormContentWrapperProps) {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="hidden md:flex justify-center items-center w-full md:w-1/2">
        image
      </div>
      <div className="flex justify-center items-center w-full md:w-1/2 p-10">
        <div className="w-full h-full bg-card rounded-lg flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
