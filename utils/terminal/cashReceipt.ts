import { ICreateTicketRes } from '@models/pricing/createTicket/createTicket.dto'
import { ITicketHistoryItem } from '@models/pricing/getTickets/getTickets.dto'
import { IParkinPriceResData } from '@models/pricing/parkingPrice/parkingPrice.dto'
import { formatNativeDate } from '@utils/ui/dateUtils'
const PAPER_WIDTH = 38
const SPACER = '-'.repeat(PAPER_WIDTH)
const EMPTY_SPACER = ' '.repeat(PAPER_WIDTH)
const DEFAULT_FOOTER = [
  'Prevádzkovateľ nie je platcom DPH podľa §4 Zákona č.222/2004 Z.z o dani z pridanej hodnoty.',
  'Lístok je elektronický, nemusíte ho zakladať za predné sklo vozidla.',
  'Pri kontrole systém automaticky overí, či na dané EČV bol vydaný parkovací lístok.',
]

type TReceiptItem = { name: string; price: string | number }

/**
 * Get spaces
 * @param spaces number of slaces
 * @returns spaces string
 */
function getSpacing(spaces: number) {
  return ' '.repeat(spaces)
}

/**
 * Item in receipt
 * label................sum
 * @param label label of item
 * @param sum price
 * @returns string for receipt
 */
function getItem(label: string, sum: string | number) {
  const formattedSum =
    typeof sum === 'number' ? `${(sum / 100).toFixed(2)}€` : sum
  let formattedLabel = label

  /** If label and su bigger then one line */
  if (formattedSum.length + label.length > PAPER_WIDTH) {
    /** if sum not on one line throw error */
    if (formattedSum.length > PAPER_WIDTH) {
      throw new Error('Sum too big')
    } else {
      /** else cut from label and leave one space */
      const maxLabelLength = PAPER_WIDTH - formattedSum.length - 1
      formattedLabel = label.slice(0, maxLabelLength)
    }
  }

  const spacesLength = PAPER_WIDTH - formattedSum.length - formattedLabel.length
  const spaces = getSpacing(spacesLength)

  return `${label}${spaces}${formattedSum}`
}

/**
 * Get centered title string.
 * Title bigger then PAPER_WIDTH will be splitted
 * @param title title
 * @returns centered title string
 */
function getTitle(title: string) {
  let titleSplit = []

  /** if title is bigger than one line, split to multiline*/
  if (title.length > PAPER_WIDTH) {
    titleSplit = [title.slice(0, PAPER_WIDTH), title.slice(PAPER_WIDTH)]
  } else {
    titleSplit = [title]
  }

  let retString = ''
  /** center each line */
  titleSplit.forEach((part) => {
    const spacesLength = Math.floor((PAPER_WIDTH - part.length) / 2)
    const spacesStart = getSpacing(spacesLength)
    const finalText = `${spacesStart}${part}`

    retString += `${finalText}${getSpacing(PAPER_WIDTH - finalText.length)}`
  })

  return retString
}

/**
 * Formatted items
 * @param items items of receipt
 * @returns string
 */
function generateItems(items: TReceiptItem[]) {
  let price = 0
  let itemsSting = ''

  items.forEach((i) => {
    price += Number(i.price)
    itemsSting += getItem(i.name, i.price)
  })

  return `${itemsSting}${SPACER}${getItem(
    'Suma EUR',
    (price / 100).toFixed(2)
  )}`
}

/**
 * Get receipt type string based on type
 * @param type type
 * @returns string
 */
function getReceiptType(type: TReceiptType) {
  switch (type) {
    case 'merchantReceipt':
      return 'POTVRDENKA PRE OBCHODNÍKA'
    case 'customerReceipt':
      return 'POTVRDENKA PRE ZÁKAZNIKA'
    case 'copyReceipt':
      return 'KÓPIA DOKLADU'
    case 'sessionClose':
      return 'UZÁVIERKA'
    default:
      return ''
  }
}

type TReceiptType =
  | 'customerReceipt'
  | 'merchantReceipt'
  | 'copyReceipt'
  | 'sessionClose'

type TGenerateParams = {
  /** title of receipt */
  title?: string
  /** date of receipt */
  date?: Date
  /** title for section with items */
  itemsTitle?: string
  /** items with price */
  items?: TReceiptItem[]
  /** type of receipt */
  type?: TReceiptType
  /** custom text with transaction status */
  transactionStatus?: string
  /** footer lines */
  footer?: string[]
}

/**
 * Generate receipt fot terminal
 * @param date date of transaction
 * @param items Items to print
 * @returns stringified
 */
function generateReceipt({
  title = 'PAPAYA TEST',
  date = new Date(),
  itemsTitle = 'Platba',
  items = [],
  type = 'customerReceipt',
  transactionStatus = 'TRANSAKCIA VYKONANÁ',
  footer = DEFAULT_FOOTER,
}: TGenerateParams) {
  /** prepare dates ß*/
  const dateString = formatNativeDate(date, 'd.M.yyyy')
  const timeString = formatNativeDate(date, 'HH:mm:ss')

  let finalString = ''

  /** generate receipt from params */
  finalString += getTitle(title)
  finalString += SPACER
  finalString += getItem(dateString, timeString)
  finalString += getTitle(getReceiptType(type))
  finalString += SPACER
  finalString += getTitle(itemsTitle)
  finalString += EMPTY_SPACER
  finalString += generateItems(items)
  finalString += EMPTY_SPACER
  finalString += getTitle(transactionStatus)
  finalString += SPACER
  footer.forEach((item) => {
    finalString += getTitle(item.trim())
  })

  return finalString
}

function getTransactionHeader() {
  let header = ''
  header += getTitle('Bratislavský parkovací asistent')
  header += EMPTY_SPACER
  header += getTitle('Prevádzkovateľ:')
  header += getTitle('Hlavné mesto SR Bratislava')
  header += getTitle('Primaciálne námestie 1')
  header += getTitle('814 99  Bratislava')
  header += getTitle('IČO: 00 603 481  DIČ: 2020372596')

  return header
}

export function generateReceiptForTransaction(
  tx: ICreateTicketRes | IParkinPriceResData | ITicketHistoryItem
) {
  const startDateObj = tx.meta?.ticketStart
    ? new Date(tx.meta?.ticketStart)
    : new Date()
  const endDateObj = new Date(tx.meta?.ticketEnd || tx.parking_end)
  const startDate = formatNativeDate(startDateObj, 'dd/MM/yy')
  const startTime = formatNativeDate(startDateObj, 'HH:mm')
  const endDate = formatNativeDate(endDateObj, 'dd/MM/yy')
  const endTime = formatNativeDate(endDateObj, 'HH:mm')

  let finalString = ''

  /** generate receipt from params */
  finalString += getTransactionHeader()
  finalString += SPACER
  finalString += getItem(`EČV:`, tx.ecv)
  finalString += getTitle('Platnosť')
  finalString += EMPTY_SPACER
  finalString += getItem(`Od ${startTime}`, startDate)
  finalString += getItem(`Do ${endTime}`, endDate)
  finalString += getItem('Kód úseku parkovania:', `${tx.udr}`)
  finalString += EMPTY_SPACER
  finalString += getItem('Číslo lístku:', '')
  finalString += getItem(tx.ticket_id_parksys, '')
  finalString += SPACER
  finalString += getItem('Cena:', tx.price)
  finalString += EMPTY_SPACER
  finalString += DEFAULT_FOOTER.join(' ')
  // DEFAULT_FOOTER.forEach((item) => {
  //   finalString += getTitle(item.trim())
  // })

  return finalString
}

export default generateReceipt
