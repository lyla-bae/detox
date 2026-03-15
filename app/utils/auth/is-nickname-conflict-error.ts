export function isNicknameConflictError(error: {
  code?: string | null;
  message?: string | null;
  details?: string | null;
  hint?: string | null;
}) {
  const errorMessage = [
    error.message ?? "",
    error.details ?? "",
    error.hint ?? "",
  ]
    .join(" ")
    .toLowerCase();

  const isUniqueViolation =
    error.code === "23505" || errorMessage.includes("duplicate key");

  return isUniqueViolation && errorMessage.includes("nickname");
}
