export type MediaPlaceholderKind = 'image' | 'video';

export interface MediaPlaceholderProps {
  kind?: MediaPlaceholderKind;
  label: string;
  hint?: string;
  ratio?: string;
  className?: string;
}

/** Skeleton temporal que marca dónde irá una imagen o un video real. */
export function MediaPlaceholder({ kind = 'image', label, hint, ratio, className = '' }: MediaPlaceholderProps) {
  return (
    <figure
      className={`accessone-media-placeholder accessone-media-placeholder--${kind} ${className}`.trim()}
      style={ratio ? { aspectRatio: ratio } : undefined}
      aria-label={`Espacio reservado: ${label}`}
    >
      <span className="accessone-media-placeholder__icon" aria-hidden="true">
        {kind === 'video' ? (
          <svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4.5" width="18" height="15" rx="2" /><circle cx="8.5" cy="9.5" r="1.6" /><path d="m4 18 5.5-5.5 4 4 2.5-2.5L20 18" /></svg>
        )}
      </span>
      <figcaption>
        <small>{kind === 'video' ? 'Video' : 'Imagen'}</small>
        <strong>{label}</strong>
        {hint && <span>{hint}</span>}
      </figcaption>
    </figure>
  );
}

export interface MediaGalleryProps {
  items: { label: string; hint?: string }[];
}

/** Galería tipo mosaico; la primera pieza es destacada. */
export function MediaGallery({ items }: MediaGalleryProps) {
  return (
    <div className="accessone-media-gallery">
      {items.map((item) => <MediaPlaceholder key={item.label} kind="image" {...item} />)}
    </div>
  );
}
