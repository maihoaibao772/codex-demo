import { Event } from '../../types';
import Button from './Button';

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase text-primary">{event.date}</div>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{event.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{event.description}</p>
      <Button
        as="a"
        href={event.link || '#'}
        target="_blank"
        rel="noreferrer"
        size="sm"
        className="mt-3"
      >
        Tham gia
      </Button>
    </div>
  );
};

export default EventCard;
