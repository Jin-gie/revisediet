"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
  type ComponentProps,
} from "react";
import { NodeToolbar, Position, type NodeToolbarProps } from "@xyflow/react";
import { getToolbarBaseStyle } from "./CustomTooltip";
import { Colors } from "@/data/pathways-graph/types";
import { SegmentedBorder } from "./SegmentedBorder";

/* TOOLTIP CONTEXT ---------------------------------------------------------- */

type TooltipContextType = {
  isVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
};

const TooltipContext = createContext<TooltipContextType | null>(null);

/* TOOLTIP NODE ------------------------------------------------------------- */

export function NodeTooltip({ children }: ComponentProps<"div">) {
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showTooltip = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    setIsVisible(true)
  }, []);

  const hideTooltip = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => setIsVisible(false), 150)
  }, []);

  return (
    <TooltipContext.Provider value={{ isVisible, showTooltip, hideTooltip }}>
      <div>{children}</div>
    </TooltipContext.Provider>
  );
}

/* TOOLTIP TRIGGER ---------------------------------------------------------- */

export function NodeTooltipTrigger(props: ComponentProps<"div">) {
  const tooltipContext = useContext(TooltipContext);
  if (!tooltipContext) {
    throw new Error("NodeTooltipTrigger must be used within NodeTooltip");
  }
  const { showTooltip, hideTooltip } = tooltipContext;

  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      props.onMouseEnter?.(e);
      showTooltip();
    },
    [props, showTooltip],
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      props.onMouseLeave?.(e);
      hideTooltip();
    },
    [props, hideTooltip],
  );

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...props} />
  );
}

/* TOOLTIP CONTENT ---------------------------------------------------------- */

type NodeTooltipContentProps = NodeToolbarProps & {
  colors: Colors,
  // Une couleur par pathway actif — si fourni (et > 1 élément), le contour
  // uni est remplacé par un contour segmenté. Sinon, comportement inchangé.
  borderColors?: string[],
};

export function NodeTooltipContent({
  children,
  position,
  className,
  style,
  borderColors,
  ...props
}: NodeTooltipContentProps) {
  const tooltipContext = useContext(TooltipContext);
  if (!tooltipContext) {
    throw new Error("NodeTooltipContent must be used within NodeTooltip");
  }
  const { isVisible, showTooltip, hideTooltip } = tooltipContext;

  const segmented = !!borderColors && borderColors.length > 1
  const baseStyle = getToolbarBaseStyle(props.colors)

  return (
    <div>
      <NodeToolbar
        isVisible={isVisible}
        style={{
          ...baseStyle,
          // Contour uni retiré si segmenté ; SegmentedBorder le remplace
          border: segmented ? 'none' : baseStyle.border,
          position: 'relative',
          ...style,
        }}
        tabIndex={1}
        position={Position.Right}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="nopan nodrag nowheel select-text"
        {...props}
      >
        {children}
        {segmented && (
          <SegmentedBorder colors={borderColors!} strokeWidth={1} radius={8} />
        )}
      </NodeToolbar>
    </div>
  );
}