import React from "react";
import { createPortal } from "react-dom";

import { IconCopyboard } from "../Icons/clipboard";

import { Toaster, toast } from "sonner";

interface Props {
  value: string;
}

export const Clipboard: React.FC<Props> = ({ value }) => {
  const onHandleClipboard = async () => {
    if (!value) {
      toast.error("Ingrese un texto a traducir para ser copiado");
    } else {
      navigator.clipboard.writeText(value);
      toast.success("Texto copiado en portapapeles");
    }
  };

  return (
    <React.Fragment>
      <button
        type="button"
        style={{
          backgroundColor: "transparent",
        }}
        onClick={onHandleClipboard}
      >
        <IconCopyboard />
      </button>
      {createPortal(<Toaster richColors />, document.body)}
    </React.Fragment>
  );
};
