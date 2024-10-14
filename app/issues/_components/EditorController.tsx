import "easymde/dist/easymde.min.css";
import { Controller } from "react-hook-form";
import SimpleEditor from "react-simplemde-editor";

interface EditorControllerProps {
  control: any;
  fieldName: string;
  defaultValue?: string;
}

function EditorController({ control, fieldName, defaultValue }: EditorControllerProps) {
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => <SimpleEditor placeholder="Description" {...field} />}
    />
  );
}

export default EditorController;
