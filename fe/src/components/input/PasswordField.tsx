import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText, InputTextProps } from "primereact/inputtext";
import { useState } from "react";

export default function PasswordField(props: InputTextProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <IconField iconPosition="right">
      <InputIcon
        onClick={() => setShowPassword(!showPassword)}
        className={`me-2 pi ${!showPassword ? "pi-eye-slash" : "pi-eye"}`}
      />
      <InputText {...props} type={showPassword ? "text" : "password"} />
    </IconField>
  );
}
