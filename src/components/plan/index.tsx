import { BankPlans } from "@/model/model";
import { useTranslation } from "react-i18next";

interface PlansProps {
  pricingPlans: BankPlans[];
  onPlanSelect: (planId: number) => void;
  isLogged: boolean;
}

const Plans: React.FC<PlansProps> = ({
  pricingPlans,
  onPlanSelect,
  isLogged,
}) => {
  const { t } = useTranslation();

  return (
    <section className="py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            {t("bank.plans.title")}
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            {t("bank.plans.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="mt-4 text-gray-400 text-lg">{plan.description}</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-xl font-medium text-gray-400">
                  {plan.frecuency}
                </span>
              </div>
              <ul className="mb-8 space-y-4 text-gray-400">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="h-6 w-6 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {isLogged && (
                <button
                  onClick={() => onPlanSelect(plan.id)}
                  className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  {plan.button}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
