import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.webp"
        alt="O'zagrosug'urta logo"
        width={240}
        height={240}
        priority
      />
    </Link>
  );
}

export default Logo;
