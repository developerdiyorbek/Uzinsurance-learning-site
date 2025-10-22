import { BiSolidMessageRoundedError } from "react-icons/bi";

function ErrorComponent() {
  return (
    <div className="flex items-center flex-col gap-4 justify-center mt-5">
      <BiSolidMessageRoundedError
        className="text-muted-foreground max-md:size-[24px] size-[50px] animate-pulse"
        size={30}
      />
      <p className="text-muted-foreground text-lg max-md:text-sm">
        Kutilmagan xatolik!
      </p>
    </div>
  );
}

export default ErrorComponent;
