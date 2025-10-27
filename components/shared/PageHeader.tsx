interface Props {
  title: string;
  description?: string;
  className?: string;
}

function PageHeader({ title, description, className }: Props) {
  return (
    <div className={className}>
      <h1 className="text-2xl text-primary dark:text-white font-semibold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground dark:text-white">{description}</p>
      )}
    </div>
  );
}

export default PageHeader;
