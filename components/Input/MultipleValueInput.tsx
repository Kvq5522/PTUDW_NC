"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import * as z from "zod";

interface MultiValueInputProps {
  onChange: (values: string[]) => void;
  onError: (error: any) => void;
  onClearError: () => void;
  zodSchema: z.AnyZodObject;
}

const MultiValueInput: React.FC<MultiValueInputProps> = ({
  onChange,
  zodSchema,
  onError,
  onClearError,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValues, setInputValues] = useState<string[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue) {
      event.preventDefault();

      const parse = zodSchema.safeParse({
        input_value: inputValue,
      });

      if (!parse.success) {
        onError({
          type: "validation",
          message: parse.error.errors[0].message,
        });
        return;
      }

      if (inputValues.includes(inputValue)) {
        onError({
          type: "validation",
          message: "This value already exists",
        });
        return;
      }

      setInputValues([...inputValues, inputValue]);
      setInputValue("");
      onChange([...inputValues, inputValue]);
      onClearError();
    }
  };

  const handleDelete = (valueToDelete: string) => {
    const newInputValues = inputValues.filter(
      (value) => value !== valueToDelete
    );
    setInputValues(newInputValues);
    onChange(newInputValues);
  };

  return (
    <div>
      <Input
        placeholder="Type a value and press Enter..."
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />

      {inputValues.length > 0 && (
        <div className="border-[1px] rounded mt-4 p-2">
          <p>Your inputs:</p>

          {inputValues.map((value, index) => (
            <div key={index} className="flex justify-between">
              <span className="pt-[0.35rem]">{value}</span>
              <Button
                variant="ghost"
                onClick={() => handleDelete(value)}
                type="button"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiValueInput;
