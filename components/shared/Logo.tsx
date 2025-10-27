import Image from "next/image";
import Link from "next/link";

interface Props {
  url?: string;
}

function Logo({ url }: Props) {
  return (
    <Link href={url || "/"} className="flex items-center">
      <Image
        src="/logo.webp"
        alt="O'zagrosug'urta logo"
        width={240}
        height={240}
        className="block dark:hidden"
        priority
      />
      <Image
        src="/logo-white.webp"
        alt="O'zagrosug'urta logo"
        width={240}
        height={240}
        className="hidden dark:block"
        priority
      />
    </Link>
  );
}

export default Logo;
