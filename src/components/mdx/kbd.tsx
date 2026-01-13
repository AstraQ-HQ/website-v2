const keyboardSymbolMap: Record<string, string> = {
  Cmd: "⌘",
  Command: "⌘",
  Ctrl: "^",
  Control: "^",
  Alt: "⌥",
  Option: "⌥",
  Shift: "⇧",
  Tab: "⇥",
  Enter: "↩",
  Return: "↩",
  Backspace: "⌫",
  Delete: "⌦",
  Escape: "⎋",
  Esc: "⎋",
  Space: "␣",
  Up: "↑",
  Down: "↓",
  Left: "←",
  Right: "→",
  Home: "↖",
  End: "↘",
  PageUp: "⇞",
  PageDown: "⇟",
  CapsLock: "⇪",
};

const replaceKeyboardShortcuts = (input: string) => {
  let result = input;

  const keys = Object.keys(keyboardSymbolMap);
  const pattern = new RegExp(`\\b(${keys.join("|")})\\b`, "gi");

  result = result.replace(pattern, (match) => {
    const key = keys.find((k) => k.toLowerCase() === match.toLowerCase());
    // biome-ignore lint/style/noNonNullAssertion: It is guaranteed that the key will be found
    return key ? keyboardSymbolMap[key]! : match;
  });

  return result;
};

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="my-1 rounded-sm border-b-2 border-b-muted-foreground/50 bg-muted px-1.5 py-0.5 font-mono text-sm">
      {replaceKeyboardShortcuts(children as string)}
    </span>
  );
}
