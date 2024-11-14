import React, { HTMLAttributes, ReactNode } from 'react';

interface BaseProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

interface CardProps extends BaseProps {}
interface CardHeaderProps extends BaseProps {}
interface CardTitleProps extends BaseProps {}
interface CardContentProps extends BaseProps {}

const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader: React.FC<CardHeaderProps> = ({ className = '', children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle: React.FC<CardTitleProps> = ({ className = '', children, ...props }) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent: React.FC<CardContentProps> = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);


const ExampleCard: React.FC = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the card content.</p>
      </CardContent>
    </Card>
  );
};

export { Card, CardHeader, CardTitle, CardContent };
export default ExampleCard;