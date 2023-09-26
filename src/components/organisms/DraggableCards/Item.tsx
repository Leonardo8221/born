import React, { forwardRef, HTMLAttributes, CSSProperties } from 'react';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  withOpacity?: boolean;
  isDragging?: boolean;
};

const Item: any = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, withOpacity, isDragging, style, children, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? '0.5' : '1',
      transformOrigin: '50% 50%',
      cursor: isDragging ? 'grabbing' : 'grab',
      backgroundColor: '#ffffff',
      transform: isDragging ? 'scale(1.01)' : 'scale(1)',
      ...style,
    };

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        {children}
      </div>
    );
  }
);

Item.displayName = 'DraggableItem';

export default Item;
