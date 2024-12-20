import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

const CommentCard = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p>Jonathan</p>
          <p>¿Cuánto trabajo te queda por hacer?</p>
        </div>
      </div>
      <Button className="rounded-full" size="icon">
        <TrashIcon/>
      </Button>
    </div>
  );
};

export default CommentCard;
