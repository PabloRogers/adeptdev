interface FormHeaderProps {
  children: React.ReactNode;
}

function FormHeader({ children }: FormHeaderProps) {
  return <div className="grid gap-2 text-center">{children}test</div>;
}

function MainHeader({ children }: FormHeaderProps) {
  return <h1 className="text-3xl font-bold">{children}</h1>;
}

function SubHeader({ children }: FormHeaderProps) {
  return <p className="text-balance text-muted-foreground">{children}</p>;
}

FormHeader.MainHeader = MainHeader;
FormHeader.SubHeader = SubHeader;

export default FormHeader;
