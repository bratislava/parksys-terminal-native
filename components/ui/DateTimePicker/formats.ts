import { MaterialIcons } from '@expo/vector-icons'
type TIconsName = keyof typeof MaterialIcons['glyphMap']

/**
 * Display format for date picker moment display placeholders
 */
export const displayFormats: Record<'date' | 'time' | 'datetime', string> = {
  date: 'dd.MM.yyyy',
  time: 'HH:mm',
  datetime: 'dd.MM.yyyy HH:mm',
}

export const IconMap = new Map<'date' | 'time' | 'datetime', TIconsName>([
  ['date', 'date-range'],
  ['datetime', 'date-range'],
  ['time', 'timer'],
])
