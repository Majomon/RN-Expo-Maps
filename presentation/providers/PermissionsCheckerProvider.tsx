import { PermissionStatus } from "@/infraestructure/interfaces/location";
import { router } from "expo-router";
import React, { PropsWithChildren, useEffect } from "react";
import { usePermissionsStore } from "../store/usePermissions";

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

  //TODO
  //Estar pendiente cuando el estado de la aplicación cambia

  return <>{children}</>;
};

export default PermissionsCheckerProvider;
