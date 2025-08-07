"use client";

import dayjs from "dayjs";

export default function PostTime({ createdAt }: { createdAt: string }) {
  const now = dayjs();
  const created = dayjs(createdAt);
  const diff = now.diff(created, "day");
  return <>{`${diff} day${diff !== 1 ? "s" : ""} ago`}</>;
}
