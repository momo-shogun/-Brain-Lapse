import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16  lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://imgs.search.brave.com/leDqfaLKswP4nLM02JJsCJFK7sLjt1cHNDs0VDpAiYg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wdXJwbGUtbW9k/ZWwtaHVtYW4tYnJh/aW4tYWdhaW5zdC1w/dXJwbGVfMTAwOTkw/Mi0xNDg2MzUuanBn/P3NpemU9NjI2JmV4/dD1qcGc"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
