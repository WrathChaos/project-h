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

// TODO: Move coefficients remote config to make it dynamic
enum FitnessCoefficients {
  steps = 10,
  flightsClimbed = 25,
  distanceWalkingRunning = 5,
}

const useHealthKit = (date: string = new Date().toISOString()) => {
  const [points, setPoints] = useState(0);
  const [steps, setSteps] = useState(0);
  const [flightsClimbed, setFlightsClimbed] = useState(0);
  const [distanceWalkingRunning, setDistanceWalkingRunning] = useState(0);
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

  const queryFlightsClimbedData = useCallback(() => {
    const options: HealthInputOptions = {
      date,
    };

    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log("Error getting the flights climbed");
        return;
      }
      setFlightsClimbed(results.value);
    });
  }, [date]);

  const queryDistanceWalkingRunningData = useCallback(() => {
    const options: HealthInputOptions = {
      date,
    };

    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log("Error getting the distance walking running");
        return;
      }
      setDistanceWalkingRunning(results.value);
    });
  }, [date]);

  const calculatePoints = useCallback(() => {
    return (
      steps * FitnessCoefficients.steps +
      flightsClimbed * FitnessCoefficients.flightsClimbed +
      Math.floor(distanceWalkingRunning) *
        FitnessCoefficients.distanceWalkingRunning
    );
  }, [steps, flightsClimbed, distanceWalkingRunning]);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    // Query Health data
    queryStepData();
    queryFlightsClimbedData();
    queryDistanceWalkingRunningData();

    // Calculate points and set points
    setPoints(calculatePoints());
  }, [
    hasPermissions,
    queryStepData,
    queryFlightsClimbedData,
    queryDistanceWalkingRunningData,
    calculatePoints,
  ]);

  return {
    points,
    steps,
    flightsClimbed,
    distanceWalkingRunning,
    hasPermissions,
  };
};
export default useHealthKit;
