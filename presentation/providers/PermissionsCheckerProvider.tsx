import { PermissionStatus } from "@/infraestructure/interfaces/location";
import { router } from "expo-router";
import React, { PropsWithChildren, useEffect } from "react";
import { usePermissionsStore } from "../store/usePermissionsStore";
import { AppState } from "react-native";

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionsStore();

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {
      router.replace("/map");
    } else if (locationStatus !== PermissionStatus.CHECKING) {
      router.replace("/permissions");
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const suscription = AppState.addEventListener("change", (nextAppState) => {
      if(nextAppState==="active"){
        checkLocationPermission()
      }
    });

    return () => {
      suscription.remove();
    };
  }, []);

  return <>{children}</>;
};

export default PermissionsCheckerProvider;
