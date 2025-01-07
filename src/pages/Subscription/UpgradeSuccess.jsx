import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"

const UpgradeSuccess = () => {
    const navigate= useNavigate();
  return (
    <div className="flex justify-center">
        <Card className="mt-20 space-y-5 flex flex-col items-center">
            <div className="flex items-center gap-4">
                <CheckCircledIcon className="h-9 w-9 text-green-500"/>
                <p className="text-xl">Suscripción actualizada correctamente</p>

            </div>
            <div className="space-y-3">
                <p className="text-green-500">
                    Fecha de inicio de la suscripción:
                </p>
                <p className="text-red-500">
                    Fecha de finalización de la suscripción:
                </p>
                <p className="">
                    Plan escogido:
                </p>
            </div>
            <Button onClick={()=>navigate("/")}>

            </Button>
        </Card>

    </div>
  )
}

export default UpgradeSuccess