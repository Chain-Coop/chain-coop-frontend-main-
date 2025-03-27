import ToggleButton from "../../../../shared/utils/ToggleButton";
import { DashboardHeader } from "../../../common/DashboardHeader"
import useWalletBalance from "../../../../shared/Hooks/useBalance";

const AjoPage = () => {
    const { isWalletVisible, setIsWalletVisible, formattedBalance } = useWalletBalance();


    return (
        <main>
            <DashboardHeader className="flex h-[2.5em] w-full items-center justify-center bg-text2 px-[1.5em] font-sans text-xl font-semibold text-text5 lg:mt-[2em]">
                <h1>
                    Group Savings
                </h1>
            </DashboardHeader>

            <div className="rounded-3xl border-[2px] border-gray-200 bg-white p-8 shadow-md sm:p-16">
                <div className="flex justify-center gap-4 font-sans">
                <p className="font-medium">Naira Wallet Balance</p>
                <div>
                    <ToggleButton
                    isVisible={isWalletVisible}
                    onToggle={(newVisibility) => {
                        setIsWalletVisible(newVisibility);
                        sessionStorage.setItem(
                        "walletBalanceVisible",
                        newVisibility.toString(),
                        );
                    }}
                    />
                </div>
                </div>
                <div className="mx-auto mt-6 w-60 rounded-md">
                {isWalletVisible ? (
                    <p className="text-xl font-bold lg:text-xl">
                    {formattedBalance}
                    </p>
                ) : (
                    <p className="text-2xl font-bold">*********</p>
                )}
                <hr className="mt-4 h-px rounded-md bg-howtext" />
                </div>
            </div>
        </main>
    )
}

export default AjoPage