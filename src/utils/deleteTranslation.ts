export default async function deleteTranslation(
  translationId: string
): Promise<void> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/translation/${translationId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Error deleting translation");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in deleting translation function");
  }
}
