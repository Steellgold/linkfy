import { Text } from "#/lib/components/atoms/text";
import type { ReactElement } from "react";

const APIPage = (): ReactElement => {

  return (
    <div className="mx-auto max-w-screen-md items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-white md:text-2xl">Linkfy&nbsp;
        <span className="free">API</span>
      </h1>
      <Text>Generate your links shortened with our API directly from your own application.</Text>
    </div>
  );
};

export default APIPage;