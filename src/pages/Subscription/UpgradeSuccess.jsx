import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getUserSubscription,
  upgradeSubscription,
} from "@/Redux/Subscription/Action";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpgradeSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscription } = useSelector((store) => store);
  const [finalDate, setFinalDate] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const planType = queryParams.get("planType");

  useEffect(() => {
    if (planType) {
      dispatch(upgradeSubscription({ planType }));
    }

    dispatch(getUserSubscription());

    if (planType) {
      const currentDate = new Date();
      const formattedStartDate = currentDate.toLocaleDateString();

      if (planType === "MENSUAL") {
        currentDate.setMonth(currentDate.getMonth() + 1);
        newEndDate = currentDate.toLocaleDateString();
      } else if (planType === "ANUAL") {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        newEndDate = currentDate.toLocaleDateString();
      }

      setFinalDate(newEndDate);
    }
  }, [dispatch, planType]);

  return (
    <div className="flex justify-center">
      <Card className="flex flex-col items-center p-5 mt-20 space-y-5">
        <div className="flex items-center gap-4">
          <CheckCircledIcon className="text-green-500 h-9 w-9" />
          <p className="text-xl">Suscripción actualizada correctamente</p>
        </div>
        <div className="space-y-3">
          <p className="text-green-500">
            Fecha de inicio de la suscripción: {new Date().toLocaleDateString()}
          </p>
          {finalDate ? (
            <p className="text-red-500">
              Fecha de finalización de la suscripción: {finalDate}
            </p>
          ) : (
            <p className="text-gray-500">Fecha de finalización no disponible</p>
          )}
          <p>Plan escogido: {planType}</p>
        </div>
        <Button onClick={() => navigate("/")}>Volver</Button>
      </Card>
    </div>
  );
};

export default UpgradeSuccess;
