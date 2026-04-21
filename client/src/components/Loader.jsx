const Loader = ({
  size = 'medium',
  color = '#EF6149',
  text = '',
  fullScreen = false
}) => {
  const sizes = {
    small: 'w-5 h-5',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-background/90 z-50'
    : 'flex flex-col items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      <div
        className={`${sizes[size]} border-4 border-muted rounded-full animate-spin`}
        style={{ borderTopColor: color }}
      />
      {text && (
        <p className="mt-4 text-muted-foreground text-sm font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default Loader;
