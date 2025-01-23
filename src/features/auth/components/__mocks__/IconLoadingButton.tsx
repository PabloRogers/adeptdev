import { IconLoadingButtonProps } from "@/components/IconLoadingButton";

export default function MockIconLoadingButton({
  isExecuting,
  Icon,
  text = "text",
  ...props
}: IconLoadingButtonProps) {
  return (
    <button type="button" disabled={isExecuting} {...props}>
      <Icon data-testid="icon" />
      {text}
    </button>
  );
}
