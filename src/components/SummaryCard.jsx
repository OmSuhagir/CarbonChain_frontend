/**
 * SummaryCard Component
 * Displays individual summary metric cards
 */

import { formatNumber, formatEmission, getAlignmentColor } from '../utils/formatting';

export function SummaryCard({ 
  title, 
  value, 
  unit = '', 
  icon = '📊',
  isHighestEmission = false,
  isAlignment = false,
  variant = 'default'
}) {
  let cardClass = 'card-hover';
  let titleClass = 'text-text-secondary text-sm uppercase tracking-wide';
  let valueClass = 'text-4xl font-bold text-text-primary mt-2';
  let glowClass = '';

  if (isHighestEmission) {
    glowClass = 'shadow-glow-amber border-warning-amber';
  }

  if (isAlignment) {
    const alignment = parseFloat(value);
    valueClass = `text-4xl font-bold mt-2 ${getAlignmentColor(alignment)}`;
  }

  return (
    <div className={`${cardClass} ${glowClass} animate-fade-in`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className={titleClass}>{title}</h3>
        {typeof icon === 'string' && !icon.includes('/') ? (
          <span className="text-3xl">{icon}</span>
        ) : (
          <img 
            src={icon} 
            alt={title}
            className="w-8 h-8 text-accent-emerald stroke-accent-emerald"
            style={{ filter: 'invert(1)' }}
          />
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className={valueClass}>
          {typeof value === 'number' ? formatNumber(value, 1) : value}
        </span>
        {unit && <span className="text-text-secondary text-lg">{unit}</span>}
      </div>

      {isHighestEmission && (
        <div className="mt-3 pt-3 border-t border-border-color">
          <span className="badge badge-warning">⚠ Highest Stage</span>
        </div>
      )}
    </div>
  );
}

export default SummaryCard;
