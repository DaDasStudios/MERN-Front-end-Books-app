import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AiOutlineEdit,
  AiOutlineAppstoreAdd,
  AiOutlineDelete,
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineTable,
  AiOutlineAppstore,
} from "react-icons/ai";
import { useBooksViewContext } from "../../../context/booksViewContext";
import { useActionsBooksContext } from "../../../context/actionsBookContext";
import { ACTION_STEP_TOAST } from "../../../util/toast.options";

const ToggleBooksView = () => {
  const { view, toggleView } = useBooksViewContext();
  const className = "mt-2.5 mx-5 text-xl";
  return (
    <button onClick={toggleView}>
      {view ? (
        <AiOutlineAppstore className={className} />
      ) : (
        <AiOutlineTable className={className} />
      )}
    </button>
  );
};

const DashboardNavBar = () => {
  const { action, setAction, resetAction } = useActionsBooksContext();
  return (
    <nav className="border-b border-dashed border-gray-400/25">
      <ul className="flex justify-between gap-10 font-medium">
        <ul className="flex">
          <li className="border-r border-dashed border-gray-400/25">
            <h3 className="font-semibold py-2 px-5">
              <AiOutlineDashboard className="inline text-lg mb-1 mr-2" />
              Dashboard
            </h3>
          </li>
          <li className="border-r border-dashed border-gray-400/25">
            <NavLink className="block" to="/shelf/user">
              <AiOutlineUser className="mt-2.5 mx-5 text-lg" />
            </NavLink>
          </li>
          <li className="border-r border-dashed border-gray-400/25">
            <ToggleBooksView></ToggleBooksView>
          </li>
        </ul>
        <ul className="flex flex-wrap ">
          <li>
            <NavLink
              className={`${action === "create" ? "bg-white/5" : "bg-white/10"} hover:bg-white/0 transition-colors duration-300 px-5 py-2 rounded-l-md block`}
              to="/shelf/action"
              onClick={() => {
                resetAction();
                toast("Fill up the form", ACTION_STEP_TOAST);
              }}
            >
              <AiOutlineAppstoreAdd className="inline text-lg mb-1" /> Create
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${action === "edit" ? "bg-white/5" : "bg-white/10"} hover:bg-white/0 transition-colors duration-300 px-5 py-2 rounded-l-md block`}
              onClick={() => {
                setAction("edit");
                toast("Select a task for edit", ACTION_STEP_TOAST);
              }}
              to="/shelf/action"
            >
              <AiOutlineEdit className="inline text-lg mb-1 mr-1" />
              Edit
            </NavLink>
          </li>
          <li>
            <button
              className={`${action === "delete" ? "bg-white/5" : "bg-white/10"} hover:bg-white/0 transition-colors duration-300 px-5 py-2 rounded-l-md block`}
              to="/shelf/delete"
              onClick={() => {
                setAction("delete")
                toast("Select a task for delete", ACTION_STEP_TOAST)
              }}
            >
              <AiOutlineDelete className="inline text-lg mb-1 mr-1" />
              Delete
            </button>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default DashboardNavBar;
