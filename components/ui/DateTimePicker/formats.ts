import { MaterialIcons } from '@expo/vector-icons'
type TIconsName = keyof typeof MaterialIcons['glyphMap']

/**
 * Display format for date picker moment display placeholders
 */
export const displayFormats: Record<'date' | 'time' | 'datetime', string> = {
  date: 'd.M.yyyy',
  time: 'HH:mm',
  datetime: 'd.m.yyyy HH:mm',
}

export const IconMap = new Map<'date' | 'time' | 'datetime', TIconsName>([
  ['date', 'date-range'],
  ['datetime', 'date-range'],
  ['time', 'timer'],
])
