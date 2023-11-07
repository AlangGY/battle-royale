import { useState, useEffect } from "react";
import { ReactiveModel } from "./ReactiveModel";

export const useReactiveModel = <T extends ReactiveModel>(
  ...instances: T[]
) => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const subscriber = () => {
      forceUpdate((prev) => prev + 1);
    };

    instances.forEach((instance) => instance.addSubscriber(subscriber));

    return () => {
      instances.forEach((instance) => instance.removeSubscriber(subscriber));
    };
  }, [instances]);

  return instances;
};
