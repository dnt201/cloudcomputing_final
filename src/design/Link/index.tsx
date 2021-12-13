import { FC, MouseEvent } from "react";
import { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ILink extends LinkProps {}

const Link: FC<ILink> = (props) => {
  const { children, href, shallow } = props;

  const router = useRouter();

  const handleLoading = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!shallow) {
      e.preventDefault();
      router.push(href);
    }
  };
  return (
    <a
      {...props}
      onClick={(e) => handleLoading(e)}
      href={href.toString() || "/notfound"}
    >
      {children}
    </a>
  );
};

export default Link;
