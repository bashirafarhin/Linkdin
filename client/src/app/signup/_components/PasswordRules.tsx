import { rules } from "./PasswordRulesConfig";
import PasswordRuleItem from "./PasswordRuleItem";

interface Props {
  value: string;
  zodError?: string;
}

const PasswordRules = ({ value, zodError }: Props) => {
  return (
    <div className="text-sm">
      {rules.map((rule, index) => (
        <PasswordRuleItem
          key={index}
          label={rule.label}
          passed={rule.test(value)}
          hasError={!!zodError && !rule.test(value)}
        />
      ))}
    </div>
  );
};

export default PasswordRules;
