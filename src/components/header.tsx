import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

const Header = ({
  emptyTargetHandleCounts,
}: {
  emptyTargetHandleCounts: number;
}) => {
  return (
    <header>
      <nav className="flex justify-end items-center bg-gray-100 px-4 py-2">
        <Button
          onClick={() => {
            if (emptyTargetHandleCounts >= 2) {
              toast({
                title: "Error",
                description: "Please connect all nodes",
                variant: "destructive",
              });
            } else {
              toast({
                title: "Success",
                description: "Changes saved",
                variant: "success",
              });
            }
          }}
          variant="outline"
        >
          Save changes
        </Button>
      </nav>
    </header>
  );
};

export default Header;
