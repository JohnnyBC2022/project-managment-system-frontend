import { annualPlan, freePlan, paidPlan } from "@/constants";
import SubscriptionCard from "./SubscriptionCard";
import { useSelector } from "react-redux";

const Subscription = () => {
  const {subscription}=useSelector(store=>store)
  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">
        Planes y Precios
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <SubscriptionCard
          data={{
            planName: "Gratuito",
            features: freePlan,
            planType: "GRATUITO",
            price: 0,
            buttonName: subscription.userSubscription?.planType=="GRATUITO" ? "Plan Actual" : "Contratar",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Plan de Pago Mensual",
            features: paidPlan,
            planType: "MENSUAL",
            price: 9.99,
            buttonName: subscription.userSubscription?.planType=="MENSUAL" ? "Plan Actual" : "Contratar",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Plan de Pago Anual",
            features: annualPlan,
            planType: "ANUAL",
            price: 83.99,
            buttonName: subscription.userSubscription?.planType=="ANUAL" ? "Plan Actual" : "Contratar",
          }}
        />
      </div>
    </div>
  );
};

export default Subscription;
