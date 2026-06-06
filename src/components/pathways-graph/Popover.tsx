import { JSX } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from "@/components/ui/popover"

export const PopOver = (props: {
  trigger: JSX.Element,
  title: string,
  description: string
  open?: boolean,
  onOpenChange?: (open: boolean) => void
}) => {
  return (
    <Popover open={props.open} onOpenChange={props.onOpenChange}>
      <PopoverTrigger asChild>
        {props.trigger}
      </PopoverTrigger>
      <PopoverContent
        onClick={e => e.stopPropagation()}
        align='start'
        style={{
          background: '#020817',
          border: '1px solid #1e293b',
          borderRadius: 8,
          boxShadow: '0 0 20px rgba(0,0,0,0.6)',
          padding: 0,
          overflow: 'hidden',
          maxWidth: 240,
        }}
      >
        {/* Barre décorative en haut */}
        <div style={{
          height: 2,
          background: 'linear-gradient(90deg, #34d399, #818cf8)',
        }} />

        <PopoverHeader style={{ padding: '10px 12px 8px' }}>
          <PopoverTitle style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#f1f5f9',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {props.title}
          </PopoverTitle>
          <PopoverDescription style={{
            fontSize: 13,
            color: '#c1c4c9',
            lineHeight: 1.5,
            marginTop: 4,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {props.description}
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}