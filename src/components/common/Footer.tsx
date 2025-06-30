import { useState } from "react";
import { Link } from "react-router-dom";
import { Company, Explore, Legal } from "../../data/Data";
import X from "../../Assets/png/home/twitterx.png";
import linkedin from "../../Assets/png/home/linkedin.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../shared/redux/store";
import { toast } from "react-toastify";
import { JoinNewsLetter } from "../../shared/redux/slices/landing.slices";
import { Button, Typography } from "@material-tailwind/react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const joinNews = (e: any) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    let body = {
      email: email,
    };

    dispatch(JoinNewsLetter(body))
      .unwrap()
      .then((response: any) => {
        setLoading(false);
        if (response?.status === 201) {
          toast.success(response?.data?.msg);
          setEmail("");
        }
      })
      .catch((error: any) => {
        setLoading(false);
        const errorMessage = error;
        toast.error(errorMessage);
      });
  };

  return (
    <footer className="w-full overflow-hidden">
      <header className="relative z-10 mx-auto mb-[-50px] mt-[3em] flex w-[90%] items-center justify-center rounded-2xl bg-[#CCA3BC] p-3 sm:mb-[-60px] sm:py-5 lg:mb-[-115px] lg:w-[80%] lg:p-8">
        <div className="w-full px-2 text-center sm:px-4">
          <Typography
            variant="h1"
            className="mb-1 text-xl font-semibold md:text-xl lg:text-2xl"
          >
            Stay Ahead with Chain Co-op
          </Typography>
          <Typography
            variant="h1"
            className="m-auto mb-3 w-full px-2 text-sm font-semibold tracking-tight md:text-lg lg:max-w-4xl lg:px-5 lg:text-2xl"
          >
            Subscribe to the latest tech in tech-driven cooperative innovations
            and Savings opportunities.
          </Typography>
          <form
            onSubmit={joinNews}
            className="mx-auto mt-2 flex w-full flex-col items-center justify-center gap-3 lg:mt-8 lg:max-w-[60%] lg:flex-row"
          >
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none lg:p-4"
              placeholder="Enter your e-mail"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              className="flex min-w-[120px] items-center justify-center rounded-md bg-text2 px-10 py-2 text-sm normal-case text-text5 lg:py-3 lg:text-sm"
            >
              <Typography className="font-medium">Join</Typography>
            </Button>
          </form>
        </div>
      </header>

      <div className="w-full bg-text2 text-white">
        <div className="mx-auto max-w-7xl px-4 pt-[80px] lg:pb-[10px] lg:pt-[140px]">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-5">
            <section className="w-full space-y-4 lg:col-span-2">
              <Typography variant="h2" className="text-md font-light">
                Chain Co-Op is a registered cooperative dedicated to empowering
                individuals through collaboration and shared ownership.
              </Typography>
              <Typography className="text-md font-light">
                By blending cutting-edge technology with trusted cooperative
                practices, we provide a secure platform for members to thrive
                together.
              </Typography>
            </section>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:col-span-3 lg:grid-cols-4 lg:justify-items-start lg:gap-4">
              <section className="w-full space-y-4">
                <Typography
                  variant="h2"
                  className="text-lg font-semibold text-text3"
                >
                  Company
                </Typography>
                <div>
                  {Company.map((data, index) => (
                    <p className="mb-2 text-lg font-light" key={index}>
                      <Link to={data.to}>{data.text}</Link>
                    </p>
                  ))}
                </div>
              </section>

              <section className="w-full space-y-4">
                <Typography variant="h2" className="text-lg font-semibold">
                  Explore
                </Typography>
                <div>
                  {Explore.map((data, index) => (
                    <p
                      className="mb-2 whitespace-nowrap text-lg font-light"
                      key={index}
                    >
                      <Link to={data.to}>{data.text}</Link>
                    </p>
                  ))}
                </div>
              </section>

              <section className="w-full space-y-4">
                <Typography variant="h2" className="text-lg font-semibold">
                  Legal
                </Typography>
                <div>
                  {Legal.map((data, index) => (
                    <p
                      className="mb-2 whitespace-nowrap text-lg font-light"
                      key={index}
                    >
                      <Link to={data.to}>{data.text}</Link>
                    </p>
                  ))}
                </div>
              </section>

              <section className="w-full max-w-[200px] space-y-4">
                <Typography variant="h2" className="text-lg font-semibold">
                  Contact
                </Typography>
                <div className="flex flex-col gap-3">
                  <Typography className="text-lg font-light">
                    Let's build a better future together!
                  </Typography>
                  <Typography className="text-lg font-light">
                    info@chaincoop.org
                  </Typography>
                  <Typography className="text-lg font-light">
                    +234 809 322 7696
                  </Typography>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center px-6">
          <div className="w-full border-b-2 text-text3"></div>
        </div>

        <div className="mx-auto flex max-w-[90%] flex-col items-center px-3 py-8 lg:max-w-[82%] lg:flex-row lg:justify-center">
          <div className="mb-4 text-center lg:mb-0 lg:text-left">
            <span className="text-text3">
              © {new Date().getFullYear()} Chain Cooperative. All rights
              reserved
            </span>
          </div>
          {/* <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/ChainCoop"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
            >
              <img width="24" height="24" src={X} alt="twitterx" />
            </a>
            <a
              href="https://www.linkedin.com/company/chain-coop/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
            >
              <img width="24" height="24" src={linkedin} alt="linkedin" />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
