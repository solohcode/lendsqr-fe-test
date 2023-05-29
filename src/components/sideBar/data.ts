import dashboard from '../../assets/icons/dashboard.png';
import users from '../../assets/icons/users.png';
import guarantors from '../../assets/icons/guarantors.png';
import loans from '../../assets/icons/loans.png';
import decisions from '../../assets/icons/decisions.png';
import savings from '../../assets/icons/savings.png';
import requests from '../../assets/icons/requests.png';
import whitelist from '../../assets/icons/whitelist.png';
import karma from '../../assets/icons/karma.png';
import organization from '../../assets/icons/organization.png';
import products from '../../assets/icons/products.png';
import charges from '../../assets/icons/charges.png';
import transactions from '../../assets/icons/transactions.png';
import services from '../../assets/icons/services.png';
import account from '../../assets/icons/account.png';
import settlements from '../../assets/icons/settlements.png';
import reports from '../../assets/icons/reports.png';
import preferences from '../../assets/icons/preferences.png';
import pricing from '../../assets/icons/pricing.png';
import logs from '../../assets/icons/logs.png';

type NavType = {
  label: string,
  url: string | boolean,
  img?: string | any,
}

export const navList:NavType[] = [
  {
    label: "Dashboard",
    url: "/dashboard",
    img: dashboard
  },
  {
    label: "CUSTOMERS",
    url: false
  },
  {
    label: "Users",
    url: "/users",
    img: users
  },
  {
    label: "Guarantors",
    url: "/guarantors",
    img: guarantors
  },
  {
    label: "Loans",
    url: "/loans",
    img: loans
  },
  {
    label: "Decision Models",
    url: "/decision-models",
    img: decisions
  },
  {
    label: "Savings",
    url: "/savings",
    img: savings
  },
  {
    label: "Loan Requests",
    url: "/loan-requests",
    img: requests
  },
  {
    label: "Whitelist",
    url: "/whitelist",
    img: whitelist
  },
  {
    label: "Karma",
    url: "/karma",
    img: karma
  },
  {
    label: "BUSINESSES",
    url: false,
  },
  {
    label: "Organization",
    url: "/organization",
    img: organization
  },
  {
    label: "Loan Products",
    url: "/loan-products",
    img: loans
  },
  {
    label: "Savings Products",
    url: "/savings-products",
    img: products
  },
  {
    label: "Fees and Charges",
    url: "/fees-and-charges",
    img: charges
  },
  {
    label: "Transactions",
    url: "/transactions",
    img: transactions
  },
  {
    label: "Services",
    url: "/services",
    img: services
  },
  {
    label: "Service Account",
    url: "/service-account",
    img: account
  },
  {
    label: "Settlements",
    url: "/settlements",
    img: settlements
  },
  {
    label: "Reports",
    url: "/reports",
    img: reports
  },
  {
    label: "SETTINGS",
    url: false,
  },
  {
    label: "Preferences",
    url: "/preferences",
    img: preferences
  },
  {
    label: "Fees and Pricing",
    url: "/fees-and-pricing",
    img: pricing
  },
  {
    label: "Audit Logs",
    url: "/audit-logs",
    img: logs
  },
] 