import { Organization } from "./organization"

export type ResponsiveNavbarProps = {
  organizations: Organization[]
  currentOrganization: string
  onOrganizationChange: (organizationId: string) => void
  onLogout: () => void
}