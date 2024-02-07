import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
} from "react-native-health";
import { useCallback, useEffect, useState } from "react";
import { isIOS } from "@freakycoder/react-native-helpers";

const { Permissions } = AppleHealthKit.Constants;

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      Permissions.Steps,
      Permissions.FlightsClimbed,
      Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

const useHealthKit = (date: string = new Date().toISOString()) => {
  const [steps, setSteps] = useState(0);
  const [hasPermissions, setHasPermission] = useState(false);

  useEffect(() => {
    if (!isIOS) {
      return;
    }

    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        // TODO: Handle the error to let the user know what's going on
        console.log("Error getting permissions");
        return;
      }
      setHasPermission(true);
    });
  }, []);

  const queryStepData = useCallback(() => {
    const options: HealthInputOptions = {
      date,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps");
        return;
      }
      setSteps(results.value);
    });
  }, [date]);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    // Query Health data
    queryStepData();
  }, [hasPermissions, queryStepData]);

  return { steps, hasPermissions };
};
export default useHealthKit;
