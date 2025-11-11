import Image from "next/image";
import Link from "next/link";

interface Props {
  url?: string;
}

function Logo({ url }: Props) {
  return (
    <Link href={url || "/"} className="flex items-center justify-center">
      <Image
        src="/logo.webp"
        alt="O'zagrosug'urta logo"
        width={200}
        height={200}
        className="block dark:hidden object-contain"
        priority
        sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px"
      />

      <Image
        src="/logo-white.webp"
        alt="O'zagrosug'urta logo"
        width={200}
        height={200}
        className="hidden dark:block object-contain drop-shadow-lg"
        priority
        sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px"
      />
    </Link>
  );
}

export default Logo;
