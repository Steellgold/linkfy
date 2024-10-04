import { Component } from "@/components/component";
import { ReactElement } from "react";

type ErrorLayoutCardProps = {
  title: string;
  description: string;
  actions: ReactElement[];
}

export const ErrorLayoutCard: Component<ErrorLayoutCardProps> = ({ title, description, actions }) => {
  return (
    <div className="container bg-primary/5 dark:bg-primary/5 mx-auto p-4 rounded-lg text-center">
      <div className="mb-7 mt-7">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-4">
          {actions}
        </div>
      </div>
    </div>
  );
}