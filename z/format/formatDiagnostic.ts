import { Diagnostic } from "vscode-languageserver-types";
import { title } from "../components";
import { d } from "../utils";
import { embedSymbolLinks } from "./embedSymbolLinks";
import { formatDiagnosticMessage } from "./formatDiagnosticMessage";
import { identSentences } from "./identSentences";
import { translate } from "./translate";

export function formatDiagnostic(
  diagnostic: Diagnostic,
  format: (type: string) => string
) {
  const newDiagnostic = embedSymbolLinks(diagnostic);

  const formattedMessage = formatDiagnosticMessage(
    identSentences(newDiagnostic.message),
    format
  );

  return d/*html*/ `
    ${title(diagnostic)}
    <span>
    ${translate(formattedMessage, diagnostic)}
    </span>
  `;
}
