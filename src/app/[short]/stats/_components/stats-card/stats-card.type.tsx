import type { ComponentPropsWithoutRef, PropsWithChildren, ReactElement } from "react";
import type { IconType } from "react-icons";

export type StatsCardProps = ComponentPropsWithoutRef<"div"> & PropsWithChildren & {
  title: string;
  description: string;
};

export type StatsCardGraphProps = ComponentPropsWithoutRef<"div">;

export type StatsCardRowProps = ComponentPropsWithoutRef<"div"> & {
  stats: {
    count: number;
    max: number;
  };
  title: string;
  icon?: ReactElement<IconType> | null;
};