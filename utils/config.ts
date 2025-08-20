export function capitalizeEachWord(word: string): string {
  const arr = word.split(" ");
  const mapped = arr.map((e: string) => {
    return e[0].toUpperCase() + e.slice(1).toLowerCase();
  });

  return mapped.join(" ");
}

export function getDateValue(date: Date | number, _type: "short" | "long" = "long") {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export const selectUserData = "first_name last_name email role address mobile student_number";

export function sortArray(arr: any[]) {
  const array = arr?.sort((a, b) => {
    if (a?.createdAt > b?.createdAt) return -1;
    else return 1;
  });

  return array;
}

export function calculateCompletionPercentage<T extends { is_completed: boolean }>(
  items: T[]
): number {
  if (items.length === 0) return 0;

  const completedCount = items.filter((item) => item.is_completed).length;
  return (completedCount / items.length) * 100;
}

export function calPercentageExtended<T extends NonNullable<unknown>, K extends keyof T>({
  group,
  key,
  expects,
}: {
  group: T[];
  key: K;
  expects?: T[K];
}) {
  const sum = group.length;
  const sumUnique = group
    .map((g) => g[key])
    .filter((g) => (expects ? g == expects : !!expects)).length;
  return (sumUnique / sum) * 100;
}

export const notificationTypeOptions = [
  "normal",
  "broadcasts",
  "security",
  "account",
  "feature",
  "wallet",
];
