"use client";

import { redirect, useParams } from "next/navigation";

const StatsPage = (): void => {
  const list = ["az45", "aB2c"];
  const { short } = useParams();

  if (!list.includes(short)) {
    redirect("/history");
  }

  redirect(("stats/clicks").replace("{short}", short));
};

export default StatsPage;