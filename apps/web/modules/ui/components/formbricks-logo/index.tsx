interface FormbricksLogoProps {
  className?: string;
}
export const FormbricksLogo = ({ className }: FormbricksLogoProps) => {
  return <img src="/kolaxuslogo.png" alt="Formbricks" width={220} height={220} className={className} />;
};
