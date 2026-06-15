"use client";

import { useEffect, useState } from "react";

export default function DynamicDate() {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setDate(
      now.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return <span suppressHydrationWarning>{date}</span>;
}
