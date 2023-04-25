import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AppRoot } from "./AppRoot";

test("test", async () => {
  const user = userEvent.setup()
  const app = render(<AppRoot />)

  const textareaFrom = app.getByPlaceholderText("Introducir texto")
  await user.type(textareaFrom, "Hola")
  const result = await app.findByDisplayValue('hello world', {}, { timeout: 6000})

  expect(result).toBeTruthy();
});
