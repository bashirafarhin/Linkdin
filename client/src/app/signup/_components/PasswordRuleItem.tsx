import { CheckCircle, Circle, XCircle } from "lucide-react";

type Props = {
  label: string;
  passed: boolean;
  hasError: boolean;
};

const PasswordRuleItem = ({ label, passed, hasError }: Props) => {
  const color = hasError
    ? "text-red-500"
    : passed
    ? "text-green-500"
    : "text-gray-500";

  const Icon = hasError ? XCircle : passed ? CheckCircle : Circle;

  return (
    <div className={`flex items-center gap-2 ${color}`}>
      <Icon size={16} />
      <span>{label}</span>
    </div>
  );
};

export default PasswordRuleItem;
