interface DataToRetrieveTranslation {
  from: "en" | "fr" | "es";
  to: "en" | "fr" | "es";
  text: string;
}

interface DataToAddTranslation {
  from: "en" | "fr" | "es";
  to: "en" | "fr" | "es";
  originalContent: string;
  translatedContent: string;
}
