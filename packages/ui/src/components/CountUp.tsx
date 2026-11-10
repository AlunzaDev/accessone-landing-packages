import { useEffect, useRef, useState } from 'react';

export interface CountUpProps {
  /** Valor final, por ejemplo 30000. */
  value: number;
  /** Texto antes del número, por ejemplo "+". */
  prefix?: string;
  /** Texto después del número, por ejemplo " M". */
  suffix?: string;
  /** Duración de la animación en milisegundos. */
  duration?: number;
  /** Locale para el separador de miles. */
  locale?: string;
  /** Pequeño rebote al llegar al valor final. */
  bounce?: boolean;
  className?: string;
}

/**
 * Número que cuenta de 0 a `value` la primera vez que entra en pantalla.
 * En el servidor (y sin JavaScript) se muestra el valor final.
 * Respeta `prefers-reduced-motion`.
 */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  locale = 'en-US',
  bounce = true,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setCurrent(0);
    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else if (bounce) {
            el.animate(
              [
                { transform: 'scale(1)' },
                { transform: 'scale(1.18)', offset: 0.35 },
                { transform: 'scale(0.94)', offset: 0.65 },
                { transform: 'scale(1)' },
              ],
              { duration: 550, easing: 'ease-out' },
            );
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration, bounce]);

  const formatted = new Intl.NumberFormat(locale).format(current);
  const full = `${prefix}${new Intl.NumberFormat(locale).format(value)}${suffix}`;

  return (
    <span ref={ref} className={className} aria-label={full} style={{ display: 'inline-block', fontVariantNumeric: 'tabular-nums', transformOrigin: 'center bottom' }}>
      <span aria-hidden="true">{`${prefix}${formatted}${suffix}`}</span>
    </span>
  );
}
