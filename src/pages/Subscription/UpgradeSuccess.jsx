import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getUserSubscription,
  upgradeSubscription,
} from "@/Redux/Subscription/Action";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpgradeSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscription } = useSelector((store) => store);

  const queryParams = new URLSearchParams(location.search);

  const paymentId = queryParams.get("payment_id");
  const planType = queryParams.get("planType");

  useEffect(() => {
    dispatch(upgradeSubscription({ planType }));
    dispatch(getUserSubscription());
  }, []);
  return (
    <div className="flex justify-center">
      <Card className="flex flex-col items-center p-5 mt-20 space-y-5">
        <div className="flex items-center gap-4">
          <CheckCircledIcon className="text-green-500 h-9 w-9" />
          <p className="text-xl">Suscripción actualizada correctamente</p>
        </div>
        <div className="space-y-3">
          <p className="text-green-500">
            Fecha de inicio de la suscripción:{" "}
            {subscription.userSubscription?.subscriptionStartDate}
          </p>
          <p className="text-red-500">
            Fecha de finalización de la suscripción:{" "}
            {subscription.userSubscription?.getSubscriptionEndDate}
          </p>
          <p className="">
            Plan escogido: {subscription.userSubscription?.planType}
          </p>
        </div>
        <Button onClick={() => navigate("/")}>Volver</Button>
      </Card>
    </div>
  );
};

export default UpgradeSuccess;
