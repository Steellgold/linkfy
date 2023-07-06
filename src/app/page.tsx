import type { ReactElement } from "react";
import { Card } from "#/lib/components/atoms/card";
import { Text } from "#/lib/components/atoms/text";

const HomePage = (): ReactElement => {
  return (
    <>
      {/* fixed middle screen in width */}
      <div className="flex items-center justify-center w-screen mt-10">
        <Card>
          <Text>Coucou</Text>
        </Card>
      </div>
    </>
  );
};

export default HomePage;