interface FormWrapperProps {
  children: React.ReactNode;
}
export default function FormWrapper({ children }: FormWrapperProps) {
  return (
    <div className="w-[450px] p-10">
      <div className="w-full space-y-8">{children}</div>
    </div>
  );
}
