import { Button } from "@material-tailwind/react";
import plus from "../../assets/svg/plus.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="font-sans">
      <header className="mb-3">
        <nav className="m-auto w-[80%]">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        </nav>
        <div className="mt-[2em]">
          <h1 className="text-2xl font-bold">Project Management</h1>
        </div>
        <div className="mt-[1.5em] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent activity</h2>
          </div>
          <Link to="/admin/dashboard/project_management">
            <Button className="mt-8 flex w-[13em] items-center justify-between rounded-md bg-text2 px-5 py-2 font-semibold text-white">
              Create Project
              <img src={plus} alt="plus" className="w-[35px]" />
            </Button>
          </Link>
        </div>
      </header>
      <hr />
      <section className="mt-[1.5em]">
        <div>
          <h1 className="text-2xl font-bold">Financial Management</h1>
        </div>
      </section>
    </main>
  );
};

export default Home;
