import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SubscriptionCard = ({ data, currentPlan }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate(`/upgrade_plan/success?planType=${data.planType}`);
  };

  const isCurrentPlan = data.planType === currentPlan;

  return (
    <div className="rounded-xl bg-[#1c1917] bg-opacity-20 shadow-[#14532d] shadow-2xl card p-5 space-y-5 w-[18rem]">
      <p>{data.planName}</p>
      <p>
        <span className="text-xl font-semibold">{data.price} € / </span>
        <span>{data.planType}</span>
      </p>
      {data.planType === "ANUAL" && (
        <p className="text-green-500">30% de descuento</p>
      )}

      <div>
        {data.features.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <CheckCircledIcon />
            <p>{item}</p>
          </div>
        ))}
      </div>

      <Button
        onClick={handleUpgrade}
        className="w-full"
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? "Plan Actual" : "Contratar"}
      </Button>
    </div>
  );
};

export default SubscriptionCard;
