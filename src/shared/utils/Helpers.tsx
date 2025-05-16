import { Card } from "../types/types";
import NigerianFlag from "../../Assets/svg/dashboard/contribution/NigerianFlag.svg";

export const CardBrandLogo = ({ brand }: { brand: string }) => {
  const logoStyle =
    "absolute right-4 bottom-4 h-6 w-10 rounded bg-white/90 flex items-center justify-center font-bold";

  switch (brand?.toLowerCase()) {
    case "visa":
      return <div className={logoStyle + " text-blue-600"}>VISA</div>;
    case "mastercard":
      return <div className={logoStyle + " text-red-600"}>MC</div>;
    case "verve":
      return <div className={logoStyle + " text-green-600"}>VERVE</div>;
    default:
      return (
        <div className={logoStyle + " text-gray-600"}>{brand || "CARD"}</div>
      );
  }
};
export const cardDesigns = {
  visa: "from-blue-600 to-blue-800",
  mastercard: "from-red-600 to-orange-600",
  verve: "from-green-600 to-emerald-800",
  default: "from-purple-600 to-purple-800",
};

export const Chip = () => (
  <div className="relative h-8 w-11">
    <div className="absolute h-full w-full rounded-md bg-gradient-to-br from-yellow-600 to-yellow-700">
      <div className="absolute left-1 top-1 h-6 w-9 rounded-md border-2 border-yellow-800/30">
        <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-[1px]">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="bg-yellow-800/20" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const formatCardNumber = (last4: string) => {
  return `**** **** **** ${last4}`;
};

export const formatExpiryDate = (exp_month: string, exp_year: string) => {
  // Format as MM/YY
  if (
    !exp_month ||
    !exp_year ||
    !/^\d{2}$/.test(exp_month) ||
    !/^\d{4}$/.test(exp_year)
  ) {
    return "--/--";
  }
  return `${exp_month}/${exp_year.slice(-2)}`;
};

export const handleCardSelect = (
  card: Card,
  setSelectedCard: (card: Card | null) => void,
) => {
  setSelectedCard(card);
};

export const handleNext = (
  currentPage: number,
  cards: Card[],
  setCurrentPage: (page: number) => void,
) => {
  if (currentPage < cards.length - 1) {
    setCurrentPage(currentPage + 1);
  }
};

export const handlePrev = (
  currentPage: number,
  setCurrentPage: (page: number) => void,
) => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
};

export const handleCloseError = () => {
  // Handled by Redux clearTransactionError
};

export const getSavingsTypeTitle = (savingsType?: string) => {
  switch (savingsType) {
    case "Lock":
      return "Lock Savings";
    case "Strict":
      return "Strict Savings";
    case "Flexible":
    default:
      return "Flexible Savings";
  }
};

export const ContributionFundType = [
  {
    text: "Naira",
    icon: <img src={NigerianFlag} alt="Nigerian Flag" className="h-10 w-10" />,
  },
];

export const membershipOptions = [
  { value: "Explorer", label: "Explorer" },
  { value: "Pioneer", label: "Pioneer" },
];

export const getPasswordStrengthColor = (score: number) => {
  switch (score) {
    case 0:
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-orange-500";
    case 3:
      return "bg-yellow-500";
    case 4:
      return "bg-green-500";
    case 5:
      return "bg-green-600";
    default:
      return "bg-gray-200";
  }
};

export const checkPasswordStrength = (
  password: string,
): { score: number; message: string } => {
  let score = 0;
  let message = "";

  if (password.length >= 8) score++;
  if (password.match(/[a-z]/)) score++;
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^a-zA-Z0-9]/)) score++;

  switch (score) {
    case 0:
    case 1:
      message = "Very Weak";
      break;
    case 2:
      message = "Weak";
      break;
    case 3:
      message = "Medium";
      break;
    case 4:
      message = "Strong";
      break;
    case 5:
      message = "Very Strong";
      break;
    default:
      message = "Very Weak";
  }

  return { score, message };
};
