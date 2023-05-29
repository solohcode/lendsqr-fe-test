export type StatType = {
  icon?: string | any,
  title: string,
  stat: number | string,
}

type Edu = {
  duration: string,
  employmentStatus: string,
  level: string,
  loanRepayment: string,
  monthlyIncome: string[],
  officeEmail: string,
  sector: string,
}
type Gua = {
  address: string,
  firstName: string,
  gender: string,
  lastName: string,
  phoneNumber: string,
}
type Prof = {
  address: string,
  avatar: string,
  bvn: string,
  currency: string,
  firstName: string,
  gender: string,
  lastName: string,
  phoneNumber: string,
}
type Soc = {
  facebook: string,
  instagram: string,
  twitter: string
}

export type DataType = {
  accountBalance: string,
  accountNumber: string,
  education: Edu,
  email: string,
  guarantor: Gua,
  id: string,
  lastActiveDate: string,
  orgName: string,
  phoneNumber: string,
  profile: Prof,
  socials: Soc,
  userName: string,
  createdAt: string,
  status?: string,
}

export type FilterParam = {
  org_name?: string,
  user_name?: string,
  email?: string,
  date?: string,
  phone_no?: string,
  status?: string,
}