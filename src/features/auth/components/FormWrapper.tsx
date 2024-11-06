interface FormWrapperProps {
  children: React.ReactNode;
}
export default function FormWrapper({ children }: FormWrapperProps) {
  return <div className="max-w-md w-full space-y-5">{children}</div>;
}
