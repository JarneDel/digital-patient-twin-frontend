import { AccountInfo } from '@azure/msal-browser'

export const useUser = () => useState<AccountInfo | null>()