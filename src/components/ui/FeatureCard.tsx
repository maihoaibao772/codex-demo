import { ReactNode } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const FeatureCard = ({
  title,
  description,
  cta,
  to,
  icon,
  image,
}: {
  title: string;
  description: string;
  cta?: string;
  to?: string;
  icon?: ReactNode;
  image?: string;
}) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
      {image && (
        <div
          className="h-32 w-full bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.55)), url(${image})` }}
        />
      )}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2 text-primary">
          {icon}
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>
        <p className="text-sm text-slate-600">{description}</p>
        {cta && to && (
          <Button as={Link} to={to} variant="ghost" size="sm" className="group-hover:translate-x-1">
            {cta}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
