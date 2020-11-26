export const VabIcon = (props: { icon: any, className?: string }) => {
  const { icon, className } = props;
  const classText = `ri-${icon} text-lg ${className}`;
  return <i class={classText} aria-hidden="true"/>;
};
