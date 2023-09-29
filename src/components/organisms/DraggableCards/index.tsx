import React, { FC, useState, useCallback, useEffect, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import Item from './Item';

const DraggableCards: FC<{
  renderChilds: any;
  list: any[];
  activeElement: any;
  onDragEnd?: (items: { [key: string]: number }) => void;
}> = ({ renderChilds, list, activeElement, onDragEnd }) => {
  const [items, setItems] = useState<any[]>([]);
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 50,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 50,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 50,
      },
    })
  );

  useEffect(() => {
    setItems(list);
  }, [list]);

  const handleDragStart = useCallback((event: any) => {
    setActiveItem(event?.active?.id);
  }, []);

  const getActiveItem = useMemo(() => {
    return items?.filter((item) => item.id === activeItem)?.[0];
  }, [activeItem]);

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item?.id === active?.id);
        const newIndex = items.findIndex((item) => item?.id === over?.id);
        const updatedItems: any = arrayMove(items, oldIndex, newIndex);
        let changedItems: { [key: string]: number } = {};
        updatedItems.forEach((i: any, index: number) => {
          changedItems[i?.id] = index;
        });
        onDragEnd?.(changedItems);
        return updatedItems;
      });
    }

    setActiveItem(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveItem(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {renderChilds?.(items)}
      </SortableContext>
      <DragOverlay
        adjustScale
        style={{ transformOrigin: '0 0 ' }}
        modifiers={[restrictToParentElement]}
      >
        {activeItem ? (
          <Item isDragging>{activeElement?.(getActiveItem)}</Item>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DraggableCards;
