type NicknameConflictErrorLike = {
  code?: string | null;
  message?: string | null;
  details?: string | null;
  hint?: string | null;
};

export function isNicknameConflictError(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const typedError = error as NicknameConflictErrorLike;
  const errorMessage = [
    typedError.message ?? "",
    typedError.details ?? "",
    typedError.hint ?? "",
  ]
    .join(" ")
    .toLowerCase();

  const isUniqueViolation =
    typedError.code === "23505" || errorMessage.includes("duplicate key");

  return isUniqueViolation && errorMessage.includes("nickname");
}
