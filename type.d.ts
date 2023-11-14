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

interface UserWithPopulatedTransactions {
  _id: string;
  name: string;
  auth0Id: string;
  email: string;
  translations: (Translation & { _id: string })[];
}
